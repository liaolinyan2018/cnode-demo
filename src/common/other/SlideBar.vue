<template>
  <div class="SlideBar">
    <div class="panel">
      <header>作者</header>
      <main>
        <div class="userInfo">
          <img />
          <span></span>
        </div>
        <p>积分：</p>
      </main>
    </div>
    <Panel></Panel>
  </div>
</template>

<script>
import Panel from './Panel'
export default {
  data: function() {
    return {
      loginname: ''
    };
  },
  methods: {
    getUserInfo() {
      this.$http.get(`https://cnodejs.org/api/v1/user${this.$route.params.loginname}`)
    }
  }
};
</script>

<style scoped>
.header {
  background: #444;
  font-size: 13px;
}
/* 内层div布局使用 */
.header-inner {
  width: 90%;
  min-width: 960px;
  margin: 0 auto;
  max-width: 1400px;
  padding: 11px 0;
}

li {
  display: inline-block;
  padding: 5px 15px;
}
li:last-child {
  padding-right: 0px;
}

img {
  width: 120px;
  height: 28px;
  float: left;
}
ul {
  float: right;
  color: #ccc;
}
</style>