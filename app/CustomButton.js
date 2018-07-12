import React,{ Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, 
  TouchableHighlight 
} from 'react-native';
import {NativeModules} from 'react-native';
var EncryptionModule = NativeModules.EncryptionModule;

//待加密
const password = '123456';
const key = 'wIEuw3kAGwVNl7BW';

class CustomButton extends Component{
  render(){
    return(
      <TouchableHighlight onPress={this.props.onPress}>
        <Text>
          {this.props.text}
        </Text>
      </TouchableHighlight>
      )
  }
}

export default class react_native_encryption_library extends Component{
  constructor(props) {
    super(props);  
    this.state = {
      result:'',
      AES_Result:'',
    };
  }


  async _MD5ByPromise(){
     try{
        var result = await EncryptionModule.MD5ByPromise(password);
        this.setState({result:'Promise:'+result});
     }catch(e){
        this.setState({result:'MD5加密失败-通过Promise回调'}); 
     }
  }

  async _AESEncryptByPromise(){
    try{
        var result=await EncryptionModule.AESEncryptByPromise(password,key);
        this.setState({AES_Result:result});
    }catch(e){
        this.setState({result:'AES加密失败-通过Promise回调'}); 
    }
 }
  render(){
    return(
      <View>
        <Text>
          结果：{this.state.result}
        </Text>
        <CustomButton
           text="测试MD5加密封装-CallBack回调"
           onPress={()=>EncryptionModule.MD5ByCallBack(password,(msg)=>{
               this.setState({result:'CallBack:'+msg});
          },(error)=>{
               this.setState({result:'MD5加密失败-通过Callback回调'});   
          })}
        />
        <CustomButton
           text="测试MD5加密封装-Promise回调"
           onPress={()=>this._MD5ByPromise()}
        />

        <Text>
           AES结果:{this.state.AES_Result}
        </Text>

        <CustomButton
          text="测试AES加密封装-CallBack回调"
          onPress={()=>EncryptionModule.AESEncryptByCallBack(password,key,(msg)=>{
            this.setState({AES_Result:msg});
          },(error)=>{
              this.setState({AES_Result:'AES加密失败-通过Callback回调'})
          })}
        />
        <CustomButton
           text="测试AES解密封装-CallBack回调"
           onPress={()=>EncryptionModule.AESDecryptByCallBack(this.state.AES_Result,key,(msg)=>{
               this.setState({AES_Result:msg});
          },(error)=>{
               this.setState({AES_Result:'AES解密失败-通过Callback回调'});   
          })}
        />
        <CustomButton
           text="测试AES加密封装-Promise回调" 
           onPress={()=>this._AESEncryptByPromise()}
        />
      </View>
      );    
  }
}