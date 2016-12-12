<template>
  <div class='ratings' ref='ratings'>
    <div class='ratings-content' >
      <div class='overview'>
        <div class='overview-left'>
          <h1 class='score'>{{seller.score}}</h1>
          <div class='title'>综合评分</div>
          <div class='rank'>高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class='overview-right'>
          <div class='score-wrapper'>
            <span class='title'>服务态度</span>
            <star :size='36' :score='seller.serviceScore'></star>
            <span class='score'>{{seller.serviceScore}}</span>
          </div>
          <div class='score-wrapper'>
            <span class='title'>商品评分</span>
            <star :size='36' :score='seller.foodScore'></star>
            <span class='score'>{{seller.foodScore}}</span>
          </div>
          <div class='delivery-wrapper'>
            <span class='title'>送达时间</span>
            <span class='delivery'>{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect
        :ratings='ratings'
        :selectType='selectType'
        :onlyContent='onlyContent'
        v-on:ratingType='_ratingType'
        v-on:onlyContent='_onlyContent'
      >
      </ratingselect>
      <div class='rating-wrapper'>
        <ul>
          <li v-for='(n,i) in ratings' class='rating-item border-1px' v-show='needShow(n.rateType,n.text)'>
            <div class='avatar'>
              <img :src='n.avatar' width='56' height='56'>
            </div>
            <div class='content'>
              <h1 class='name'>{{n.username}}</h1>
              <div class='star-wrapper'>
                <star :size='24' :score='n.score'></star>
                <span class='delivery' v-show='n.deliveryTime'>{{n.deliveryTime}}</span>
              </div>
              <p class='text'>{{n.text}}</p>
              <div class='recommend' v-show='n.recommend && n.recommend.length'>
                <span class='icon':class='{"icon-arrow_lift":n.rateType===0,"icon-check_circle":n.rateType===1}'></span>
                  <span v-for='(n2,i2) in n.recommend' class='item'>
                    {{n2}}
                  </span>
              </div>
              <div class='time'>
                {{n.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang='stylus' rel='stylesheet/stylus'>
  @import '../../common/stylus/mixin.styl'
  .ratings
    position :absolute
    top: 174px
    bottom:0
    width:100%
    left:0
    overflow :hidden
    .overview
      display:flex
      padding:18px 0
      .overview-left
        flex:0 0 137px
        width: 137px
        text-align :center
        border-right:1px solid rgba(7,17,27,.1)
        padding:6px 0
        @media only screen and (max-width:320px)
          flex:0 0 120px
          width: 120px
        .score
          line-height: 28px
          font-size: 24px
          color:rgb(255,153,0)
          margin-bottom: 6px
        .title
          font-size: 12px
          line-height: 12px
          color:rgb(7,17,27)
          margin-bottom:8px
        .rank
          font-size: 10px
          color:rgb(147,153,159)
          line-height:10px
      .overview-right
        flex:1 1 auto
        padding:6px 0 6px 24px
        @media only screen and (max-width:320px)
          padding:6px 0 6px 6px
        .score-wrapper
          margin-bottom: 8px
          font-size:0
          .title
            font-size: 12px
            line-height: 18px
            display:inline-block
            vertical-align :top
            color:rgb(7,17,27)
          .star
            display:inline-block
            vertical-align :top
            margin:0 12px
          .score
            display:inline-block
            vertical-align :top
            font-size: 12px
            color:rgb(255,153,0)
            line-height: 18px
        .delivery-wrapper
          font-size:0
          .title
            font-size: 12px
            line-height: 18px
            color:rgb(7,17,27)
          .delivery
            font-size: 12px
            margin-left:12px
            color:rgb(147,153,159)




    .rating-wrapper
      padding:0 18px
      .rating-item
        display:flex
        padding: 18px 0
        border-1px(rgba(7,17,27,.1))
        .avatar
          flex:0 0 28px
          width: 28px
          height:28px
          margin-right: 12px
          img
            border-radius:50%
            width:100%
            height:100%
        .content
          flex:1
          position :relative
          .name
            line-height: 12px
            font-size: 17px
            color:rgb(7,17,27)
            margin-bottom: 4px
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display:inline-block
              vertical-align :top
              margin-right: 6px
            .delivery
              display:inline-block
              vertical-align :top
              line-heigth:12px
              font-size: 10px
              color:rgb(147,153,159)
          .text
            line-height: 18px
            color:rgb(7,17,27)
            font-size: 12px
            margin-bottom:8px
          .recommend
            line-height: 16px
            font-size:0
            .icon,.item
              display:inline-block
              margin:0 8px 4px 0
              font-size: 9px
              &.icon-arrow_lift
                color:rgb(0,160,220)
            .item
              padding:0 6px
              border:1px solid rgba(7,17,27,.1)
              border-radius:1px
              color:rgb(147,153,159)
              background :#fff
          .time
            position :absolute
            top:0
            right:0
            line-height:12px
            font-size: 10px
            color:rgb(147,153,159)


</style>
<script type='text/ecmascript-6'>
    import star from 'components/star/star';
    import ratingselect from 'components/ratingselect/ratingselect';
    import split from 'components/split/split';
    import {formatDate} from 'common/js/date';
    import BScroll from 'better-scroll';
    const POSITIVE=0;
    const NEGATIVE=1;
    const ALL=2;
    const ERR_OK=0;

    export default{
        data(){
            return{
              ratings:[],
              selectType:ALL,
              onlyContent:false,
            }
        },
        created(){
          this.$http.get('/api/ratings').then((res)=>{
            res=res.body;
            if(res.errno===ERR_OK){
              this.ratings=res.data;
              this.$nextTick(()=>{
                this.scroll=new BScroll(this.$refs.ratings,{
                  click:true
                });
              });
            }
          })
        },
        props:{
          seller:{
            type:Object,
          }
        },
        filters:{
          formatDate(time){
            let date=new Date(time);
            return formatDate(date,'yyyy-MM-dd hh:mm');
          }
        },
        components:{
          star,
          ratingselect,
          split,
        },
        methods:{
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
        },
    }
</script>
