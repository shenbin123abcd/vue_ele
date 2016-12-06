<template>
    <div class='cart-control'>
      <transition name='move'>
        <div class='cart-decrease' @click='decreaseCart($event)' v-show='food.count>0'>
          <span class='inner icon-shopping_cart'></span>
        </div>
      </transition>
      <div class='cart-count' v-show='food.count>0'>{{food.count}}</div>
      <div class='cart-add' @click='addCart($event)'><span class='icon-thumb_down'></span></div>
    </div>
</template>
<style lang='stylus' rel='stylesheet/stylus'>
.cart-control
  font-size:0
  .cart-decrease
    display:inline-block
    padding:6px
    transition:all .4s linear
    &.move-transition
      opacity :1
      transform :translate3d(0,0,0)
    .inner
      display:inline-block
      line-height :24px
      color:rgb(0,160,220)
      font-size: 24px
      transition:all .4s linear
      transform:rotate(0)
    &.move-enter, &.move-leave
      opacity :0
      transform:translate3d(24px,0,0)
      .inner
        transform:rotate(180deg)
  .cart-count
    display:inline-block
    font-size: 10px
    vertical-align :top
    width: 12px
    padding-top: 6px
    line-height :24px
    text-align :center
    color:rgb(147,153,159)
  .cart-add
    font-size: 24px
    display:inline-block
    padding:6px
    line-height :24px
    color:rgb(0,160,220)

</style>
<script type='text/ecmascript-6'>
    //import Vue from 'vue';
    export default{
        props:{
          food:{
            type:Object
          }
        },
        created(){

        },
        methods:{
          addCart(event){
            if(!event._constructed){
              return
            }
            if(!this.food.count){
              this.$set(this.food,'count',1);
            }else{
              this.food.count++;
            }
            this.$emit('cartAdd',event.target);
          },
          decreaseCart(event){
            if(!event._constructed){
              return
            }
            if(this.food.count){
              this.food.count--;
            }
          }
        }
    }
</script>
