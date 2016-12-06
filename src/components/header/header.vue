<template>
    <div class='header'>
      <div class='content-wrapper'>
        <div class='avatar'>
          <img :src='seller.avatar' width='64' height='64'>
        </div>
        <div class='content'>
          <div class='title'>
            <span class='brand'></span>
            <span class='name'>{{seller.name}}</span>
          </div>
          <div class='desc'>
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </div>
          <div class='supports' v-if="seller.supports">
            <span class='icon' :class='classMap[seller.supports[0].type]'></span>
            <span class='text'>{{seller.supports[0].description}}</span>
          </div>
        </div>
        <div v-if='seller.supports' class='support-count' @click='showDetail'>
          <span class='count'>{{seller.supports.length}}个</span>
          <i class='icon-keyboard_arrow_right'></i>
        </div>
      </div>
      <div class='bulletin-wrapper' @click='showDetail'>
        <span class='bulletin-title'></span>
        <span class='bulletin-text'>{{seller.bulletin}}</span>
        <i class='icon-keyboard_arrow_right'></i>
      </div>
      <div class='background'>
        <img :src='seller.avatar' width='100%' height='100%'>
      </div>
      <transition name='fade'>
        <div class='detail' v-show='detailShow'>
          <div class='detail-warpper clearfix'>
            <div class="detail-main">
              <h1 class='name'>{{seller.name}}</h1>
              <div class='star-wrapper'>
                <star :size="48" :score='seller.score'></star>
              </div>
              <div class='title'>
                <div class='line'></div>
                <div class='text'>优惠信息</div>
                <div class='line'></div>
              </div>
              <ul v-if='seller.supports' class='supports'>
                <li class='support-item' v-for="(item,index) in seller.supports">
                  <span class='icon' :class='classMap[item.type]'></span>
                  <span class='text'>{{item.description}}</span>
                </li>
              </ul>
              <div class='title'>
                <div class='line'></div>
                <div class='text'>商家公告</div>
                <div class='line'></div>
              </div>
              <div class='bulletin'>
                <p class='content'>{{seller.bulletin}}</p>
              </div>
            </div>
          </div>
          <div class='detail-close' @click='hideDetail'>
            <i class='icon-remove_circle_outline'></i>
          </div>
        </div>
      </transition>
    </div>
</template>
<style lang='stylus' rel='stylesheet/stylus'>
  @import '../../common/stylus/mixin';

  .header
    color: #ffffff
    position :relative
    background :rgba(7,17,27,.5)
    overflow :hidden
    .fade-enter-active, .fade-leave-active
      transition: all .5s
    .fade-enter, .fade-leave-active
      opacity: 0
    .content-wrapper
      padding:24px 12px 18px 24px
      font-size:0
      position relative
      .avatar
        display:inline-block
        vertical-align :top
        img
          -webkit-border-radius: 2px
          -moz-border-radius: 2px
          border-radius: 2px
      .content
        display:inline-block
        margin-left:16px
        .title
          margin-top: 2px
          margin-bottom:8px
          .brand
            width:30px
            height:18px
            display:inline-block
            bg-image('brand')
            background-size:30px 18px
            background-repeat :no-repeat
            vertical-align: top
          .name
            font-size: 16px
            margin-left: 6px
            line-height :18px
            font-weight:bold
        .desc
          margin-bottom: 10px
          line-height 12px
          font-size: 12px
        .supports
          .icon
            display:inline-block
            width:12px
            height: 12px
            margin-right: 4px
            -webkit-background-size: 12px
            background-size: 12px
            background-repeat:no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            font-size: 10px
            line-height :12px
            vertical-align:top
      .support-count
        position :absolute
        right: 12px
        bottom: 14px
        padding:0 8px
        height: 24px
        line-height 24px
        -webkit-border-radius:14px
        -moz-border-radius:14px
        border-radius:14px
        background:rgba(0,0,0,.2)
        text-align center
        .count
          font-size: 10px
        .icon-keyboard_arrow_right
          font-size: 10px
          vertical-align: top
          line-height :24px
          margin-left:2px


    .bulletin-wrapper
      height: 28px
      line-height: 28px
      padding:0 22px 0 12px
      white-space: nowrap
      overflow:hidden
      text-overflow: ellipsis
      position: relative
      background :rgba(7,17,27,.2)
      .bulletin-title
        display :inline-block
        width: 22px
        height: 12px
        line-height :12px
        bg-image('bulletin')
        background-size:22px 12px
        background-repeat :no-repeat
        vertical-align :middle
      .bulletin-text
        font-size: 10px
        font-weight:200
        margin-left:2px
        margin-right:4px
        vertical-align :top
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        right:12px
        top: 8px
    .background
      position :absolute
      top:0
      left:0
      width:100%
      height:100%
      z-index:-1
      filter:blur(10px)
    .detail
      position :fixed
      z-index:100
      height:100%
      width:100%
      overflow :auto
      background :rgba(7,17,27,.8)
      top:0
      left:0
      backdrop-filter:blur(10px)
      -webkit-backdrop-filter :blur(10px)
      .detail-warpper
        min-height :100%
        width:100%
        .detail-main
          margin-top: 64px
          padding-bottom :64px
          .name
            line-height :16px
            text-align:center
            font-size: 16px
            font-weight:700
          .star-wrapper
            margin-top: 18px
            padding:2px 0
            text-align:center
          .title
            display:flex
            width:80%
            margin:28px auto 24px auto
            .line
              flex: 1 1 auto
              position: relative
              top: -6px
              border-bottom:1px solid rgba(255,255,255,0.2)
            .text
              padding:0 12px
              font-size: 14px
              font-weight:700


          .supports
            width:80%
            margin:auto
            .support-item
              padding:0 12px
              margin-bottom: 12px
              font-size:0
              &:last-child
                margin-bottom:0
              .icon
                display:inline-block
                height: 16px
                width: 16px
                vertical-align:top
                margin-right: 6px
                background-repeat:no-repeat
                background-size:16px 16px
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                line-height :16px
                font-size: 12px


          .bulletin
            width:80%
            margin:auto
            .content
              padding:0 12px
              line-height: 24px
              font-size:12px
  .detail-close
        position :relative
        width: 32px
        height: 32px
        margin:auto
        margin-top:-64px
        clear:both
        font-size: 32px





</style>
<script type='text/ecmascript-6'>
    import star from 'components/star/star';
    export default{
        props:{
          seller:{
            type:Object
          }
        },
        data(){
          return{
            detailShow:false
          }
        },
        created(){
          this.classMap=['decrease','discount','special','invoice','guarantee'];
        },
        components:{
          star
        },
        methods:{
          showDetail(){
            this.detailShow=true
          },
          hideDetail(){
            this.detailShow=false
          }
        }
    }
</script>
