'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    RefreshControl,
    InteractionManager,
    ActivityIndicator
} from 'react-native';
import {StyleConfig} from '../../style/index';
import {styles} from '../../style/main';
import ZQZRProduct from '../../components/ZQZRProduct';
import Loading from '../../components/Loading';
import Service from '../../utils/service';
import {toastShort} from '../../utils/Toast';

let oPx = StyleConfig.oPx;
export default class ZQZRPage extends Component {
  constructor(props) {
    super(props);
    let listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
          isRefreshing:false,
          listData: listData.cloneWithRows([]),
          pageNumber:1,
          totalPageNum:0,
          numPerPage:10,
          isShowBottomRefresh:true,
      };
    }

  componentDidMount(){
	InteractionManager.runAfterInteractions(this._getData());
	}

  _getData(){
       this.setState({isRefreshing: true});   //显示刷新中

       //理财列表的数据
       let formTjData = new FormData();
       formTjData.append("OPT","153");
       //分页参数
       formTjData.append("pageNumber","");
       formTjData.append("numPerPage","");

       Service.post(formTjData,(data)=> {
           var loanData = data.result;
           var errorCode = data.errorCode;
           var errorMsg = data.errorMsg;
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
               this.setState({isRefreshing: true});   //结束刷新中
           }
       },(error)=>{
           this.setState({isRefreshing: true});       //结束刷新中
       });
  }

  _renderFooter() {
     if(this.state.isEmpty){
       return (<View style={styles.moreBottom}>
               <Text style={{color:'#999'}}>没有符合条件的内容</Text>
       </View>)
     }
     if(this.state.isShowBottomRefresh){
         return (<View style={{marginVertical: 10}}>
                 <ActivityIndicator />
         </View>)
     }
  }

  _end(){
       if(this.state.isEmpty) return;
       if(this.state.totalPageNum == 1) return;
       let index = this.state.pageNumber;
       index++;
       if(index>this.state.totalPageNum){
         toastShort('没有更多了哦',-300);
         this.setState({isShowBottomRefresh:false});
       }else{
         this.setState({pageNumber:index},()=>this._getData());
       }
  }

  _onRefresh(){
     this.setState({pageNumber:1,isRefreshing:true},()=>this._getData());
  }

       //生成list
  _renderRow = (data) => {
     return (
	       <ZQZRProduct data={data} onPress={this._onPress.bind(this)}/>
     );
  }

  _onPress(id,title){
    this.props.navigator(id,title);
  }

  _onRefresh(){
     this.setState({pageNumber:1,isRefreshing:true},()=>this._getData(false));
   }
  render(){
  	return(
  		<ListView
          dataSource={this.state.listData}
          renderRow={this._renderRow}
          onEndReached={this._end.bind(this)}
          onEndReachedThreshold={30}
          enableEmptySections = {true}
          pageSize={this.state.numPerPage}
          renderFooter={this._renderFooter.bind(this)}
      />
  	);
  }
}
