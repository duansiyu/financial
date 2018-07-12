 'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   ListView,
   RefreshControl,
   Alert,
 } from 'react-native';

 import {StyleConfig} from '../../../style/index';
 import YouBiDetail from '../YouBi/YouBiDetail';
 import Service from '../../../utils/service';
 import {toastShort} from '../../../utils/Toast';
 import {styles} from '../../../style/main';
 const oPx = StyleConfig.oPx;
 export default class YouBiList extends Component {
   constructor(props){
     super(props);
     let listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     this.state = {
       pointUseTypeId:this.props.pointUseTypeId,
       listData: listData.cloneWithRows([]),
       isRefreshing:false,
       pageNumber:1,
       totalPageNum:0,
       numPerPage:10,
       isShowBottomRefresh:true,
     }
   }

	 _renderRow(data){
	   return (
	      <YouBiDetail data={data}/>
	    );
	 }

	 _onRefresh(){
     this.setState({pageNumber:1,isRefreshing:true},()=>this._getData(false));
   }

   _getData(){
   	   let formTjData = new FormData();
       formTjData.append("OPT","124");
       formTjData.append("pointUseTypeId",this.state.pointUseTypeId);

       //分页参数
       formTjData.append("pageNumber",this.state.pageNumber);
       formTjData.append("numPerPage",this.state.numPerPage);
       Service.post(formTjData,(data)=>{
        if(data.errorCode==0){
         	var loanData = data.result.userpointsDetails;
          if(loanData.length == 0){
            this.setState({
             isEmpty:true
           });
           return;
          }
         	this.setState({
         		listData: this.state.listData.cloneWithRows(loanData),
         	})  
        }else{
          toastShort(data.errorMsg,-300)
        }    	 
       })
   }
  
   _renderFooter() {
    if(this.state.isEmpty){
       return (<View style={styles.moreBottom}>
               <Text style={{color:'#999'}}>没有符合条件的内容</Text>
       </View>)
     }
   }

   componentDidMount(){
    this._getData();
   }

   render(){
     return (
        <ListView
         style={{marginTop:10/oPx}}
         dataSource={this.state.listData}
         renderRow={this._renderRow.bind(this)}
         onEndReachedThreshold={30}
         enableEmptySections = {true}
         pageSize={this.state.numPerPage}
         renderFooter={this._renderFooter.bind(this)}
        />
     );
   }
 }