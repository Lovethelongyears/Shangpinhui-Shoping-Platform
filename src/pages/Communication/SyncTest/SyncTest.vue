<template>
  <div>
    小明的爸爸现在有{{money}}元
    <h2>不使用sync修改符</h2>
    <!-- 给子组件绑定一个自定义事件:update:money -->
    <!-- :money 父组件给子组件传递props
          @update:money 给子组件绑定的自定义事件，只不过名字叫做update:money -->
    <!-- <Child :money="money"  @update:money="handler"></Child> -->
    <h2>使用sync修改符</h2>
    <!-- :money.sync：1.父组件给子组件传递props money
    2.给当前子组件绑定了一个事件，而且事件名称即为update:money -->
    <Child :money.sync="money"></Child>
    <hr>
  </div>
</template>

<script type="text/ecmascript-6">
  import Child from './Child.vue'
  import Child2 from './Child2.vue'
  export default {
    name: 'SyncTest',
    components: {
      Child,
      Child2
    },
    data() {
      return {
        money:10000
      }
    },
    methods:{
      handler(money){
          this.money = money;
      }
    }
  }
</script>
