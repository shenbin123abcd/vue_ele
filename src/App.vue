<template>
  <div id="app">
    <v-header :seller='seller'/>
    <div class='tab border-1px'>
      <div class=''></div>
      <div class='tab-item'>
        <router-link to="/goods">商品</router-link>
      </div>
      <div class='tab-item'>
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class='tab-item'>
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class='content'>
      <router-view :seller='seller'></router-view>
    </div>
  </div>
</template>

<style lang='stylus' rel='stylesheet/stylus'>
  @import './common/stylus/mixin.styl'
  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    .tab
      height: 40px
      line-height:40px
      display:flex
      width:100%
      border-1px(rgba(7,17,27,.1))
      .tab-item
        flex:1
        text-align:center
        &>a
          display:block
          font-size:14px
          color:rgb(77,85,93)
          &.router-link-active
            color:#f01414


</style>

<script type='text/ecmascript-6'>
import header from 'components/header/header';
const ERR_OK=0;

export default {
  name: 'app',
  data(){
    return{
      seller:{}
    }
  },
  components: {
    'v-header':header
  },
  created(){
    this.$http.get('/api/seller').then((res)=>{
      res=res.body;
      if(res.errno===ERR_OK){
        this.seller=res.data;
        //console.log(this.seller);
      }
    },()=>{

    });
  },
};
</script>

