<template>
  <div class="Header">
    <div class="header-inner clearfix">
      <router-link to="/"><img src="../assets/cnodejs_light.svg" /></router-link>
      <ul>
        <li>
          <router-link to="/">首页</router-link>
        </li>
        <li>
          <router-link to="/">新手入门</router-link>
        </li>
        <li>
          <router-link to="/">API</router-link>
        </li>
        <li>
          <router-link to="/">关于</router-link>
        </li>
        <li>
          <router-link to="/">注册</router-link>
        </li>
        <li>
          <router-link to="/">登陆</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {};
  }
};
</script>

<style scoped>
.Header {
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
}
a {
  color: #ccc;
}
a:hover {
  color: #fff;
}
</style>