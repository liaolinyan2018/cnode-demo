<template>
  <div class="Loading">
    <div class="loading">
      <img src="../assets/loading.svg" />
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.Loading {
  height: 100vh;
  position: relative;
  background: #fff;
}
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>