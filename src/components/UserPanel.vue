<template>
  <div class="UserPanel">
    <header>
      <span class="divider">{{title}}</span>
    </header>
    <main>
      <div class="clearfix">
        <img class="userInfo-avatar" :src="userInfo.avatar_url" />
        <router-link :to="userInfoRoute(userInfo.loginname)">
          <span class="userInfo-loginname">{{ userInfo.loginname }}</span>
        </router-link>
      </div>
      <p class="userInfo-score">{{ userInfo.score }}积分</p>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["title", "userInfo"],
  methods: {
    userInfoRoute(name) {
      return {
        name: "user_info",
        params: {
          loginname: name
        }
      };
    }
  }
};
</script>

<style scoped>
.UserPanel {
  color: #51585c;

  width: 290px;
  margin-bottom: 13px;
}
header {
  padding: 10px;
  background: #f6f6f6;
  font-size: 13px;
  color: #444;
  border-radius: 3px 3px 0 0;
}
main {
  padding: 10px;
  background: #fff;
}
.userInfo-avatar {
  width: 48px;
  height: 48px;
  vertical-align: middle;
}
.userInfo-loginname {
  font-size: 16px;
  color: #778087;
  margin: 0 5px;
}
.userInfo-score {
  font-size: 14px;
  color: #333;
  line-height: 3em;
}
</style>