<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 没有用户名，未登录 -->
          <p v-if="!userName">
            <span>请</span>
            <!-- 声明式导航：务必要有to属性 -->
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <!-- 登录了 -->
          <p v-else>
            <a>{{ userName }}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <router-link to="/communication">我的尚品汇</router-link>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyWord"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      keyWord: "",
    };
  },
  methods: {
    goSearch() {
      // 搜索按钮的回调函数，需要向search路由进行跳转
      // 路由传递参数
      // 1.字符串形式
      // this.$router.push('/search/'+this.keyWord+"?k=10")
      // 2.模板字符串
      // this.$router.push(`/search/${this.keyWord}?k=10`)
      // 3.对象
      // this.$router.push({name:'search',params:{keyword:this.keyWord},query:{k:this.keyWord}})
      /* ***************************************************************************************** */
      // 面试题1.路由传递参数（对象写法）path是否可以结合params参数一起使用？
      // 答：路由跳转传参时，对象的写法可以是name、path形式，但是需要注意的是path这种写法不能与params参数一起使用
      // this.$router.push({path:'/search',params:{keyword:this.keyWord},query:{k:this.keyWord}})
      // 面试题2.如何指定params参数可传可不传？
      // 如果路由要求传递params参数时，没有传递params参数，URL就会出问题
      // 指定params参数传递或不传递参数的方法：在配置路由的时候，在占位的后面加上一个问号？【表示params参数可以传递或不传递】
      // this.$router.push({name:'search',query:{k:this.keyWord}})
      // 面试题3：params参数可以传或不传参数，但是如果传递空值，如何解决？
      // 使用undefined解决：params参数传递的值为空字符串时
      // this.$router.push({name:'search',params:{keyword:''||undefined},query:{k:this.keyWord}})
      // 面试题4.路由组件能不能传递props数据？
      // 可以：三种写法
      if (this.$route.query) {
        let location = {
          name: "search",
          params: { keyword: this.keyWord || undefined },
        };
        // 代表如果有query参数也带过去
        location.query = this.$route.query;
        this.$router.push(location);
      }
    },
    // 退出登录
    async logout() {
      try {
        await this.$store.dispatch("userLogout");
        // 回到首页
        this.$$router.push("/home");
      } catch (error) {}
    },
  },
  mounted() {
    // 通过全局事件总线清除关键字
    this.$bus.$on("clear", () => {
      this.keyWord = "";
    });
  },
  computed: {
    // 用户名信息
    userName() {
      return this.$store.state.user.userInfo.name;
    },
  },
};
</script>

<style lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
