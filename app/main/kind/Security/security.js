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
 } from 'react-native';

  import {StyleConfig} from '../../../style';
  import TitleBar from '../../../components/TitleBar';
  import {goBack} from '../../../utils/NavigatorBack';
  import {Navigator} from 'react-native-deprecated-custom-components';
  const oPx = StyleConfig.oPx;

  export default class Index extends Component {
   constructor(props) {
     super(props);

     this.state = {};
   }

   //返回
     _goBack(){
         goBack(this.props.navigator);
     }

   render(){
      return(
        <View style={{flex:1}}>
          <TitleBar title="安全保障" leftBtnFunc={this._goBack.bind(this)}/>
        <ScrollView>
            <Image
              style={styles.banner}
              source={require('../../../imgs/index/security/banner.png')}/>
            <View style={styles.title_box}>
              <Text style={styles.title}>
                产业经验带来安全项目
              </Text>
            </View>
            <View style={styles.padding}>
              <View style={styles.row}>
                <View style={styles.point}></View>
                <Text style={styles.title}>依托20余年石油产业经验</Text>
              </View>
              <Text style={styles.font}>中仁财富是深圳中仁资本投资集团旗下的互联网金融服务平台，依靠中仁集团20余年的石油产业耕耘及强大的集团实力，专注于石油供应链金融，为广大中小企业及个人提供安全、高效、透明的投融资平台。</Text>
            </View>
            <View style={styles.padding}>
              <View style={styles.row}>
                <View style={styles.point}></View>
                <Text style={styles.title}>项目来源安全可靠</Text>
              </View>
              <Text style={styles.font}>中仁财富借款项目均为成品油贸易上下游企业的应收应付账款项目，多为中石油、中石化、中海油、中化、中油等原油供应商，风险率极低，回款时间能够得到充分保障。并且，借助中仁集团的行业地位及20多年的石油行业沉淀，通过业务对接以及第三方的市场信息对接，中仁财富对借款企业的资金流、现金流、信息流等能有更全面的掌握，项目安全得到可靠保障。</Text>
            </View>
            <View style={styles.title_box}>
              <Text style={styles.title}>
                双重风控 七道工序
              </Text>
            </View>
            <View style={styles.white}>
              <View style={styles.line}>
                <Image style={styles.img}
                        source={require('../../../imgs/index/security/cicle.png')}>
                  <Text style={styles.line_text}>1</Text>
                </Image>
                  <Text style={styles.line_text}>合作机构对项目进行第一重风控审核</Text>
              </View>
              <View style={styles.line}>
                <Image style={styles.img}
                        source={require('../../../imgs/index/security/cicle.png')}>
                  <Text style={styles.line_text}>2</Text>
                </Image>
                  <Text style={styles.line_text}>中仁财富对项目进行第二重风控审核</Text>
              </View>
              <View style={styles.center}>
                <View style={styles.gray}>
                  <Text style={{ fontSize:28/oPx,color:'#fff'}}>7道工序严格把关</Text>
                </View>
              </View>
              <View>
                <Image
                  style={styles.flow_chart}
                  source={require('../../../imgs/index/security/flow_chart.png')}/>
              </View>
            </View>
            <View style={styles.title_box}>
                <Text style={styles.title}>
                  多重资金安全保障
                </Text>
            </View>
            <View>
              <View style={styles.absolute}>
                    <Image
                      style={styles.repo}
                      source={require('../../../imgs/index/security/icon_repo.png')}/>
              </View>
              <View style={styles.yellow_box}>
                <View style={styles.repo_text}>
                  <Text style={styles.font}>合作机构回购</Text>
                </View>
                <View style={styles.repo_number_text}>
                  <Text style={styles.text}>1、中仁财富与机构提供的项目合作启动后，中仁风控团队将会对整个贷后过程进行监督与管理。</Text>
                </View>
                <View style={styles.repo_number_text}>
                  <Text style={styles.text}>2、当投资人投资的由改合作机构提供的项目到期时合作机构将对投资人的投资进行100%回购。</Text>
                </View>
              </View>
            </View>

            <View>
              <View style={styles.absolute}>
                    <Image
                      style={styles.hosting}
                      source={require('../../../imgs/index/security/icon_hosting.png')}/>
              </View>
              <View style={styles.green_box}>
                <View style={styles.repo_text}>
                  <Text style={styles.font}>第三方资金托管平台</Text>
                </View>
                <View style={styles.repo_number_text}>
                  <Text style={styles.text}>中仁财富从建设开始，与汇付天下进行托管合作，汇付天下的托管账户可以对项目的资金进入与流出进行管理，平台全程不接触任何投资金额，有效杜绝资金池模式，确保投资人资金安全。</Text>
                </View>
              </View>
            </View>

            <View>
              <View style={styles.absolute}>
                    <Image
                      style={styles.invest}
                      source={require('../../../imgs/index/security/icon_invest.png')}/>
              </View>
              <View style={styles.pink_box}>
                <View style={styles.repo_text}>
                  <Text style={styles.font}>中仁资本投资集团回购</Text>
                </View>
                <View style={styles.repo_number_text}>
                  <Text style={styles.text}>当投资人投资的中仁财富线上及线下项目到期时，中仁财富控股股东--中仁资本投资集团将对投资人的投资进行100%回购。</Text>
                </View>
              </View>
            </View>
            <View style={styles.title_box}>
                <Text style={styles.title}>
                  逾期处理方式
                </Text>
            </View>
            <View style={styles.padding}>
              <Text style={styles.font}>1、合作机构对每一笔借款提供连带担保责任，如借款逾期，则优先进行赔付。</Text>
              <Text style={styles.font}>2、如合作结构无法进行赔付，则中仁集团将启动集团回购项目计划，以保障投资人的本息安全。</Text>
              <Text style={styles.font}>3、如若集团回购无法完成，借款合同仍旧有效，中仁财富将协助借款人通过法律程序解决违约问题。</Text>
            </View>
            <View style={styles.white}>
              <Image
                  style={styles.flow_chart}
                  source={require('../../../imgs/index/security/flow_chart2.png')}/>
            </View>
            <View style={styles.title_box}>
                <Text style={styles.title}>
                  三重安全保障
                </Text>
            </View>

            <View style={styles.padding}>
              <View style={styles.row}>
                <View style={styles.point}></View>
                <Text style={styles.title}>银行安全级别</Text>
              </View>
              <Text style={styles.font}>中仁财富IT团队来自数据安全世界500强企业及国内知名P2P网站，在信息安全和数据安全方面有着非常丰富的经验，多层防火墙隔离系统的访问层，应用层和数据层群，有效的入侵防范及容灾备份，确保交易数据安全无虑。</Text>
            </View>
            <View style={styles.padding}>
              <View style={styles.row}>
                <View style={styles.point}></View>
                <Text style={styles.title}>VeriSign SSL数字证书 128 - 256位加密技术</Text>
              </View>
              <Text style={styles.font}>目前，这种加密技术是互联网上保护数据安全的行业标准，让客户在进行会员管理、个人账户管理、充值等涉及敏感信息的操作时，信息被自动加密，然后才被安全地通过互联网发送出去。</Text>
            </View>
            <View style={styles.padding}>
              <View style={styles.row}>
                <View style={styles.point}></View>
                <Text style={styles.title}>隐私安全</Text>
              </View>
              <Text style={styles.font}>中仁财富上所有的隐私信息都经过MD5加密处理，防止任何人包括公司员工获取用户信息。中仁财富在任何情况下都不会出售、出租或以任何其他形式泄露您的信息。您的信息按照《中仁财富投资咨询服务协议》中的规定被严格保护。</Text>
            </View>
        </ScrollView>
      </View>
         );
   }
}

