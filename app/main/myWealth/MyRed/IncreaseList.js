'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Alert,
    ListView,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import {StyleConfig} from '../../../style/index';
import Service from '../../../utils/service'; 
import {toastShort} from '../../../utils/Toast';
const oPx = StyleConfig.oPx;

export default class IncreaseList extends Component {
    constructor(props) {
      super(props);
      let listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
         listData: listData.cloneWithRows([]),
         status:this.props.status,
         isRefreshing:false,
         pageNumber:1,
         totalPageNum:0,
         numPerPage:10,
         isShowBottomRefresh:false,
         isEmpty:false,
      };
    }

    componentDidMount(){
        this._getData();
    }

    _onPress(){
     this.props.navigator();
    }

    _renderRow(data){
        return (
            <View style={styles.one}>
                <View style={styles.top}>
                    <View style={styles.flex}>
                        <Text style={data.usestatus==0&&data.statedesc==1?styles.name:styles.nameOut}>加息券</Text>
                        <Text style={data.usestatus==0&&data.statedesc==1?styles.date:styles.dateOut}>有效期至{data.useendtime}</Text>
                    </View>
                    <View style={styles.flex}>
                        {data.usestatus==0&&data.statedesc==1?
                            <Image source={require('../../../imgs/myWealth/add.png')} style={styles.add}>
                                <Text style={styles.money}>{data.money*100}<Text style={styles.symbol}>%</Text></Text>
                            </Image>:
                            <Image source={require('../../../imgs/myWealth/addOut.png')} style={styles.add}>
                                <Text style={styles.money}>{data.money*100}<Text style={styles.symbol}>%</Text></Text>
                            </Image>
                        }
                    </View>
                    <View style={styles.flex}>
                    {data.usestatus==0&&data.statedesc==1?
                        <TouchableOpacity style={styles.button} onPress={this._onPress.bind(this)}>
                            <Text style={styles.buttonFont}>马上使用</Text>
                        </TouchableOpacity>
                        :null
                    }
                    </View>
                </View>
                <View style={styles.conditionView}>
                    <Text style={styles.condition}>使用条件：满{data.minTendMoney}元</Text>
                    <Text style={styles.condition}>适用标的：≥{data.minTendMonth}月期限标的</Text>
                    <Text style={styles.condition}>来源：{data.memo}</Text>
                </View>
                <Image source={require('../../../imgs/myWealth/redLogo.png')} style={styles.img}/>
                <View style={data.usestatus==0&&data.statedesc==1?styles.bottom:styles.bottomOut}></View>
                {data.usestatus==1?
                    <Image source={require('../../../imgs/myWealth/used.png')} style={styles.used}/>
                    :null}
                {data.statedesc==0?
                    <Image source={require('../../../imgs/myWealth/overdue.png')} style={styles.used}/>
                    :null}
            </View>
        );
    }

    _getData(){
        let increaseData = new FormData();
        increaseData.append("OPT","129"); 
        //redData.append("status",this.state.status);
        increaseData.append("status",this.state.status);
        increaseData.append("pageNumber",this.state.pageNumber);
        increaseData.append("numPerPage",this.state.numPerPage);
        /*Service.post(increaseData,(data)=>{
            this.setState({
                listData: this.state.listData.cloneWithRows(data.result.myredmoney),
            })
        })*/
        Service.post(increaseData,(data)=>{
            let thisData = data.result.myredmoney;          
            var totalPage = parseInt(thisData.length/this.state.numPerPage)+1; 
            if(data.errorCode==0) {
                if(thisData.length == 0){
                    this.setState({
                     isEmpty:true
                   });
                   return;
                }
                this.setState({
                    isRefreshing: false,
                    listData: this.state.listData.cloneWithRows(thisData),
                    isShowBottomRefresh:true,
                    totalPageNum:totalPage,
                });
            } else{
                toastShort(data.errorMsg);
                this.setState({isRefreshing: false});
                }
            },(error)=>{
                this.setState({isRefreshing: false});       //结束刷新
            });     
    }

    render(){
        return(
            <ListView 
             dataSource={this.state.listData}
             renderRow={this._renderRow.bind(this)}
             enableEmptySections = {true}
             renderFooter={this._renderFooter.bind(this)}
             onEndReached={this._end.bind(this)}
             onEndReachedThreshold={30}
             refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this._onRefresh.bind(this)}
                  tintColor="#ff0000"
                  title="刷新中..."
                  titleColor="#999"
                />}
            />
            );
    }
    //底部
    _renderFooter() {
        if(this.state.isEmpty){
           return (
            <View style={styles.moreBottom}>
                   <Text style={{color:'#999'}}>没有符合条件的内容</Text>
           </View>)
         }
         /*if(this.state.isShowBottomRefresh){
             return (<View style={{marginVertical: 10}}>
                     <ActivityIndicator />
             </View>)
         }*/
    }

    _end(){
         if(this.state.isEmpty) return;
         if(this.state.totalPageNum == 1) return;
         if(!this.isShowBottomRefresh)return;
         let index = this.state.pageNumber;
         index++;
         if(index>this.state.totalPageNum){
           toastShort('没有更多了哦',-100);
           this.setState({isShowBottomRefresh:false});
         }else{
           this.setState({pageNumber:index},()=>this._getData());
         }
    }

    _onRefresh(){
        this.setState({pageNumber:1,isRefreshing:true},()=>this._getData());
    }
}

