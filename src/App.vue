<template>
  <div id="App">
    <Header class="App-header"></Header>
    <main class="App-main">
      <!-- 路由出口 -->
      <!-- 路由匹配到的组件将渲染在这里 -->
      <!-- 命名视图 -->
      <router-view name="main"></router-view>
      <!-- <router-view name="side"></router-view> -->
    </main>
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  name: "App",
  components: {
    Header
  }
};
</script>

<style>
/* 以下是全局样式，将整个项目需要用到的通用样式写在这里 */
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
.App-main {
  width: 90%;
  max-width: 1400px;
  min-width: 960px;
  margin: 15px auto;
}
a {
  cursor: pointer;
  text-decoration: none;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
ul,
li {
  list-style: none;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
</style>