const styles = StyleSheet.create({
   content:{
    width:StyleConfig.screen_width,
   },
   banner:{
    width:750/oPx,
    height:320/oPx,
   },
   title_box:{
    backgroundColor:'#e5e5e5',
    height:70/oPx,
    paddingLeft:24/oPx,
    justifyContent: 'center',
   },
   title:{
    color:'#333',
    fontWeight:'500',
    fontSize:28/oPx,
   },
   padding:{
    paddingLeft:24/oPx,
    paddingRight:24/oPx,
    paddingBottom:24/oPx
   },
   row:{
    flexDirection:'row',
    alignItems: 'center',
    height:70/oPx,
    marginTop:10/oPx
   },
   point:{
    width:12/oPx,
    height:12/oPx,
    backgroundColor:'#ff404c',
    borderRadius:6/oPx,
    marginRight:10/oPx
   },
   font:{
    fontSize:28/oPx,
    color:'#333',
    lineHeight:24,
    fontWeight:'400'
   },

   //双重风控 严格把关
   white:{
    backgroundColor:'#fff',
    paddingLeft:24/oPx,
    paddingRight:24/oPx,
    //paddingTop:24/oPx,
    paddingBottom:24/oPx
   },
   line:{
    marginTop:20/oPx,
    backgroundColor:'#ffb133',
    height:61/oPx,
    width:StyleConfig.screen_width-48/oPx,
    borderTopLeftRadius:30/oPx,
    borderBottomLeftRadius:30/oPx,
    flexDirection:'row',
    alignItems: 'center',
   },
   img:{
    width:61/oPx,
    height:61/oPx,
    justifyContent: 'center',
    alignItems: 'center',
   },
   line_text:{
    fontSize:28/oPx,
    color:'#fff',
    paddingLeft:20/oPx,
   },
   gray:{
    backgroundColor:'#999999',
    height:60/oPx,
    width:300/oPx,
    justifyContent:'center',
    alignItems: 'center',
    borderRadius:30/oPx,
    marginTop:40/oPx,
    marginBottom:18/oPx
   },
   center:{
    width:StyleConfig.screen_width,
    justifyContent:'center',
    alignItems: 'center',
   },
   flow_chart:{
    width:702/oPx,
    height:600/oPx,
    borderRadius:5/oPx,
    marginBottom:30/oPx
   },
   //合作机构回购
   yellow_box:{
    position:'relative',
    backgroundColor:'#f7ae3f',
    borderRadius:10/oPx,
    paddingBottom:50/oPx,
    marginTop:100/oPx,
    marginRight:24/oPx,
    marginLeft:24/oPx
   },
   absolute:{
    justifyContent:'center',
    alignItems: 'center',
    position:'absolute',
    width:StyleConfig.screen_width,
    top:25/oPx,
    left:0,
    zIndex:9,
   },
   repo:{
    width:150/oPx,
    height:150/oPx,
    borderRadius:75/oPx,
    borderWidth:5/oPx,
    borderColor:'#f7ae3f',
   },
   repo_text:{
    marginTop:100/oPx,
    justifyContent:'center',
    alignItems: 'center',
   },
   repo_number_text:{
    flexDirection:'row',
    //alignItems: 'center',
    paddingLeft:20/oPx,
    paddingRight:20/oPx,
    width:StyleConfig.screen_width-48/oPx,
   },
   text:{
    marginTop:10/oPx,
    lineHeight:22,
    marginLeft:10/oPx,
    color:'#fff',
    fontSize:28/oPx,
   },
   //资金托管
   green_box:{
    position:'relative',
    backgroundColor:'#36c1bf',
    borderRadius:10/oPx,
    paddingBottom:50/oPx,
    marginTop:100/oPx,
    marginRight:24/oPx,
    marginLeft:24/oPx
   },
   hosting:{
    width:150/oPx,
    height:150/oPx,
    borderRadius:75/oPx,
    borderWidth:5/oPx,
    borderColor:'#36c1bf',
   },
   //投资集团回购
   pink_box:{
    position:'relative',
    backgroundColor:'#ff7f88',
    borderRadius:10/oPx,
    paddingBottom:50/oPx,
    marginTop:100/oPx,
    marginRight:24/oPx,
    marginLeft:24/oPx,
    marginBottom:60/oPx
   },
   invest:{
    width:150/oPx,
    height:150/oPx,
    borderRadius:75/oPx,
    borderWidth:5/oPx,
    borderColor:'#ff7f88',
   },
});