const styles = StyleSheet.create({
    moreBottom:{
        height:80/oPx,
        justifyContent:'center',
        alignItems:'center'
    },
    one:{
        width:690/oPx,
        marginLeft:30/oPx,
        marginRight:30/oPx,
        marginTop:20/oPx,
        backgroundColor:'#fff',
        borderRadius:10/oPx,
    },
    top:{
        width:690/oPx,
        flexDirection:'row',        
    },
    flex:{
        flex:1,
        paddingLeft:20/oPx, 
        paddingTop:10/oPx,
        paddingBottom:10/oPx,
        justifyContent:'center'
    },
    name:{
        fontSize:30/oPx,
        color:'#24aef5',
    },
    date:{
        fontSize:20/oPx,
        color:'#24aef5',
    },
    nameOut:{
        fontSize:30/oPx,
        color:'#b3b3b3',
    },
    dateOut:{
        fontSize:20/oPx,
        color:'#b3b3b3',
    },
    symbol:{
        fontSize:20/oPx,
        color:'#fff',
    },
    money:{
        fontSize:40/oPx,
        color:'#fff',
        marginTop:5/oPx,
    },
    button:{
        width:133/oPx,
        height:43/oPx,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:3/oPx,
        borderWidth:StyleConfig.borderWidth,
        borderColor:'#24aef5',
    },
    buttonFont:{
        fontSize:25/oPx,
        color:'#24aef5',
    },
    conditionView:{
        paddingLeft:20/oPx,
        paddingBottom:20/oPx,
    },
    condition:{
        fontSize:20/oPx,
        color:'#b2b2b2',
    },
    bottom:{
        width:690/oPx,
        height:20/oPx,
        backgroundColor:'#24aef5',
        borderBottomLeftRadius:10/oPx,
        borderBottomRightRadius:10/oPx,
    },
     bottomOut:{
        width:690/oPx,
        height:20/oPx,
        backgroundColor:'#b3b3b3',
        borderBottomLeftRadius:10/oPx,
        borderBottomRightRadius:10/oPx,
    },
    img:{
        position:'absolute',
        bottom:0,
        right:20/oPx,
        width:120/oPx,
        height:120/oPx,
    },
    used:{
        position:'absolute',
        bottom:20/oPx,
        right:20/oPx,
        width:200/oPx,
        height:200/oPx,
    },
    add:{
        width:120/oPx,
        height:120/oPx,
        alignItems:'center',
        justifyContent:'center'
    }
})