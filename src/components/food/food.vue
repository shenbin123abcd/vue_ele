<template>
    <transition name='move'>
      <div v-show='showFlag' class='food_page' ref='food'>
          <div class='food-content'>
            <div class='image-header'>
              <img :src='food.image'>
              <div class='back' @click.stop.prevent='hide'>
                <i class='icon-add_circle icon'></i>
              </div>
            </div>
            <div class='content'>
              <h1 class='title'>{{food.name}}</h1>
              <div class='detail'>
                <span class='sell-count'>月售{{food.sellCount}}份</span>
                <span class='rating'>好评率{{food.rating}}%</span>
              </div>
              <div class='price'>
                <span class='now'>¥{{food.price}}</span><span class='old' v-show='food.oldPrice'>¥{{food.oldPrice}}</span>
              </div>
              <div class='cartcontrol-wrapper'>
                <cartcontrol :food='food'></cartcontrol>
              </div>
              <transition name='fade'>
                <div class='buy' v-show='!food.count || food.count===0' @click='addFirst($event)'>加入购物车</div>
              </transition>
            </div>
            <split v-show='food.info'></split>
            <div class='info' v-show='food.info'>
              <div class='title'>商品信息</div>
              <p class='text'>{{food.info}}</p>
            </div>
            <split></split>
            <div class='rating'>
              <h1 class='title'>商品评价</h1>
              <ratingselect
                :desc='desc'
                :ratings='food.ratings'
                :selectType='selectType'
                :onlyContent='onlyContent'
                v-on:ratingType='_ratingType'
                v-on:onlyContent='_onlyContent'
              >
              </ratingselect>
            </div>
            <div class='rating-wrapper'>
              <ul v-show='food.ratings && food.ratings.length'>
                <li
                  v-for="(rating,index) in food.ratings"
                  class='rating-item border-1px'
                  v-show='needShow(rating.rateType,rating.text)'
                >
                  <div class='user'>
                    <span class='name'>{{rating.username}}</span>
                    <img class='avatar' width='12' height='12' :src='rating.avatar'/>
                  </div>
                  <div class='time'>
                    {{rating.rateTime | formatDate}}
                  </div>
                  <p class='text'>
                    <span class='icon':class='{"icon-arrow_lift":rating.rateType===0,"icon-check_circle":rating.rateType===1}'></span>
                    {{rating.text}}
                  </p>
                </li>
              </ul>
              <div class='no-rating' v-show='!food.ratings || !food.ratings.length'>暂无评价</div>
            </div>
          </div>
      </div>
    </transition>
</template>
<style lang='stylus' rel='stylesheet/stylus'>
  @import '../../common/stylus/mixin';
.food_page
  position:fixed
  top:0
  left:0
  width:100%
  bottom:48px
  z-index:30
  background:#fff
  //padding-bottom:47px
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

  .content
    position :relative
    padding: 18px
    .title
      line-height: 14px
      margin-bottom: 8px
      font-size: 14px
      font-weight:700
      color:rgb(7,17,27)
    .detail
      margin-bottom: 18px
      line-height: 10px
      font-size:0
      height:10px
      .sell-count,.rating
        font-size: 10px
        color:rgb(147,153,159)
        .sell-count
          margin-right:12px
    .price
      font-weight:700
      line-height: 24px
      .now
        margin-right: 8px
        font-size: 14px
        color:rgb(240,20,20)
      .old
        text-decoration :line-through
        font-size: 10px
        color:rgb(147,153,159)
      .cartcontrol-wrapper
        position:absolute
        right:0
        bottom:12px
  .cartcontrol-wrapper
    position :absolute
    right: 12px
    bottom: 12px
  .buy
    position :absolute
    right: 18px
    bottom: 20px
    z-index:10
    height: 24px
    line-height:24px
    padding:0 12px
    box-sizing:border-box
    font-size: 10px
    border-radius:12px
    color: #ffffff
    background rgb(0,160,220)
    transition:all .5s
    opacity:1
    &.fade-enter,&.fade-leave-active
      opacity:0
  .info
    padding: 18px
    .title
      line-height: 14px
      margin-bottom: 6px
      font-size: 14px
      color:rgb(7,17,27)
    .text
      font-size: 12px
      line-height: 24px
      padding:0 8px
      color:rgb(77,85,93)
  .rating
    padding-top: 18px
    .title
      line-height: 14px
      margin-left: 18px
      font-size: 14px
      color:rgb(7,17,27)
  .rating-wrapper
    padding:0 18px
  .rating-item
    position :relative
    padding:16px 0
    border-1px(rgba(7,17,27,.1))
    .user
      position :absolute
      right:0
      top: 16px
      font-size:0
      line-height: 12px
      .name
        display:inline-block
        vertical-align :top
        font-size: 10px
        color:rgb(147,153,159)
        margin-right:6px
      .avatar
        border-radius:50%
    .time
      line-height: 12px
      font-size: 10px
      color:rgb(147,153,159)
      margin-bottom: 6px
    .text
      line-height: 16px
      font-size: 12px
      color:rgb(7,17,27)
      .icon-arrow_lift,.icon-check_circle
        line-height: 16px
        margin-right:4px
        font-size:12px
        color:rgb(0,160,220)
      .icon-check_circle
        color:rgb(147,153,159)

  .no-rating
    font-size: 12px
    color:rgb(147,153,159)
    padding:16px 0
</style>
<script type='text/ecmascript-6'>
    import BScroll from 'better-scroll';
    import cartcontrol from 'components/cartcontrol/cartcontrol';
    import split from 'components/split/split';
    import ratingselect from 'components/ratingselect/ratingselect';
    import {formatDate} from 'common/js/date';
    const POSITIVE=0;
    const NEGATIVE=1;
    const ALL=2;

    export default{
      props:{
        food:{
          type:Object,
        }
      },
      data(){
        return{
          showFlag:false,
          selectType:ALL,
          onlyContent:false,
          desc:{
            all:'全部',
            positive:'推荐',
            negative:'吐槽',
          }
        }
      },
      components:{
        cartcontrol,
        split,
        ratingselect,
      },
      methods:{
        show(){
          this.showFlag=true;
          //初始化数据
          this.selectType=ALL;
          this.onlyContent=false;
          this.$nextTick(()=>{
            if(!this.scroll){
              this.scroll=new BScroll(this.$refs.food,{
                click:true,
              });
            }else{
              this.scroll.refresh();
            }
          });
        },
        hide(){
          this.showFlag=false;
        },
        addFirst(event){
          if(!event._constructed){
            return
          }
          this.$set(this.food,'count',1);
          this.$emit('cartAdd',event.target);
        },
        needShow(type,text){
          //console.log(type,text);
          if(this.onlyContent && !text){
            return false
          }
          if(this.selectType===ALL){
            return true
          }else{
            return type===this.selectType;
          }
        },
        _ratingType(type){
          this.selectType=type;
          this.$nextTick(()=>{
            this.scroll.refresh();
          });
        },
        _onlyContent(bool){
          this.onlyContent=bool;
          this.$nextTick(()=>{
            this.scroll.refresh();
          });
        },

      },
      filters:{
        formatDate(time){
          let date=new Date(time);
          return formatDate(date,'yyyy-MM-dd hh:mm');
        }
      },
      computed:{

      }

    }
</script>
