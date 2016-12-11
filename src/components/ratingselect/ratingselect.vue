<template>
    <div class='ratingselect'>
        <div class='rating-type border-1px'>
          <span @click='select(2,$event)' class='block positive' :class='{active:selectedType===2}'>{{desc.all}}<span class='count'>{{ratings.length}}</span></span>
          <span @click='select(0,$event)' class='block positive' :class='{active:selectedType===0}'>{{desc.positive}}<span class='count'>{{positives.length}}</span></span>
          <span @click='select(1,$event)' class='block negative' :class='{active:selectedType===1}'>{{desc.negative}}<span class='count'>{{negatives.length}}</span></span>
        </div>
        <div class='switch' :class='{on:onlyContented}' @click='toggleContent($event)'>
          <span class='icon-keyboard_arrow_right icon'></span>
          <span class='text'>只看有内容的评价</span>
        </div>
    </div>
</template>
<style lang='stylus' rel='stylesheet/stylus'>
 @import '../../common/stylus/mixin';

.ratingselect
  .rating-type
    padding:18px 0
    margin:0 18px
    border-1px(rgba(7,17,27,.1))
    font-size:0
    .block
      display:inline-block
      padding:8px 12px
      border-radius:1px
      margin-right: 8px
      color:rgb(77,85,93);
      font-size:12px
      &.active
        color:#fff
      .count
        font-size: 8px
        margin-left:2px
        line-height:16px
      &.positive
        background :rgba(0,160,220,.2)
        &.active
          background :rgba(0,160,220,1)
      &.negative
        background :rgba(77,85,93,.2)
        &.active
          background :rgba(77,85,93,1)
  .switch
    padding:12px 18px
    line-height: 24px
    font-size: 12px
    border-bottom:1px solid rgba(7,17,27,.1)
    color:rgb(147,153,159)
    font-size:0
    &.on
      .icon
        color:#00c850
    .icon
      font-size: 24px
      margin-right: 4px
      display:inline-block
      vertical-align :top
    .text
      display:inline-block
      vertical-align :top
      font-size: 12px

</style>
<script>
    const POSITIVE=0;
    const NEGATIVE=1;
    const ALL=2;

    export default{
      props:{
        ratings:{
          type:Array,
          default(){
            return [];
          }
        },
        selectType:{
          type:Number,
          default:ALL
        },
        onlyContent:{
          type:Boolean,
          default:false,
        },
        desc:{
          type:Object,
          default(){
            return{
              all:'全部',
              positive:'满意',
              negative:'不满意',
            }
          }
        }
      },
      data(){
          return{
              selectedType:this.selectType,
              onlyContented:this.onlyContent,
          }
      },
      components:{

      },
      methods:{
        select(type,event){
          if(!event._constructed){
            return
          }
          this.selectedType=type;
          this.$emit('ratingType',type);
        },
        toggleContent(event){
          if(!event._constructed){
            return
          }
          this.onlyContented=!this.onlyContented;
          this.$emit('onlyContent',this.onlyContented);
        }
      },
      computed:{
        positives(){
          return this.ratings.filter((rating)=>{
            return rating.rateType===POSITIVE
          })
        },
        negatives(){
          return this.ratings.filter((rating)=>{
            return rating.rateType===NEGATIVE
          })
        }
      }
    }
</script>
