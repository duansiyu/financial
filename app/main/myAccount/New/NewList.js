import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableOpacity
} from 'react-native';

import New from './New';
import Service from '../../../utils/service';
import NewDetail from './NewDetail';
import {StyleConfig} from '../../../style/index';
import {toastShort} from '../../../utils/Toast';
const oPx = StyleConfig.oPx;
import {Navigator} from 'react-native-deprecated-custom-components';
export default class NewList extends Component{

  constructor(props) {
    let listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    super(props);
    this.state = {
      isShowBottomRefresh:true,
      isRefreshing:false,
      pageNumber:1,
      totalPageNum:0,
      numPerPage:10,
      listData: listData.cloneWithRows([]),
      deputysectionId:this.props.deputysectionId,
    };
  }

  componentDidMount(){
    this._getData();
  }

  _getData(flag){
    this.setState({isRefreshing: true});   //显示刷新
    let formData = new FormData();
    formData.append("OPT","116");
    formData.append("deputysectionId",this.props.deputysectionId);
    formData.append("pageNumber",this.state.pageNumber);
    formData.append("numPerPage",this.state.numPerPage);
    Service.post(formData,(data)=> {
        var loanData = data.result.afficheList;
        var errorCode = data.errorCode;
        var errorMsg = data.errorMsg;

        //alert("loanData[0]:"+JSON.stringify(loanData));
        if(errorCode==0){
            if(loanData.length==0){
                this.setState({
                 isEmpty:true
              });
              return;
            };
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

  _onPress(afficheId){
     this.props.navigator(afficheId);
   }

  _renderFooter() {
    if(this.state.isEmpty){
       return (<View style={styles.moreBottom}>
               <Text style={{color:'#999'}}>没有符合条件的内容</Text>
       </View>)
     }
  }
  //生成list
  _renderRow(data){
    return (
      <New data={data} onPress={this._onPress.bind(this)}/>
    )
  }

   _end(){
     if(this.state.isEmpty) return;
     if(this.state.totalPageNum == 1) return;
     let index = this.state.pageNumber;
     index++;
     if(index>this.state.totalPageNum){
       toastShort('没有更多了哦',-100);
       this.setState({isShowBottomRefresh:false});
     }else{
       this.setState({pageNumber:index},()=>this._getData(true));
     }
   }

  render(){
    return(
      <ListView
       renderFooter={this._renderFooter.bind(this)}
       dataSource={this.state.listData}
       renderRow={this._renderRow.bind(this)}
       onEndReached={this._end.bind(this)}
       enableEmptySections = {true}
       onEndReachedThreshold={30}
       style={{marginTop:10/oPx}}/>
    );
  }
}
