<template>
    <div class='seller' ref='seller'>
        <div class='seller-content'>
            <div class='overview'>
                <h1 class='title'>{{seller.name}}</h1>
                <div class='desc border-1px'>
                    <star :size='36' :score='seller.score'></star>
                    <span class='text'>({{seller.ratingCount}})</span>
                    <span class='text'>月售{{seller.sellCount}}单</span>
                </div>
                <ul class='remark'>
                    <li class='block'>
                        <h2>起送价</h2>
                        <div class='content'>
                            <span class='stress'>{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class='block'>
                        <h2>商家配送</h2>
                        <div class='content'>
                            <span class='stress'>{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class='block'>
                        <h2>平均配送时间</h2>
                        <div class='content'>
                            <span class='stress'>{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class='bulletin'>
                <h1 class='title'>公告与活动</h1>
                <div class='content-wrapper border-1px'>
                    <p class='content'>{{seller.bulletin}}</p>
                </div>
                <ul v-if='seller.supports' class='supports'>
                    <li class='support-item border-1px' v-for="(item,index) in seller.supports">
                        <span class='icon' :class='classMap[item.type]'></span>
                        <span class='text'>{{item.description}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style lang='stylus' rel='stylesheet/stylus'>
    @import '../../common/stylus/mixin.styl';
    .seller
        position:absolute
        top: 174px
        bottom:0
        left:0
        width:100%
        overflow :hidden
        .overview
            padding: 18px
            .title
                font-size: 14px
                margin-bottom: 8px
                line-height:14px
                color:rgb(7,17,27)
            .desc
                padding-bottom: 18px
                font-size:0
                border-1px(rgba(7,17,27,.1))
                .star
                    display :inline-block
                    vertical-align :top
                    margin-right: 8px
                .text
                    display:inline-block
                    vertical-align :top
                    margin-right: 12px
                    font-size: 10px
                    color:rgb(77,85,93)
                    line-height: 18px

            .remark
                display:flex
                padding-top: 18px
                .block
                    flex:1
                    text-align :center
                    border-right:1px solid rgba(7,17,27,.1)
                    &:last-child
                        border:none
                    h2
                        margin-bottom: 4px
                        line-height: 10px
                        font-size: 10px
                        color:rgb(147,153,159)
                    .content
                        line-height: 24px
                        font-size: 10px
                        color:rgb(7,17,27)
                        .stress
                            font-size: 24px



        .bulletin
            padding:18px 18px 0 18px
            .title
                margin-bottom: 8px
                line-height: 14px
                color:rgb(7,17,27)
                font-size: 14px
            .content-wrapper
                padding:0 12px 16px 12px
                border-1px(rgba(7,17,27,.1))
                .content
                    line-height: 24px
                    font-size: 12px
                    color:rgb(240,20,20)
            .supports
                .support-item
                    padding:16px 12px
                    font-size:0
                    border-1px(rgba(7,17,27,.1))
                    &:last-child
                        border:none
                .icon
                    display:inline-block
                    height: 16px
                    width: 16px
                    vertical-align:top
                    margin-right: 6px
                    background-repeat:no-repeat
                    background-size:16px 16px
                    &.decrease
                        bg-image('decrease_4')
                    &.discount
                        bg-image('discount_4')
                    &.guarantee
                        bg-image('guarantee_4')
                    &.invoice
                        bg-image('invoice_4')
                    &.special
                        bg-image('special_4')
                .text
                    font-size: 12px
                    font-weight:200
                    line-height: 16px
                    color:rgb(7,17,27)
                    vertical-align :top
</style>
<script>
    import star from 'components/star/star';
    import split from 'components/split/split';
    import BScroll from 'better-scroll';

    export default{
        props:{
            seller:{
                type:Object,
            }
        },
        data(){
            return{
                sellerData:null
            }
        },
        created(){
            this.classMap=['decrease','discount','special','invoice','guarantee'];
        },
        mounted(){
            this._initScroll();
        },
        components:{
            star,
            split
        },
        watch:{
            'seller'(newval,oldval){
               //console.log(newval,oldval);
               this._initScroll();
            }
        },
        methods:{
            _initScroll(){
                //console.log(this.seller);
                if(!this.scroll) {
                    this.scroll=new BScroll(this.$refs.seller,{
                        click:true
                    })
                }else{
                    this.scroll.refresh();
                }
            }
        }
    }
</script>
