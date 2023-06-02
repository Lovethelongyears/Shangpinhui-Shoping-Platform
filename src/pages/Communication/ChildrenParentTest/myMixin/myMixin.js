export default {
    // 对外暴露的对象，可以放置组件重复JS业务逻辑
    methods: {
        giveMoney(money) {
            this.money -= money;
            //$parent,VC一个属性,可以获取当前组件(属性|方法)
            this.$parent.money += money;
        }
    },
}