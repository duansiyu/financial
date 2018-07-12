import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    TouchableOpacity,
    InteractionManager
} from 'react-native';

import {StyleConfig} from '../../../style/index';
import {goBack} from '../../../utils/NavigatorBack';
import TitileBar from '../../../components/TitleBar';
import {toastShort} from '../../../utils/Toast';
import Service from '../../../utils/service';
import {Navigator} from 'react-native-deprecated-custom-components';
const oPx = StyleConfig.oPx;
const contents=[
    {'money':'100.00', 'status': '待确认', 'time': '7-30 13:36:25'},
    {'money':'300.00', 'status': '充值成功', 'time': '7-28 08:36:12'},
    {'money':'5406.00', 'status': '充值成功', 'time': '7-18 15:36:35'},
    {'money':'954.00', 'status': '待确认', 'time': '7-02 06:36:24'},
    {'money':'6000.00', 'status': '待确认', 'time': '7-19 14:36:02'}
]
export default class WithdrawSuccess extends Component {
    constructor(props) {
        super(props);
        let listData=new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !==r2});
        this.state = {
            oData:[],
            //listData: listData.cloneWithRows(contents),
            listData: listData.cloneWithRows([]),

            isRefreshing:false,
            pageNumber:1,
            totalPageNum:0,
            numPerPage:10,
            isShowBottomRefresh:true
        };
    }

    _goBack() {
        goBack(this.props.navigator);
    }

    componentDidMount(){
        InteractionManager.runAfterInteractions(this._getData(false));
    }

    //获取数据
   _getData(flag){
       this.setState({isRefreshing: true});   //显示刷新中
       console.log("触发加载更多 _getData() --> ");
       //理财列表的数据
       let formTjData = new FormData();
       formTjData.append("OPT","159");

       //分页参数
       formTjData.append("pageNumber",this.state.pageNumber);
       formTjData.append("numPerPage",this.state.numPerPage);
       console.log("pageNumber:"+this.state.pageNumber);
       Service.post(formTjData,(data)=> {
           var thisData = data.result;
           var totalPageNum = null;
           var errorCode = data.errorCode;
           var errorMsg = data.errorMsg;

           let result = [];
           if(flag) {
               result = this.state.oData.concat(thisData);
           }else{
               result = thisData;
           }

           //alert("loanData[0]:"+JSON.stringify(loanData));
           if(errorCode==0){

               this.setState({
                   isRefreshing: false,
                   totalPageNum:totalPageNum,
                   oData:result,
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

   _end(){
     if(this.state.isEmpty) return;
     if(this.state.totalPageNum == 1) return;
     let index = this.state.pageNumber;
     index++;
     this.setState({pageNumber:index},()=>this._getData(true));
    /*
     if(index>this.state.totalPageNum){
       toastShort('没有更多了哦',-100);
       this.setState({isShowBottomRefresh:false});
     }else{
       this.setState({pageNumber:index},()=>this._getData(true));
     }
    */

   }

    //生成list
    _renderRow(rowData){
        return(
            <View style={styles.list}>
                <View>
                    <Text style={styles.title}>充值金额</Text>
                    <Text style={styles.txt}>￥{rowData.rechargeAmount}</Text>
                </View>
                <View>
                    <Text style={styles.title}>状态</Text>
                    <Text style={styles.txt}>{rowData.status}</Text>
                </View>
                <View>
                    <Text style={styles.title}>充值时间</Text>
                    <Text style={styles.txt}>{rowData.time}</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <TitileBar title='充值记录'  leftBtnFunc={this._goBack.bind(this)}/>
                {/*                 
                <View style={styles.top}>
                    <Text style={styles.year}>2016</Text>
                    <Text style={styles.tips}>只显示最近的100条提现数据</Text>
                </View> 
                */}
                <View style={styles.main}>
                    <ListView
                        dataSource={this.state.listData}
                        onEndReached={this._end.bind(this)}
                        renderRow={this._renderRow.bind(this)}
                        onEndReachedThreshold={30}
                        pageSize={this.state.numPerPage}
                        enableEmptySections = {true}
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    top: {
        paddingTop: 23/oPx,
        paddingBottom: 32/oPx,
        alignItems: 'center',
    },
    year: {
        paddingLeft: 10/oPx,
        paddingRight: 10/oPx,
        color: '#666666',
        fontSize: 24/oPx,
        backgroundColor: '#cccccc',
    },
    tips: {
        paddingTop: 16/oPx,
        color: '#b2b2b2',
        fontSize: 24/oPx,
    },
    main: {
        paddingLeft: 30/oPx,
        paddingRight: 30/oPx,
        backgroundColor: '#ffffff',
    },
    list: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 28/oPx,
        paddingBottom: 28/oPx,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },
    title: {
        marginBottom: 14/oPx,
        color: '#999999',
        fontSize: 24/oPx,
    },
    txt: {
        color: '#333333',
        fontSize: 28/oPx,
    },
});
