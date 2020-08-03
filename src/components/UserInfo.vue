<template>
  <div class="UserInfo">
    <loading v-if="isShowLoading"></loading>
    <main class="clearfix" v-else>
      <div class="content">
        <div class="panel-1 panel">
          <header>
            <router-link to="/">主页</router-link>
            <span class="divider">/</span>
          </header>
          <main>
            <div class="clearfix">
              <img :src="userInfo.avatar_url" class="userInfo-avatar" />
              <span class="userInfo-loginname">{{ userInfo.loginname }}</span>
            </div>
            <p class="userInfo-score">{{ userInfo.score }}积分</p>
            <p class="userInfo-regist-time">注册时间 {{ userInfo.create_at | formateReplyTime }}</p>
          </main>
        </div>
        <div class="panel panel-2">
          <header>最近创建的话题</header>
          <main>
            <ul>
              <li v-for="item in userInfo.recent_topics" class="clearfix">
                <router-link
                  :to="{
                  name: 'user_info',
                  params: {
                    loginname: item.author.loginname
                  }
                }"
                  class="big-avatar-wrapper"
                >
                  <img
                    :src="item.author.avatar_url"
                    :title="item.author.loginname"
                    class="big-avatar"
                  />
                </router-link>
                <router-link
                  class="topic-title-wrapper"
                  :to="{
                    name: 'post_content',
                    params: {
                      id: item.id
                    }
                  }"
                >
                  <span class="topic-title" :title="item.title">{{ item.title }}</span>
                </router-link>
                <router-link
                  class="list-right"
                  :to="{
                    name: 'post_content',
                    params: {
                      id: item.id
                    }
                  }"
                >
                  <span
                    title="帖子最新回复时间"
                    class="last-reply-time"
                  >{{ item.last_reply_at | formateReplyTime }}</span>
                </router-link>
              </li>
            </ul>
          </main>
        </div>
        <div class="panel panel-3">
          <header>最近参与的话题</header>
          <main>
            <ul>
              <li v-for="item in userInfo.recent_replies" class="clearfix">
                <router-link :to="userInfoRoute(item)" class="big-avatar-wrapper">
                  <img
                    :src="item.author.avatar_url"
                    :title="item.author.loginname"
                    class="big-avatar"
                  />
                </router-link>
                <router-link class="topic-title-wrapper" :to="postContentRoute(item)">
                  <span class="topic-title" :title="item.title">{{ item.title }}</span>
                </router-link>
                <router-link class="list-right" :to="postContentRoute(item)">
                  <span
                    title="帖子最新回复时间"
                    class="last-reply-time"
                  >{{ item.last_reply_at | formateReplyTime }}</span>
                </router-link>
              </li>
            </ul>
          </main>
        </div>
      </div>
      <div class="sidebar">
        <UserPanel :title="userPanelTitle" :userInfo="userInfo"></UserPanel>
      </div>
    </main>
  </div>
</template>

<script>
import * as util from "../common/utils/util";
import Loading from "./Loading";
import UserPanel from "./UserPanel"
export default {
  data() {
    return {
      isShowLoading: true,
      userInfo: {},
      userPanelTitle: '个人信息'
    };
  },
  components: {
    Loading,
    UserPanel
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
    getUserInfo() {
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.loginname}`)
        .then(res => {
          console.log(res.data.data);
          this.userInfo = res.data.data;
          console.log("获取数据结束");
          this.isShowLoading = false;
        })
        .catch(err => {
          alert(err);
        });
    },
    userInfoRoute(list) {
      return {
        name: "user_info",
        params: {
          loginname: list.author.loginname
        }
      };
    },
    postContentRoute(list) {
      return {
        name: "post_content",
        params: {
          id: list.id,
          loginname: list.author.loginname
        }
      };
    }
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
    this.getUserInfo();
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
a {
  color: #80bd01;
}

.panel {
  margin-bottom: 13px;
}
.panel header {
  padding: 10px;
  background: #f6f6f6;
  border-bottom: 1px solid #e5e5e5;
  border-radius: 3px 3px 0 0;
}
.panel main {
  border-radius: 0 0 3px 3px;
}
.divider {
  padding: 0 5px;
  color: #ccc;
}
.panel-1 main {
  font-size: 14px;
  background: #fff;
  padding: 10px;
}
.userInfo-avatar {
  width: 40px;
  height: 40px;
  float: left;
}
.userInfo-loginname {
  color: #778087;
  margin-left: 16px;
  float: left;
}

.userInfo-score {
  color: #333;
  margin: 16px 0;
}
.userInfo-regist-time {
  color: #ababab;
}
.panel li {
  border-top: 1px solid #f0f0f0;
  padding: 10px;
  background: #fff;
}
.big-avatar-wrapper {
  float: left;
}
img.big-avatar {
  width: 30px;
  height: 30px;
  border-radius: 3px;
  vertical-align: middle;
  margin-right: 16px;
}
.topic-title-wrapper {
  float: left;
  padding: 5px 0;
  width: 80%;
}
.topic-title {
  /* 设置单行省略文本 */
  display: inline-block;
  max-width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* 设置该内联元素自己垂直居中 */
  vertical-align: middle;
  color: #08c;
}
.last-reply-time {
  color: #778087;
  font-size: 11px;
  display: inline-block;
  /* span内文字居右显示 */
  min-width: 58px;
  text-align: right;
  white-space: nowrap;
  /* span 在父容器中居中 */
  vertical-align: middle;
}
.list-right {
  float: right;
  padding: 5px 0;
  max-width: 10%;
}
.sidebar {
  float: right;
}
</style>