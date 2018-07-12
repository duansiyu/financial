'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
   ScrollView,
   TextInput,
   Modal,
   ListView,
   TouchableOpacity
 } from 'react-native';
 import {StyleConfig} from '../../style/index';
 import NavigationBar from '../../components/NavigationBar';
 import {goBack} from '../../utils/NavigatorBack';
 import TitleBar from '../../components/TitleBar';
 import Service from '../../utils/service';
 import {toastShort} from '../../utils/Toast';
 import {Navigator} from 'react-native-deprecated-custom-components';

 const oPx = StyleConfig.oPx;

 export default class PersonalData extends Component {
   constructor(props) {
     let listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     let cityData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     super(props);
     this.state = {
      listData: listData.cloneWithRows([]),
      cityData: cityData.cloneWithRows([]),
      show:false, 
      display:false,
      provinceId:'',
      cityId:'',
     };
   }


  // 显示/隐藏 省份
  _setModalVisible() {  
    let isShow = this.state.show;  
    this.setState({  
      show:!isShow,  
    });  
  }

   // 显示/隐藏 城市
  _setCityVisible() {  
    let isDisplay = this.state.display;  
    this.setState({  
      display:!isDisplay,  
    });  
  } 

  _goBack(){
    goBack(this.props.navigator);
  }

  componentDidMount(){
    this._getData();
  }

  //省份
  _provinceRow(data){
       return (
         <Province data={data} onPress={this._onPress.bind(this)}/>
        );
  }

  //城市
  _cityRow(data){
       return (
         <City data={data} onPress={this._cityPress.bind(this)}/>
        );
  }

  //省份
  _onPress(province_id,province_name){
    console.log(province_id);
    console.log(province_name);
    this._setModalVisible();
    this.setState({
      provinceName:province_name,
      provinceId:province_id,
      cityName:"选择"
    })
  }

  //城市
  _cityPress(city_id,city_name){
    console.log(city_id);
    console.log(city_name);
    this._setCityVisible();
    this.setState({
      cityName:city_name,
      cityId:city_id,
    })
    this._getCity();
  }


  _getCity(){
     let cityData = new FormData();
     cityData.append("OPT","156");
     cityData.append("provinceId",this.state.provinceId);
     if(this.state.provinceId==''){
       return toastShort("请先选择城市",-300);
     }
     else{
     Service.post(cityData,(data)=> {
      this.setState({
         cityData: this.state.cityData.cloneWithRows(data.result.city),
      })
    })
   }
  }

  _getData(){
    let infoData = new FormData();
    infoData.append("OPT","156");
    Service.post(infoData,(data)=> {
      this.setState({
        listData: this.state.listData.cloneWithRows(data.result.province),
        userName:data.result.userName,  //用户名
        realName:data.result.realName,  //真实姓名
        cardId:data.result.cardId,     //身份证号
        phone:data.result.phone,      // 手机号码
        email:data.result.email,      //邮箱地址
        provinceId:data.result.provinceId,  // 省份 
        provinceName:data.result.provinceName,
        city:data.result.city,       // 城市
        cityName:data.result.cityName,
        newAddress:data.result.newAddress, // 详细地址
      });
    })
  }

  //保存信息
  save(){
    let infoData = new FormData();
    infoData.append("OPT","157");
    infoData.append("provinceId",this.state.provinceId);
    infoData.append("cityId",this.state.cityId);
    infoData.append("newAddress",this.state.newAddress);
    infoData.append("email",this.state.email);
    console.log(this.state.provinceId);
    Service.post(infoData,(data)=> {
         toastShort(data.errorMsg,-300);
         console.log(data);
    })
  }

   render(){
     return(
       <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
          <TitleBar title='个人信息' leftBtnFunc={this._goBack.bind(this)}/>
          <ScrollView>
            <View style={styles.top_back}>
              <TouchableOpacity>
                <Image
                  source={require('../../imgs/myAccount/head.png')}
                  style={styles.head}>
                <Image
                  source={require('../../imgs/myAccount/camera.png')}
                  style={styles.camera}/>
                </Image>
              </TouchableOpacity>
            </View>
            <View style={styles.list}>
              <View style={styles.line}>
                <View style={styles.left}>
                  <Text style={styles.left_text}>用户名</Text>
                </View>
                <View style={styles.right}>
                  <TextInput style={styles.input} underlineColorAndroid='transparent' 
                   editable = {false}>
                  {this.state.userName==null||this.state.userName==''?
                   this.state.phone:this.state.userName}
                  </TextInput>
                </View>
              </View>
              <View style={styles.line}>
                <View style={styles.left}>
                  <Text style={styles.left_text}>真实姓名</Text>
                </View>
                <View style={styles.right}>
                    <TextInput style={styles.input} editable = {false}
                      underlineColorAndroid='transparent'>{this.state.realName}
                    </TextInput>
                </View>
              </View>
              <View style={styles.line}>
                <View style={styles.left}>
                  <Text style={styles.left_text}>身份证件</Text>
                </View>
                <View style={styles.right}>               
                    <TextInput style={styles.input} editable = {false}
                    underlineColorAndroid='transparent'>{this.state.cardId}</TextInput>                    
                </View>
              </View>
              <View style={styles.line}>
                <View style={styles.left}>
                  <Text style={styles.left_text}>手机号码</Text>
                </View>
                <View style={styles.right}>
                  <TextInput  
                   style={styles.input} 
                   underlineColorAndroid='transparent' 
                   editable = {false}>
                    {this.state.phone}
                  </TextInput>
                </View>
              </View>
              <View style={styles.line}>
                <View style={styles.left}>
                  <Text style={styles.left_text}>邮箱地址</Text>
                </View>
                <View style={styles.right}>
                {this.state.email==null||this.state.email==''?
                  <TextInput style={styles.input}
                    underlineColorAndroid='transparent'
                    placeholder='请输入邮箱地址'
                    ref="email"
                    onChangeText={(email) => this.setState({email})}
                    />:
                    <TextInput style={styles.input}
                    underlineColorAndroid='transparent'
                     ref="emailAddress"
                    onChangeText={(email) => this.setState({email})}>
                      {this.state.email}
                    </TextInput>
                }
                </View>
              </View>
              <View style={styles.line}>
                <View style={styles.left}>
                  <Text style={styles.left_text}>所在省份</Text>
                </View>
                {this.state.provinceName==null||this.state.provinceName==''?
                  <TouchableOpacity style={styles.right} onPress={this._onPress.bind(this)}>
                      <TextInput style={styles.input} 
                        underlineColorAndroid='transparent'
                        editable = {false}
                        placeholder='选择'
                        ref="provinceId"
                        onChangeText={(provinceId) => this.setState({provinceId})}>
                      </TextInput>
                  </TouchableOpacity>:
                  <TouchableOpacity style={styles.right} onPress={this._onPress.bind(this)}>
                      <TextInput  style={styles.input} 
                        underlineColorAndroid='transparent'
                        editable = {false}  
                        ref="provinceId"
                        onChangeText={(provinceId) => this.setState({provinceId})}>
                        {this.state.provinceName}
                      </TextInput>
                  </TouchableOpacity>
                }
              </View>
              <View style={styles.line}>
                  <View style={styles.left}>
                    <Text style={styles.left_text}>所在城市</Text>
                  </View>
                  {this.state.cityName==null||this.state.cityName==''?
                  <TouchableOpacity style={styles.right} onPress={this._cityPress.bind(this)}>
                    <TextInput 
                      underlineColorAndroid='transparent'
                      editable = {false}
                      style={styles.input} 
                      placeholder='选择' ref="cityId"
                      onChangeText={(cityId) => this.setState({cityId})}>
                    </TextInput>
                  </TouchableOpacity>:
                  <TouchableOpacity style={styles.right} onPress={this._cityPress.bind(this)}>
                    <TextInput  style={styles.input} 
                      underlineColorAndroid='transparent'
                      editable = {false} 
                      ref="cityId"
                      onChangeText={(cityId) => this.setState({cityId})}>
                      {this.state.cityName}
                    </TextInput>
                  </TouchableOpacity>
                }
              </View>
              <View style={styles.line}>
                <View style={styles.left}>
                  <Text style={styles.left_text}>详细地址</Text>
                </View>
                <View style={styles.right}>
                {this.state.newAddress==null||this.state.newAddress==''?
                  <TextInput 
                   style={styles.input}
                   underlineColorAndroid='transparent'
                   placeholder='填写后有助于给您邮寄实物奖品'
                   ref="newAddress"
                   onChangeText={(newAddress) => this.setState({newAddress})}
                   />:
                   <TextInput 
                    style={styles.input} 
                    underlineColorAndroid='transparent'
                    ref="newAddress"
                    onChangeText={(newAddress) => this.setState({newAddress})}>
                        {this.state.newAddress}
                   </TextInput>
                }
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={this.save.bind(this)}>
              <Text style={styles.button_text}>保存</Text>
            </TouchableOpacity>
            <Modal  
               animationType={'none'}  
               transparent={true}  
               visible={this.state.show}  
               onShow={() => {}}  
               onRequestClose={() => {}} >
                <View style={styles.modalStyle}>  
                 <View style={styles.subView}>    
                   <ListView
                     dataSource={this.state.listData}                   
                     renderRow={this._provinceRow.bind(this)}
                    />                  
                 </View>  
               </View>  
            </Modal>
            <Modal  
               animationType={'none'}  
               transparent={true}  
               visible={this.state.display}  
               onShow={() => {}}  
               onRequestClose={() => {}} >
                <View style={styles.modalStyle}>  
                 <View style={styles.cityView}>    
                   <ListView
                     dataSource={this.state.cityData}                   
                     renderRow={this._cityRow.bind(this)}
                    />                  
                 </View>  
               </View>  
            </Modal>
          </ScrollView>          
       </View>
     );
   }
 }

