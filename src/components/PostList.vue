<template>
  <div class="PostList">
    <!-- 当列表加载不出来时显示的内容 -->
    <Loading v-if="isShowLoading"></Loading>
    <main class="clearfix" v-else>
      <!-- 首页帖子列表 -->
      <div class="content">
        <header>
          <nav class="topbar">
            <ul>
              <li v-for="item in tabAndRoutes">
                <router-link
                  @click.native="changeTab(item.tab)"
                  :to="item.route"
                  :class="{'currentTab': item.tab === currentTab }"
                >{{ item.tab }}</router-link>
              </li>
            </ul>
          </nav>
        </header>
        <main class="lists-content">
          <ul>
            <li v-for="list in lists" class="list clearfix">
              <router-link :to="userInfoRoute(list)" class="big-avatar-wrapper">
                <img :src="list.author.avatar_url" class="big-avatar" />
              </router-link>
              <div class="count-wrapper">
                <span class="reply_count" title="回复数">{{list.reply_count}}</span>
                <span class="count_seperator">/</span>
                <span class="visit_count" title="点击数">{{ list.visit_count }}</span>
              </div>
              <div class="topic-title-wrapper">
                <span
                  v-show="isShowTab"
                  class="topbar-item"
                  :style="{
                    background: bg(list),
                    color: color(list)
                    }"
                >{{ tabText(list) }}</span>
                <router-link
                  :to="postContentRoute(list)"
                  class="topic-title"
                  :title="list.title"
                >{{ list.title }}</router-link>
              </div>
              <router-link class="list-right" :to="postContentRoute(list)" title="帖子最新回复时间">
                <img :src="list.author.avatar_url" class="small-avatar" v-if="list.reply_count" />
                <span class="last-reply-time">{{ list.last_reply_at | formateReplyTime }}</span>
              </router-link>
            </li>
          </ul>
          <Pagination @requestPage="handleRequestPage"></Pagination>
        </main>
      </div>
      <div class="sidebar">
        <div class="panel">
          <p>CNode：Node.js专业中文社区</p>
        </div>
        <Panel :lists="noReplyLists" :title="panelTitle"></Panel>
      </div>
    </main>
  </div>
</template>

<script>
import * as util from "../common/utils/util";
import Loading from "./Loading";
import Pagination from "./Pagination";
import Panel from "./Panel";

export default {
  data() {
    return {
      isShowLoading: true,
      lists: [],
      page: 1,
      isShowTab: true,
      currentTab: "全部",
      // tab 与 路由一一对应
      tabAndRoutes: [
        {
          tab: "全部",
          route: {
            name: "all",
            params: {
              tab: "all"
            }
          }
        },
        {
          tab: "精华",
          route: {
            name: "post_content",
            params: {
              id: "5d5bed6ed53e9171e98a975b",
              loginname: "mariodu"
            }
          }
        },
        {
          tab: "分享",
          route: {
            name: "root"
          }
        },
        {
          tab: "回答",
          route: {
            name: "root"
          }
        },
        {
          tab: "招聘",
          route: {
            name: "root"
          }
        },
        {
          tab: "客户端测试",
          route: {
            name: "root"
          }
        }
      ],
      noReplyLists: [],
      panelTitle: "无人回复的话题"
    };
  },
  components: {
    Loading,
    Pagination,
    Panel
  },
  methods: {
    getList() {
      this.$http
        .get("https://cnodejs.org/api/v1/topics", {
          params: {
            page: this.page,
            limit: 40
          }
        })
        .then(res => {
          this.lists = res.data.data;
          this.noReplyLists = this.filterLists(this.lists);
          this.isShowLoading = false;
        })
        .catch(err => {
          alert(err);
        });
    },
    filterLists(lists) {
      return lists.filter(list => {
        return list.reply_count === 0;
      });
    },
    changeTab(tab) {
      // 点击tab改样式
      this.currentTab = tab;
    },
    bg(list) {
      if (list.top || list.good) {
        return "#80bd01";
      } else if (list.tab === "share" || list.tab === "ask") {
        return "#e5e5e5";
      } else {
        this.isShowTab = false;
      }
    },
    color(list) {
      if (list.top || list.good) {
        return "#fff";
      } else if (list.tab === "share" || list.tab === "ask") {
        return "#999";
      } else {
        this.isShowTab = false;
      }
    },
    tabText(list) {
      if (list.top) {
        return "置顶";
      } else if (list.good) {
        return "精华";
      } else if (list.tab === "share") {
        return "分享";
      } else if (list.tab === "ask") {
        return "问答";
      } else {
        return "";
      }
    },
    postContentRoute(list) {
      return {
        name: "post_content",
        params: {
          id: list.id,
          loginname: list.author.loginname
        }
      };
    },
    userInfoRoute(list) {
      return {
        name: "user_info",
        params: {
          loginname: list.author.loginname
        }
      };
    },
    handleRequestPage(page) {
      console.log(page);
      this.page = page;
      this.getList();
    }
  },
  filters: {
    formateReplyTime(timestamp) {
      return util.formatTime(timestamp);
    }
  },
  // 生命周期钩子
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
    // 在挂载到页面之前 先把数据获取好
    this.getList();
  },
  mounted() {
    console.log("mounted");
  }
};
</script>

<style scoped>
.content {
  float: left;
  width: calc(100% - 305px);
}
header {
  padding: 10px;
  background: #f6f6f6;
}
.topbar li {
  display: inline-block;
  margin: 0 10px;
  font-size: 14px;
}
.topbar a:hover {
  color: #005580;
}
.topbar a {
  color: #80bd01;
}
.topbar a.currentTab {
  padding: 3px 4px;
  border-radius: 3px;
  background: #80bd01;
  color: #fff;
}

.lists-content {
  background: rgb(255, 255, 255);
}
.lists-content li {
  display: block;
  border-top: 1px solid #f0f0f0;
  padding: 10px;
}
.lists-content li:first-child {
  border-top: none;
}
.big-avatar-wrapper {
  float: left;
}
.big-avatar {
  width: 30px;
  height: 30px;
  border-radius: 3px;
  vertical-align: middle;
}
.small-avatar {
  width: 18px;
  height: 18px;
  border-radius: 3px;
  vertical-align: middle;
}

.list-right {
  float: right;
  padding: 3px 0 5px;
}
.last-reply-time {
  color: #778087;
  font-size: 11px;
  /* 行内文字居右显示 */
  display: inline-block;
  min-width: 50px;
  text-align: right;
  white-space: nowrap;
}

.count-wrapper {
  float: left;
  padding: 5px 0;
  width: 10%;
  text-align: center;
}
.reply_count {
  font-size: 14px;
  color: #9e78c0;
}
.visit_count {
  font-size: 10px;
  color: #b4b4b4;
}
.count_seperator {
  margin: 0 -3px;
  font-size: 10px;
  color: #333;
}
.topic-title-wrapper {
  float: left;
  padding: 4px 0;
  width: 75%;
}
.topic-title {
  /* 设置单行省略文本 */
  display: inline-block;
  max-width: 92%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* 设置该内联元素自己垂直居中 */
  vertical-align: middle;
  color: #333;
}
.topbar-item {
  font-size: 12px;
  padding: 2px 4px;
  border-radius: 3px;
}
a.topic-title:link {
  color: #333;
}
a.topic-title:visited {
  color: #888;
}
a.topic-title:hover {
  text-decoration: underline;
}
/* 侧边栏样式 */
.panel {
  font-size: 14px;
  word-break: break-word;
  width: 290px;
  padding: 10px;
  background: #fff;
  margin: 0 0 10px;
}
.sidebar {
  float: right;
}
</style>