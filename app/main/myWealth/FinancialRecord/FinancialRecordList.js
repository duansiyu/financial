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

export default class FinancialRecordList extends Component {
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
            status:this.props.status //状态:	1竞标中，2持有中，3已回款
        };
    }
    
    _goBack() {
        goBack(this.props.navigator);
    }

    componentDidMount(){
        InteractionManager.runAfterInteractions(this._getData(false));
    }

    //更新【总额】及【笔数】
    _updateCallback = (_total, _count, _tabLabel) => {
        this.props.callback(_total, _count, _tabLabel);
    }

    //获取数据
    _getData(flag){
        this.setState({isRefreshing: true});   //显示刷新中
        console.log("触发加载更多 _getData() --> ");
        //理财列表（投标记录）的数据
        let formTjData = new FormData();
        formTjData.append("OPT","125");
        formTjData.append("status",this.state.status);

        //分页参数
        formTjData.append("pageNumber",this.state.pageNumber);
        formTjData.append("numPerPage",this.state.numPerPage);
        console.log("formTjData:"+JSON.stringify(formTjData));
        Service.post(formTjData,(data)=> {
            let thisData = data.result.list;
            let totalPageNum = null;
            let errorCode = data.errorCode;
            let errorMsg = data.errorMsg;
            console.log("thisData:"+JSON.stringify(thisData));
            let count=data.result.count;   //数量
            let total=data.result.total;   //本金+利息
            this._updateCallback(total, count, this.props.tabLabel);

            totalPageNum=count/this.state.numPerPage+1;

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
        let tendTime_Date=rowData.tendTime?rowData.tendTime.substr(0,10):'';
        //console.log("-------------------渲染rowData《:------------------");
        //console.log("rowData:"+JSON.stringify(rowData));
        //console.log("-------------------渲染rowData》:------------------");
        return(
            <View style={styles.list}>
                <View>
                    <Text style={[styles.loanTitle,styles.txt]}>{rowData.loanTitle}</Text>
                </View>
                <View>
                    <Text style={styles.txt}>{rowData.repayingM + rowData.repayedM} </Text>
                    <Text style={styles.title}>实际收益(元)</Text>
                </View>
                <View>
                    <Text style={styles.txt}>{tendTime_Date} </Text>
                    <Text style={styles.title}>交易日</Text>
                </View>
                <View>
                    <Text style={styles.txt}>{rowData.preRepayDate} </Text>
                    <Text style={styles.title}>到期日</Text>
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
    loanTitle: {
        width: 200/oPx,
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
