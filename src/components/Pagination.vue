<template>
  <div class="Pagination clearfix">
    <button @click="firstPage">首页</button>
    <button @click="prevPage">上一页</button>
    <button v-if="isShow">......</button>
    <button
      v-for="btn in btnItems"
      :class="{'currentBtn': btn===currentBtn }"
      @click="handle(btn)"
    >{{ btn }}</button>
    <button @click="nextPage">下一页</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
      btnItems: [1, 2, 3, 4, 5, "......"],
      currentBtn: 1
    };
  },
  methods: {
    handle(btn) {
      // 刚刚点击的页码
      if (typeof btn === "number") {
        this.currentBtn = btn;
        // 只要点击页码，就要向父组件发送
        this.$emit('requestPage', this.currentBtn);
        // 如果点击的页码 是 最后一个，则移除第一个，最后加一个；第5个按钮页码 > 5 ,则 显示前省略号，否则不显示
        if (this.currentBtn === this.btnItems[4]) {
          this.btnItems.shift();
          this.btnItems.splice(4, 0, this.currentBtn + 1);
          this.isShow = this.btnItems[4] > 5 ? true : false;
          return;
        }
        // 如果点击的页码 是 第一个，且 大于1，则最前增，最后减；第5个按钮页码 > 5 ,则 显示前省略号，否则不显示
        if (this.currentBtn === this.btnItems[0] && this.currentBtn > 1) {
          this.btnItems.splice(4, 1);
          this.btnItems.unshift(this.currentBtn - 1);
          this.isShow = this.btnItems[4] > 5 ? true : false;
          return;
        }
      }
    },
    nextPage() {
      this.currentBtn += 1;
      this.handle(this.currentBtn);
    },
    prevPage() {
      if (this.currentBtn >= 2) {
        this.currentBtn -= 1;
        this.handle(this.currentBtn);
      }
    },
    firstPage() {
      this.currentBtn = 1;
      this.btnItems = [1, 2, 3, 4, 5, "......"];
      this.isShow = false;
      this.$emit('requestPage', this.currentBtn);
    }
  }
};
</script>
<style scoped>
.Pagination {
  margin: 10px;
  border-radius: 4px;
  padding-bottom: 10px;
}
button:focus {
  outline: none;
}
button:hover {
  background: #f5f5f5;
}
button {
  float: left;
  padding: 4px 12px;
  background: #fff;
  border: none;
  border: 1px solid #ddd;
  border-right: none;
  line-height: 20px;
  font-size: 14px;
  color: #778087;
  cursor: default;
}
button.currentBtn {
  color: #80bd01;
}
button:first-child {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
button:last-child {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-right: 1px solid #ddd;
}
</style>