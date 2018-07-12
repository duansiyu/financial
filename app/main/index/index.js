 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
   ScrollView,
   TouchableOpacity,
   ListView,
   RefreshControl,
   Alert,
   Platform
 } from 'react-native';

 import NavigationBar from '../../components/NavigationBar';
 import ProductList from '../../components/product';
 import ViewHtml from '../../components/ViewHtml';
 import YouBiCenter from '../../main/kind/YouBi/YouBiCenter';
 import ActivityCenter from '../../main/kind/Activity/ActivityCenter';
 import Invitation from '../../main/kind/Invitation/Invitation';
 import Security from '../../main/kind/Security/security';
 import Swiper from 'react-native-swiper';
 import {styles} from '../../style/main';
 import {StyleConfig} from '../../style';
 import Service from '../../utils/service';
 import ViewPager from 'react-native-viewpager';//轮播图
 //import MarqueeLabel from 'react-native-lahk-marquee-label';//跑马灯
 import MarqueeLabelVertical from 'react-native-lahk-marquee-label-vertical';
 import {Navigator} from 'react-native-deprecated-custom-components';
 import {_} from 'underscore';
 import finacialDetail from '../../main/financial/financiaDetail';
 import Login from '../../main/other/login';

 //轮播图
var BANNER_IMGS = [
    //{uri:'http://www.zhongren168.com/upload/banner/20170613142048.PNG'},      //远程图片
    //require('../../imgs/index/banner_001.png'),                               //本地图片
    //require('../../imgs/index/banner_001.png'),
    //require('../../imgs/index/banner_001.png')
];
class Invest extends Component {
  render(){
    let data = this.props.data;
    return(
      <Text style={styles.user}>用户 
        {data.nickname}
        投资 {data.loanTitle}
      :
        <Text style={styles.money}>{data.tenderMoney}</Text>
      </Text>
      );
  }
}


