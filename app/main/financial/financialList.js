 'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   ListView,
   RefreshControl,
   ActivityIndicator,
   Alert,
   InteractionManager
 } from 'react-native';
 import {styles} from '../../style/main';
 import ProductList from '../../components/product';
 import Service from '../../utils/service';
 import {toastShort} from '../../utils/Toast';
 import {StyleConfig} from '../../style/index';
 import finacialDetail from '../financial/financiaDetail';
 import {Navigator} from 'react-native-deprecated-custom-components';

 const oPx = StyleConfig.oPx;
 export default class FinacialList extends Component {
   constructor(props){
     super(props);
     let listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     this.state = {
       data:[],
       listData: listData.cloneWithRows([]),
       isRefreshing:false,
       pageNumber:1,
       totalPageNum:0,
       numPerPage:10,
       isShowBottomRefresh:true,
       loanSigntypeId:this.props.loanSigntypeId?this.props.loanSigntypeId:''//标的类型
     }
   }

   //获取数据
   _getData(flag){
       this.setState({isRefreshing: true});   //显示刷新中
       console.log("触发加载更多 _getData() --> ");
       //理财列表的数据
       let formTjData = new FormData();
       formTjData.append("OPT","109");
       formTjData.append("loanSigntypeId",this.state.loanSigntypeId);

       //分页参数
       formTjData.append("pageNumber",this.state.pageNumber);
       formTjData.append("numPerPage",this.state.numPerPage);
       //alert("pageNumber:"+this.state.pageNumber);
       Service.post(formTjData,(data)=> {
           var loanData = data.result.financings;
           var totalPageNum = data.result.totalPage;
           var errorCode = data.errorCode;
           var errorMsg = data.errorMsg;

           let result = [];
           if(flag) {
               result = this.state.data.concat(loanData);
           }else{
               result = loanData;
           }

           //alert("loanData[0]:"+JSON.stringify(loanData));
           if(errorCode==0){
            console.log(data);
               if(loanData.length == 0){
                  this.setState({
                   isEmpty:true
                 });
                 return;
               }
               this.setState({
                   isRefreshing: false,
                   totalPageNum:totalPageNum,
                   data:result,
                   listData: this.state.listData.cloneWithRows(result),
               });
           }else{
               alert("Msg：" + errorMsg);
               this.setState({isRefreshing: false});   //结束刷新中
           }
       },(error)=>{
           alert("Error:"+JSON.stringify(error));
           this.setState({isRefreshing: false});       //结束刷新中
       });
   }

   //生成list
     _renderRow(data){
       return (
          <ProductList data={data} onPress={this._onPress.bind(this)}/>
        );
     }

    _onPress(id,title){
     this.props.navigator(id,title);
   }

   componentDidMount(){
    InteractionManager.runAfterInteractions(this._getData(false));
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
       toastShort('没有更多了哦',-100);
       this.setState({isShowBottomRefresh:false});
     }else{
       this.setState({pageNumber:index},()=>this._getData(true));
     }
   }
   _onRefresh(){
     this.setState({pageNumber:1,isRefreshing:true},()=>this._getData(false));
   }

   render(){
     return (
        <ListView
         dataSource={this.state.listData}
         onEndReached={this._end.bind(this)}
         renderRow={this._renderRow.bind(this)}
         onEndReachedThreshold={30}
         pageSize={this.state.numPerPage}
         enableEmptySections = {true}
         renderFooter={this._renderFooter.bind(this)}
        />
     );
   }
 }
