<template>
  <div class="Panel">
    <header>{{ title }}</header>
    <main>
      <ul>
        <li v-for="item in items">
          <router-link :to="postContentRoute" class="topic-title">{{ items.title }}</router-link>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postContentRoute: {
        name: "post_content",
        params: {
          id: id,
          loginname: loginname
        }
      },
      items: lists,
      title: title
    };
  },
  props: [title, lists]
};
</script>

<style scoped>
.Panel {
  font-size: 13px;
  color: #51585c;
  background-color: #fff;
}
header {
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
}
main {
  padding: 10px;
  border-radius: 0 0 3px 3px;
  font-size: 14px;
}

li {
  line-height: 2em;
}
.topic-title {
  color: #778087;
  vertical-align: middle;
  display: inline-block;
  max-width: 270px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 30px;
}
</style>