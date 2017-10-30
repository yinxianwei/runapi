<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="less">
@import '~@/styles/_flex';
body {
  width: 500px;
  min-height: 800px;
  background-color: white;
  font-family: "Avenir", Helvetica Neue, Tahoma, Arial, PingFangSC-Regular,
    Hiragino Sans GB, Microsoft Yahei, sans-serif;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  touch-action: manipulation;
  -ms-text-size-adjust: none;
  font-size: 14px;
}
</style>