class Province extends Component{
  constructor(props){
    super(props);
    this.state={};
  }
  render(){
    let data = this.props.data;
    let onPress= this.props.onPress;
    return(
        <TouchableOpacity onPress={()=>onPress(data.province_id,data.province_name)}>
            <Text style={styles.contentText}>  
              {data.province_name}  
            </Text>        
         </TouchableOpacity>
     );
  }
}

class City extends Component{
  constructor(props){
    super(props);
    this.state={};
  }
  render(){
    let data = this.props.data;
    let onPress= this.props.onPress;
    return(
        <TouchableOpacity onPress={()=>onPress(data.city_id,data.city_name)}>
            <Text style={styles.contentText}>  
              {data.city_name}  
            </Text>        
         </TouchableOpacity>
     );
  }
}

const styles = StyleSheet.create({
  top_back:{
    width:750/oPx,
    height:220/oPx,
    backgroundColor:'#ffb133',
    justifyContent:'center',
    alignItems:'center',
  },
  head:{
    width:140/oPx,
    height:140/oPx,
    borderRadius:70/oPx,
  },
  camera:{
    width:54/oPx,
    height:40/oPx,
    position:'absolute',
    bottom:0,
    right:-8/oPx,
  },
  list:{
    paddingLeft:24/oPx,
    paddingRight:24/oPx,
    backgroundColor:'#fff',
  },
  line:{
    width:StyleConfig.screen_width-48/oPx,
    height:80/oPx,
    flexDirection:'row',
    borderBottomWidth:StyleConfig.borderWidth,
    borderColor:'#f5f5f5',
    alignItems:'center',
  },
  left:{
    flex:1,
    alignItems:'center',
  },
  right:{
    flex:4,
    alignItems:'center',
    paddingLeft:50/oPx,
  },
  left_text:{
    fontSize:28/oPx,
    color:'#999',
  },
  input:{
    width:460/oPx,
    justifyContent:'flex-end',
    color:'#666',
    fontSize:28/oPx,
    textAlign:'right',
    height:80/oPx,
    alignItems:'center',
  },
  right_text:{
    width:460/oPx,
    justifyContent:'flex-end',
    color:'#666',
    fontSize:28/oPx,
    textAlign:'right',
    marginRight:30/oPx,
  },
  button:{
    marginTop:60/oPx,
    marginLeft:30/oPx,
    marginRight:30/oPx,
    backgroundColor:'#f4313f',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:8/oPx,
    height:80/oPx,
  },
  button_text:{
    fontSize:36/oPx,
    color:'#fff',
  },
  modalStyle: {  
    backgroundColor:'rgba(0,0,0,0.5)',  
    alignItems: 'center',  
    justifyContent:'center',  
    flex:1,  
  },  
  // modal上子View的样式  
  subView:{  
    marginLeft:60,  
    marginRight:60,
    height:800/oPx,  
    backgroundColor:'#fff',  
    alignSelf: 'stretch',  
    justifyContent:'center',  
    borderRadius: 10,  
    borderWidth: 0.5,  
    borderColor:'#ccc',  
  },  
  cityView:{  
    marginLeft:60,  
    marginRight:60,  
    backgroundColor:'#fff',  
    alignSelf: 'stretch',  
    justifyContent:'center',  
    borderRadius: 10,  
    borderWidth: 0.5,  
    borderColor:'#ccc',  
  },
  contentText:{  
    margin:8/oPx,  
    fontSize:28/oPx,  
    textAlign:'center',  
  },
})
