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

export default class RecordList extends Component {
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
            isShowBottomRefresh:false,
            accountTypeId:this.props.accountTypeId //资金记录类型
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
        //资金记录的数据
        let formTjData = new FormData();
        formTjData.append("OPT","123");
        formTjData.append("accountTypeId",this.state.accountTypeId);

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
                    isShowBottomRefresh:true,
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
        if(!this.isShowBottomRefresh)return;
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
        let money=0;
        let income=rowData.income;
        let expenditure=rowData.expenditure;
        if(income > 0 || expenditure == 0){
            /*money="+"+rowData.income;*/
            money=<Text style={[styles.txt,styles.money,styles.add]}>+{rowData.income}</Text>
        }else{
            /*money="-"+rowData.expenditure;*/
            money=<Text style={[styles.txt,styles.money,styles.deduct]}>-{rowData.expenditure}</Text>
        }
        return(
            <View style={styles.list}>
                <View>
                    <Text style={styles.title}>金额</Text>
                    {money}
                </View>
                <View>
                    <Text style={styles.title}>事件</Text>
                    <Text style={styles.txt}>{rowData.typename}</Text>
                </View>
                <View>
                    <Text style={styles.title}>时间</Text>
                    <Text style={styles.txt}>{rowData.date+rowData.time}</Text>
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
        marginTop: 20/oPx,
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
