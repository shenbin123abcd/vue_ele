<template>
  <div class='goods'>
    <div class='menu-wrapper' ref='menuWrapper'>
      <ul>
        <li
          v-for='(item,index) in goods'
          class='menu-item'
          :class='{"current":currentIndex===index}'
          @click='selectMenu(index,$event)'
        >
          <span class='text border-1px'>
            <span v-show='item.type>0' class='icon' :class='classMap[item.type]'></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class='foods-wrapper' ref='foodsWrapper'>
      <ul>
        <li v-for='(item,index) in goods' class='food-list food-list-hook'>
          <h1 class='title'>{{item.name}}</h1>
          <ul class='food-ul'>
            <li v-for="(food,index2) in item.foods" class='food-item border-1px'>
              <div class='icon'>
                <img width='57' height='57' :src='food.icon'/>
              </div>
              <div class='content'>
                <h2 class='name'>{{food.name}}</h2>
                <p class='desc'>{{food.description}}</p>
                <div class='extra'>
                  <span class='count'>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class='price'>
                  <span class='now'>￥{{food.price}}</span>
                  <span class='old' v-show='food.oldPrice'>￥{{food.oldPrice}}</span>
                </div>
                <div class='cartcontrol-wrapper'>
                  <cartControl :food="food" v-on:cartAdd='_drop'></cartControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopCart
      :deliveryPrice='seller.deliveryPrice'
      :minPrice='seller.minPrice'
      :selectFoods='selectFoods'
      ref='shopcart'
    />
  </div>
</template>
<style lang='stylus' rel='stylesheet/stylus'>
  @import '../../common/stylus/mixin';
  .goods
    position:absolute
    width:100%
    top: 174px
    bottom: 46px
    display:flex
    overflow :hidden
    .menu-wrapper
      flex:0 0 80px
      width: 80px
      background :#f3f5f7
      .menu-item
        display :table
        font-size: 10px
        height: 54px
        //width: 56px
        line-height: 14px
        padding:0 12px
        &.current
          position:relative
          margin-top: -1px
          z-index:10
          background :#fff
          font-weight:700
          .text
            border-none()
        .icon
          display:inline-block
          width:12px
          height: 12px
          margin-right: 2px
          -webkit-background-size: 12px
          background-size: 12px
          background-repeat:no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          font-size: 12px
          display :table-cell
          width: 56px
          vertical-align :middle
          border-1px(rgba(7,17,27,.1))
    .foods-wrapper
      flex:1
      background :#fff
      .title
        padding-left: 14px
        height: 26px
        line-height :26px
        border-left:2px solid #d9dde1
        font-size: 12px
        color:rgb(147,153,159)
        background :#f3f5f7
      .food-ul
        padding:0 18px
        .food-item
          display:flex
          padding: 18px 0
          border-1px(rgba(7,17,27,.1))
          &:last-child
            border-none()
            margin-bottom:0
          .icon
            flex:0 0 57px
            margin-right: 10px
          .content
            flex:1
            .name
              margin:2px 0 8px 0
              height: 14px
              line-height :14px
              font-size: 14px
              color:rgb(7,17,27)
            .desc, .extra
              line-height :10px
              font-size: 10px
              color:rgb(147,153,159)
            .desc
              margin-bottom: 8px
              line-height :12px
            .extra
              .count
                margin-right:12px
            .price
              font-weight:700
              line-height :24px
              .now
                margin-right :10px
                font-size: 14px
                color:rgb(240,20,20)
              .old
                text-decoration :line-through
                font-size: 10px
                color:rgb(147,153,159)


            .cartcontrol-wrapper
              position :absolute
              right:0
              bottom: 12px
</style>
<script type='text/ecmascript-6'>
    import BScroll from 'better-scroll';
    import shopCart from 'components/shopcart/shopcart';
    import cartControl from 'components/cartcontrol/cartcontrol'

    const ERR_OK=0;
    export default{
        props:{
          seller:{
            type:Object
          }
        },
        data(){
            return{
              goods:[],
              listHeight:[],
              scrollY:0,
            };
        },
        components:{
          shopCart,
          cartControl,
        },
        created(){
          this.classMap=['decrease','discount','special','invoice','guarantee'];
          this.$http.get('/api/goods').then((res)=>{
            res=res.body;
            if(res.errno==ERR_OK){
              this.goods=res.data;
              //$nextTick
              this.$nextTick(()=>{
                this._initScroll();
                this._calculateHeight();
                //eventHub.$on('cartAdd',this._drop);
              });
            }
          },(res)=>{

          });
        },
        computed:{
          currentIndex(){
            for(let i=0;i<this.listHeight.length;i++){
              let height1=this.listHeight[i];
              let height2=this.listHeight[i+1];
              if(!height2 || this.scrollY<height2 && this.scrollY>=height1){
                return i;
              }
            }
            return 0
          },
          selectFoods(){
            let foods=[];
            this.goods.forEach((n,i)=>{
              n.foods.forEach((n2,i2)=>{
                if(n2.count){
                  foods.push(n2);
                }
              });
            });
            return foods
          }
        },
        methods:{
          _initScroll(){
            this.menuScroll=new BScroll(this.$refs.menuWrapper,{
              click:true
            });
            this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{
              probeType:3,
              click:true
            });
            //监听得到当前滚动的高度
            this.foodsScroll.on('scroll',(pos)=>{
              this.scrollY=Math.abs(Math.round(pos.y));
            });

          },
          _calculateHeight(){
            let foodList=(this.$refs.foodsWrapper).getElementsByClassName('food-list-hook');
            //console.log(foodList);
            let height=0;
            this.listHeight.push(height);
            for(let i=0;i<foodList.length;i++){
              let item=foodList[i];
              height+=item.clientHeight;
              this.listHeight.push(height);
            }
          },
          selectMenu(index,event){
            if(!event._constructed){
              return
            }
            let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
            let el=foodList[index];
            this.foodsScroll.scrollToElement(el,300);
          },
          _drop(target){
            this.$refs.shopcart.drop(target)
          },

        }
    }
</script>
