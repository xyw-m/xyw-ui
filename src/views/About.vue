<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div id="affixContainer" style="height:200px;overflow-y:auto">
      <p>11111111</p>
      <x-affix
        ref="affix"
        :offsetTop="top"
        :target="getTarget">
        <button>固钉内容</button>
      </x-affix>
      <pre>
      固钉组件可以将元素钉在可视范围内。

      当内容区域比较长，

      需要滚动页面时，

      固钉组件可以在滚动范围内始终展现，

      常用于侧边菜单和按钮组合。

      注意：当页面可视范围过小时，

      慎用此功能以免遮挡页面内容。
      </pre>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      top: 20
    }
  },
  methods: {
    getTarget () {
      return document.querySelector('#affixContainer')
    }
  },
  mounted () {
    console.log(this.$refs.affix)
  }
}
</script>
