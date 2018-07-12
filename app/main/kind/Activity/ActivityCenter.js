'use strick';

import React,{Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	ListView,
	RefreshControl,
	ActivityIndicator
} from 'react-native';
import {StyleConfig} from '../../../style/index';
import {styles} from '../../../style/main';
const oPx = StyleConfig.oPx;
import Activity from '../Activity/Activity';
import Loading from '../../../components/Loading';
import Service from '../../../utils/service';
import Index from '../../index/index';
import {toastShort} from '../../../utils/Toast';
import TitleBar from '../../../components/TitleBar';
import {goBack} from '../../../utils/NavigatorBack';
import {Navigator} from 'react-native-deprecated-custom-components';

export default class ActivityCenter extends Component{
  constructor(props){
		super(props);
 	  let listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
 	  this.state = {
          isRefreshing:false,
          listData: listData.cloneWithRows([])
	  };
  }

	componentDidMount(){
		this._getData();
	}
     _getData(){
         this.setState({isRefreshing: true});   //显示刷新中

         //理财列表的数据
         let formTjData = new FormData();
         formTjData.append("OPT","161");
         //分页参数
         //formTjData.append("pageNumber","");
         //formTjData.append("numPerPage","");

         Service.post(formTjData,(data)=> {
             var loanData = data.result;
             var errorCode = data.errorCode;
             var errorMsg = data.errorMsg;

             //alert("loanData[0]:"+JSON.stringify(loanData));
             if(errorCode==0){

                 this.setState({
                     isRefreshing: false,
                     listData: this.state.listData.cloneWithRows(loanData),
                 });
             }else{
                 //alert("Msg：" + errorMsg);
                 this.setState({isRefreshing: true});   //结束刷新中
             }
         },(error)=>{
             //alert("Error:"+JSON.stringify(error));
             this.setState({isRefreshing: true});       //结束刷新中
         });

     }
	 //返回
	 	_goBack(){
	 			goBack(this.props.navigator);
	 	}

		_renderRow(data){
			return(
				<Activity data={data} {...this.props}/>
				);
		}

  returnElm(){
     return(
		 <View style={{backgroundColor:'#f5f5f5'}}>
			 <TitleBar title='活动中心' leftBtnFunc={this._goBack.bind(this)}/>
			 <ListView dataSource={this.state.listData}
         renderRow={this._renderRow.bind(this)}
         enableEmptySections = {true}
         />
		</View>);
  }
  render(){
   return(this.returnElm());
  }
}
