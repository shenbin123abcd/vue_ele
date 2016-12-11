<template>
    <transition name='move'>
      <div v-show='showFlag' class='food_page'>
          <div class='food-content'>
            <div class='image-header'>
              <img :src='food.image'>
              <div class='back' @click='hide'>
                <i class='icon-add_circle icon'></i>
              </div>
            </div>
            <div class='content'>
              <h1 class='title'>{{food.name}}</h1>
              <div class='detail'>
                <span class='sell-count'>月售{{food.sellCount}}份</span>
                <span class='rating'>好评率{{food.rating}}</span>
              </div>
              <div class='price'>
                <span class='now'>¥{{food.price}}</span><span class='old' v-show='food.oldPrice'>¥{{food.oldPrice}}</span>
              </div>
            </div>
          </div>
      </div>
    </transition>
</template>
<style lang='stylus' rel='stylesheet/stylus'>

.food_page
  position:fixed
  top:0
  left:0
  height:100%
  width:100%
  bottom:48px
  z-index:30
  background:#fff
  transform:translate3d(0,0,0)
  &.move-enter-active,&.move-leave-active
    transition:all .3s ease-in-out
  &.move-enter,&.move-leave-active
    transform:translate3d(100%,0,0)
  .image-header
    position:relative
    width:100%
    height:0
    padding-bottom:100%
    img
      position :absolute
      top:0
      left:0
      width:100%
      height:100%
    .back
      position :absolute
      top: 10px
      left:0
      .icon
        display:block
        padding: 15px
        font-size: 20px
        color:#fff

</style>
<script type='text/ecmascript-6'>
    export default{
      props:{
        food:{
          type:Object,
        }
      },
      data(){
        return{
          showFlag:false,
        }
      },
      methods:{
        show(){
          this.showFlag=true;
        },
        hide(){
          this.showFlag=false;
        }
      },
      computed:{

      }

    }
</script>
