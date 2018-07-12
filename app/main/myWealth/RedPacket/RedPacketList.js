import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    InteractionManager
    } from 'react-native';

import {StyleConfig} from '../../../style/index';
import NavigationBar from '../../../components/NavigationBar';
import {Navigator} from 'react-native-deprecated-custom-components';
import {goBack} from '../../../utils/NavigatorBack';
import Service from '../../../utils/service';
const oPx = StyleConfig.oPx;

export default class RedPacketList extends Component {
    constructor(props) {
        super(props);
        var listData=new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !==r2});
        this.state = {
            oData:[],
            listData: listData.cloneWithRows([]),
            isRefreshing:false,
            pageNumber:1,
            totalPageNum:0,
            numPerPage:10,
            isShowBottomRefresh:true,
            status:this.props.status //券类型

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
        formTjData.append("OPT","129");
        formTjData.append("status",this.state.status);

        //分页参数
        formTjData.append("pageNumber",this.state.pageNumber);
        formTjData.append("numPerPage",this.state.numPerPage);
        console.log("pageNumber:"+this.state.pageNumber);
        Service.post(formTjData,(data)=> {
            var thisData = data.result.myredmoney;
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

    _renderRow(rowData){

        return(
            <View style={styles.box}>
                <View style={styles.top}>
                    <View>
                        <Text>{rowData.redmoneytype}</Text>
                        <Text>有效期：{rowData.useendtime}</Text>
                    </View>
                    <View>
                        <Text>￥</Text>
                        <Text>{rowData.money}</Text>
                    </View>
                </View>
                <View>
                    <Text>使用条件：满{rowData.minTendMoney}元</Text>
                    <Text>适用标的：≥{rowData.minTendMonth}月期限标的</Text>
                    <Text>来源：{rowData.memo}</Text>
                </View>

            </View>
        )
    }


    render() {
        return (
            <View style={styles.container}>
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
    main: {
        paddingLeft: 30/oPx,
        paddingRight: 30/oPx,

    },
    box: {
        padding: 20/oPx,
        backgroundColor: '#ffffff',
        borderBottomWidth: 30/oPx,
        borderBottomColor: '#ff9e00',
        borderRadius: 4,
    },
    top: {
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
    money: {
        width: 170/oPx,
    },
    txt: {
        color: '#333333',
        fontSize: 28/oPx,
    },
    add: {
        color: '#fc0d1b',
    },
    deduct: {
        color: '#0f98df',
    },

});
