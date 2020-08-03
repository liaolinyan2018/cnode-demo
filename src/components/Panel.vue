<template>
  <div class="Panel">
    <header>{{ title }}</header>
    <main>
      <ul>
        <li v-for="item in items">
          <router-link
            :to="postContentRoute(item)"
            class="topic-title"
            :title="item.title"
          >{{ item.title }}</router-link>
        </li>
      </ul>
      <span v-if="noList">无</span>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      noList: false
    };
  },
  props: ["title", "lists"],
  watch: {
    'lists': function() {
      console.log('变化')
      this.limitLists();
    }
  },
  methods: {
    limitLists() {
      if (!this.lists.length) {
        this.noList = true
      }
      this.items = this.lists.slice(0, 5);
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
  beforeMount() {
    this.limitLists();
  }
};
</script>

<style scoped>
.Panel {
  font-size: 13px;
  color: #51585c;
  background: #fff;
  width: 290px;
}
header {
  padding: 10px;
  background: #f6f6f6;
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