export default class Index extends Component {
    constructor(props) {
      super(props);
       // 用于构建DataSource对象
        let dataSource = new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2});
        let listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let investList = new ListView.DataSource({rowHasChanged: (q1, q2) => q1 !== q2});
        // 实际的DataSources存放在state中
        this.state = {
            isRefreshing:false,
            dataSource: dataSource.cloneWithPages(BANNER_IMGS),
            listData: listData.cloneWithRows([]),
            tzdtList:null,
        }
    }

    componentDidMount(){
        //获取banner的数据
       this.timer = setInterval(()=>{this._getData()},5000);
        //this._getData();
    }

    componentWillUnmount(){
    clearInterval(this.timer);
   }

   //油币中心
    _goToYouBi= () => {
      let data = global.USER;
      if(data){
         this.props.navigator.push({
          component: YouBiCenter,
          name: 'YouBiCenter'
        }); 
       }else{
        Alert.alert(
              '提示信息',
              '您还未登录，请先登录！',
              [
                  {text: '取消' },
                  {text: '确定', onPress: () => this.props.navigator.push({component:Login,name:'Login'})},
              ]
          )
       }
      
    }

      //活动中心
     _goToActivity= () => {
       this.props.navigator.push({
         component: ActivityCenter,
          name: 'ActivityCenter'
       });
     }

     //邀请好友
    _goToInvitation= () => {
      let data = global.USER;
      if(data){
          this.props.navigator.push({
          component: Invitation,
          name: 'Invitation'
        });
      }else{
        Alert.alert(
                '提示信息',
                '您还未登录，请先登录！',
                [
                    {text: '取消' },
                    {text: '确定', onPress: () => this.props.navigator.push({component:Login,name:'Login'})},
                ]
            )
         }  
    }

    //安全保障
    _goToSecurity= () => {
     this.props.navigator.push({
       component: Security,
       name: 'Security'
     });
    }

    _getData(){
         this.setState({isRefreshing: true});   //显示刷新中
         //banner数据
         let formData = new FormData();
         formData.append("OPT","106");

         Service.post(formData,(data)=> {
             var bannerArr = [];
             var banners = data.result.banners;
             var errorCode = data.errorCode;
             var errorMsg = data.errorMsg;
             //alert("errorCode:" + errorCode + ",errorMsg:" + errorMsg);
             if(errorCode==0){
                 for (var i in banners) {
                     bannerArr.push({img: {uri: banners[i].imgUrl}, url: banners[i].url, title: banners[i].picturename });
                 }
                 //alert("banners[0]:"+JSON.stringify(bannerArr[0]));

                 this.setState({
                     isRefreshing: false,
                     dataSource: this.state.dataSource.cloneWithPages(bannerArr),
                 });
             }else{
                 alert("Msg：" + errorMsg);
                 this.setState({isRefreshing: true});   //结束刷新中
             }
         },(error)=>{
             alert("Error:"+JSON.stringify(error));
             this.setState({isRefreshing: true});       //结束刷新中
         });

         //首页推荐标的数据
         let formTjData = new FormData();
         formTjData.append("OPT","150");

         Service.post(formTjData,(data)=> {
             var loanData = data.result;
             var errorCode = data.errorCode;
             var errorMsg = data.errorMsg;
             //alert("errorCode:" + errorCode + ",errorMsg:" + errorMsg);
             //alert("loanData[0]:"+JSON.stringify(loanData));
             if(errorCode==0){

                 this.setState({
                     isRefreshing: false,
                     listData: this.state.listData.cloneWithRows(loanData),
                 });
             }else{
                 alert("Msg：" + errorMsg);
                 this.setState({isRefreshing: true});   //结束刷新中
             }
         },(error)=>{
             alert("Error:"+JSON.stringify(error));
             this.setState({isRefreshing: true});       //结束刷新中
         });

         //实时投资记录
         let formTzData = new FormData();
         formTzData.append("OPT","151");

         Service.post(formTzData,(data)=> {
             var tmpList = data.result;
             var errorCode = data.errorCode;
             var errorMsg = data.errorMsg;
             if(errorCode==0){
                 this.setState({
                     isRefreshing: false,
                     tzdtList: tmpList,
                 });
             }else{
                 alert("Msg：" + errorMsg);
                 this.setState({isRefreshing: true});   //结束刷新中
             }
         },(error)=>{
             alert("Error:"+JSON.stringify(error));
             this.setState({isRefreshing: true});       //结束刷新中
         });
      }

     _onRefresh = () => {
       this._getData();
     }

     //生成list
     _renderRow = (data) => {
       return (
          <ProductList data={data} onPress={this._pressRow.bind(this)} rateTimes="100"/>
        );
     }

     //产品点击事件
     _pressRow(id,title){
      let data = global.USER;
      if(data){
        console.log(id+title);
        this.props.navigator.push({
          name: 'finacialDetail',
          component: finacialDetail,
          params:{
            id:id,
            title:title,
          }
        })
      }else{
        Alert.alert(
                '提示信息',
                '您还未登录，请先登录！',
                [
                    {text: '取消' },
                    {text: '确定', onPress: () => this.props.navigator.push({component:Login,name:'Login'})},
                ]
            )
        } 
    }

    //webview打开页面-由banner图打开活动详情页面
    _openUrl = (url_,title_) =>{
        console.log(title_+':'+url_);
        this.props.navigator.push({
            component:ViewHtml,
            name:'openViewHtml',
            params:{
                url:url_,
                title:title_,
            }
        });
    }

    _ViewPager_renderPage = (data, pageID) => {
        return (
            <TouchableOpacity onPress={()=>this._openUrl(data.url,data.title)}>
                <Image
                    source={data.img}
                    style={styles.img}/>
            </TouchableOpacity>
        );
    }
    _investRow = (data) => {
       return (
          <Invest data={data}/>
        );
     }

   render(){
      return(
         <ScrollView style={styles.scrollView}
         refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              tintColor="#ff0000"
              title="刷新中..."
              titleColor="#999"
            />}
           >
            <View>
                <ViewPager
                    style={{height:130}}
                    dataSource={this.state.dataSource}
                    renderPage={this._ViewPager_renderPage}
                    isLoop={true}
                    autoPlay={true}/>
            </View>
            <View style={styles.kind}>
             <TouchableOpacity style={styles.kind_one}
              onPress={this._goToYouBi}>
               <Image
                 style={styles.kind_img}
                 source={require('../../imgs/index/kind_one.png')}/>
               <Text style={styles.kind_text}>邮币中心</Text>
             </TouchableOpacity>
              <TouchableOpacity style={styles.kind_one} onPress={this._goToActivity}>
                <Image
                  style={styles.kind_img}
                  source={require('../../imgs/index/kind_two.png')}/>
                <Text style={styles.kind_text}>活动中心</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.kind_one} onPress={this._goToInvitation}>
                <Image
                  style={styles.kind_img}
                  source={require('../../imgs/index/kind_three.png')}/>
                <Text style={styles.kind_text}>邀请好友</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.kind_one} onPress={this._goToSecurity}>
                <Image
                  style={styles.kind_img}
                  source={require('../../imgs/index/kind_four.png')}/>
                <Text style={styles.kind_text}>安全保障</Text>
              </TouchableOpacity>
           </View>

             <View>
                 <ListView
                     dataSource={this.state.listData}
                     renderRow={this._renderRow}
                     enableEmptySections={true}
                     onPressEvent={this._goToInvitation}
                 />
             </View>

            <View>
                <View style={styles.footLine}>
                   <Image
                      style={styles.footerImg}
                      source={require("../../imgs/index/title.png")}/>
                    <Text style={styles.footerTitle}>
                      汇付天下托管，银行存管对接
                    </Text>
                </View>
                <View style={styles.scroll}>
                  <MarqueeLabelVertical
                    duration={8000}
                    textStyle={{textAlign:'center'}}>
                      {/*
                      <Text style={styles.user} numberOfLines={1}>
                        用户 jerr***5ow
                        投资 油站宝-顺利加油站139期B1
                        :
                        <Text style={styles.money}>1000元</Text>
                      </Text>{'\n'}
                      <Text style={styles.user}>用户 
                        kerr***5ow
                        投资 油站宝-顺利加油站139期B1
                      :
                        <Text style={styles.money}>2000元</Text>
                      </Text>{'\n'}
                      <Text style={styles.user}>用户 
                        lerr***5ow
                        投资 油站宝-顺利加油站139期B1
                      :
                        <Text style={styles.money}>3000元</Text>
                      </Text>{'\n'}
                      */}
                    {
                        _.map(this.state.tzdtList, function(v, _Index, list){ return (
                            <Text style={styles.user}  key={_Index}>用户
                                {v.nickname}
                                投资 {v.loanTitle}
                                :
                                <Text style={styles.money}>{v.tenderMoney}元</Text>{'\n'}
                            </Text>
                        ); })
                    }
                  </MarqueeLabelVertical>
                </View>
            </View>
         </ScrollView>
         );
   }
}
