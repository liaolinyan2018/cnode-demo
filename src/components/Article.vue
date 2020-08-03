<template>
  <div class="Article">
    <Loading v-if="isShowLoading"></Loading>
    <main class="clearfix" v-else>
      <div class="content">
        <div class="art-area">
          <header class="art-area-header">
            <div class="topic-full-title-wrapper">
              <span
                v-if="isShowTab"
                class="topbar-item"
                :style="{background: bg(art),color: color(art)}"
              >{{ tabText(art) }}</span>
              {{ art.title}}
            </div>
            <div class="details">
              <span>发布于 {{ art.create_at|formateReplyTime}}</span>
              <span>作者 {{ art.author.loginname }}</span>
              <span>{{ art.visit_count}} 次浏览</span>
              <span>最后一次编辑是 {{ art.last_reply_at|formateReplyTime}}</span>
              <span>来自 {{art.tab|formateTab}}</span>
            </div>
          </header>
          <main class="markdown-body" v-html="art.content"></main>
        </div>
        <div class="reply-area">
          <header class="reply-area-header">
            <span class="reply-count">{{art.reply_count}} 回复</span>
          </header>
          <main class="reply-area-main">
            <ul>
              <li v-for="(reply,index) in art.replies">
                <div class="reply-author-info clearfix">
                  <img :src="reply.author.avatar_url" width="30px" height="30px" />
                  <span class="reply-author-name">{{reply.author.loginname}}</span>
                  <span class="reply-time">{{index + 1}}楼 • {{ reply.create_at | formateReplyTime }}</span>
                  <span
                    v-if="reply.ups.length > 0"
                    title="喜欢"
                    class="ups-count"
                  >☝ {{reply.ups.length}}</span>
                </div>
                <p class="markdown-body" v-html="reply.content"></p>
              </li>
            </ul>
          </main>
        </div>
      </div>
      <div class="sidebar">
        <UserPanel :title="userPanelTitle" :userInfo="userInfo"></UserPanel>
        <Panel :lists="otherTopics" :title="panelTitle"></Panel>
      </div>
    </main>
  </div>
</template>

<script>
import * as util from "../common/utils/util";
import Loading from "./Loading";
import Panel from "./Panel";
import UserPanel from "./UserPanel";

export default {
  data() {
    return {
      isShowLoading: true,
      isShowTab: true,
      art: {},
      userInfo: {},
      panelTitle: "作者其它话题",
      userPanelTitle: "作者",
      // 除当前话题外的其它所有话题
      otherTopics: []
    };
  },
  components: {
    Loading,
    Panel,
    UserPanel
  },
  watch: {
    // 检测到 $route 发生变化，就执行函数。
    $route: function(to, from) {
      this.getArticle();
    }
  },
  filters: {
    formateReplyTime(timestamp) {
      return util.formatTime(timestamp);
    },
    formateTab(tab) {
      if (tab === "share") {
        return "分享";
      } else if (tab === "ask") {
        return "问答";
      } else if (tab === "job") {
        return "招聘";
      } else {
        return "客户端测试";
      }
    }
  },
  methods: {
    getArticle() {
      this.$http
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then(res => {
          this.art = res.data.data;
          this.getUserInfo();
        })
        .catch(err => {
          alert(err);
        });
    },
    getUserInfo() {
      console.log("又执行");
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.loginname}`)
        .then(res => {
          this.userInfo = res.data.data;
          // 过滤，除去当前文章
          this.otherTopics = this.filterCurrentTopic(
            this.userInfo.recent_topics,
            this.art
          );
          this.isShowLoading = false;
        })
        .catch(err => {
          alert(err);
        });
    },
    filterCurrentTopic(handleArr, currentTopic) {
      return handleArr.filter(topic => {
        return topic.id !== currentTopic.id;
      });
    },
    bg(art) {
      if (art.top || art.good) {
        return "#80bd01";
      } else {
        this.isShowTab = false;
      }
    },
    color(art) {
      if (art.top || art.good) {
        return "#fff";
      } else {
        this.isShowTab = false;
      }
    },
    tabText(art) {
      if (art.top) {
        return "置顶";
      } else if (art.good) {
        return "精华";
      } else {
        return "";
      }
    }
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
    this.getArticle();
  },
  mounted() {
    console.log("mounted");
  }
};
</script>

<style>
/* 引入外部 css 样式文件 */
/* @import url("../assets/markdown-github.css"); */
@import "github-markdown-css";
.content {
  width: calc(100% - 305px);
  float: left;
}
.art-area {
  background: #fff;
  border-radius: 3px;
  margin-bottom: 13px;
}
.art-area-header {
  border-bottom: 1px solid #e5e5e5;
  padding: 10px;
}
.topic-full-title-wrapper {
  font-weight: 700;
  line-height: 130%;
  font-size: 22px;
  margin: 8px 0;
  display: inline-block;
  vertical-align: bottom;
  width: 90%;
  line-height: 130%;
  word-break: break-word;
  color: #333;
}
.topbar-item {
  font-size: 12px;
  padding: 2px 4px;
  border-radius: 3px;
  margin-right: 10px;
  vertical-align: middle;
}

.art-area-header .details {
  font-size: 12px;
  color: #838383;
}
.art-area-header .details > span::before {
  content: "• ";
}
.art-area-header .details > span::after {
  content: "";
  margin-right: 10px;
}
.markdown-body {
  padding: 10px;
}
.reply-area {
  border-radius: 3px;
}
.reply-count {
  color: #444;
  font-size: 14px;
}
.reply-area-header {
  padding: 10px;
  background: #f6f6f6;
}
.reply-area-main li {
  background: #fff;
  border-top: 1px solid #f0f0f0;
  padding: 10px 10px 0 10px;
}
.reply-author-name {
  color: #666;
  font-size: 12px;
  font-weight: 700;
  float: left;
  margin: 0 5px 0 10px;
}
.reply-time {
  font-size: 11px;
  color: #08c;
  float: left;
}
.reply-author-info > img {
  float: left;
  border-radius: 3px;
}

.ups-count {
  float: right;
}
.markdown-body p {
  margin: 0;
}
.sidebar {
  float: right;
}
</style>