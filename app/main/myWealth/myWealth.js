'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Alert,
    RefreshControl,
    TouchableOpacity
    } from 'react-native';
import {StyleConfig} from '../../style/index';
import Service from '../../utils/service';
import NavigationBar from '../../components/NavigationBar';
import {Navigator} from 'react-native-deprecated-custom-components';
import Login from '../../main/other/login';
import Withdraw from './Withdraw/Withdraw';
import Recharge from './Recharge/Recharge';
import CapitalRecord from './CapitalRecord/CapitalRecord';
import RedPacket from './RedPacket/RedPacket';
import FinancialRecord from './FinancialRecord/FinancialRecord';
import MyRed from './MyRed/MyRed';
import Payment from './Payment/Payment';
const oPx = StyleConfig.oPx;

export default class myWealth extends Component {
    constructor(props) {
        super(props);
        this.state = {
             isRefreshing:false,
        };
    }

    componentDidMount() {
        this._getData();
    }

    _onRefresh(){
        this.setState({isRefreshing:true});
        this._getData();
    }

    
    //获取数据
    _getData() {
        let formTjData = new FormData();
        formTjData.append("OPT", "120");
        Service.post(formTjData, (data)=> {
            console.log(data);
            this.setState({
                userName: data.result.userName,
                phone: data.result.phone,
                isOpenPay: data.result.isOpenPay,//是否开通支付
                isBoundBank: data.result.isBoundBank,//是否绑定银行卡
                bankName: data.result.bankName,//银行卡名
                cardid: data.result.cardid,//银行卡号
                redMoneyRemind: data.result.redMoneyRemind,//红包提醒
                totalAssets: data.result.totalAssets,      //总资产
                balance: data.result.balance,     //余额
                frozenAmtN: data.result.frozenAmtN,  //冻结资金
                totalIncome: data.result.totalIncome, //累计收益
                interestToBe: data.result.interestToBe,//待收收益
            })
        })
    }

    //用户名显示   
    disUserName(userName) {
        let data = global.USER;
        if (!data) {
            userName = '******'
        }
        return userName;
    }

    //总资产显示
    disTotalAssets(totalAssets) {
        let data = global.USER;
        if (!data) {
            totalAssets = '0.00'
        }
        return totalAssets;
    }

    //待收收益
    disInterestToBe(interestToBe) {
        let data = global.USER;
        if (!data) {
            interestToBe = '0.00'
        }
        return interestToBe;
    }

    //累计收益
    disTotalIncome(totalIncome) {
        let data = global.USER;
        if (!data) {
            totalIncome = '0.00'
        }
        return totalIncome;
    }

    //冻结资金
    disFrozenAmtN(frozenAmtN) {
        let data = global.USER;
        if (!data) {
            frozenAmtN = '0.00'
        }
        return frozenAmtN;
    }

    //可用余额
    disBalance(balance) {
        let data = global.USER;
        if (!data) {
            balance = '0.00'
        }
        return balance;
    }

    //提现
    _goToWithdraw = () => {
        let data = global.USER;
        if (data) {
            this.props.navigator.push({
                component: Withdraw,
                name: 'Withdraw'
            });
        } else {
            Alert.alert(
                '提示信息',
                '您还未登录，请先登录！',
                [
                    {text: '取消'},
                    {text: '确定', onPress: () => this.props.navigator.push({component: Login, name: 'Login'})},
                ]
            )
        }
    }

    //充值
    _goToRecharge = () => {
        let data = global.USER;
        if (data) {
            this.props.navigator.push({
                component: Recharge,
                name: 'Recharge'
            });
        } else {
            Alert.alert(
                '提示信息',
                '您还未登录，请先登录！',
                [
                    {text: '取消'},
                    {text: '确定', onPress: () => this.props.navigator.push({component: Login, name: 'Login'})},
                ]
            )
        }
    }

    //资金记录
    _goToCapitalRecord = () =>{
        let data = global.USER;
        if (data) {
            this.props.navigator.push({
                component: CapitalRecord,
                name: 'CapitalRecord'
            });
        } else {
            Alert.alert(
                '提示信息',
                '您还未登录，请先登录！',
                [
                    {text: '取消'},
                    {text: '确定', onPress: () => this.props.navigator.push({component: Login, name: 'Login'})},
                ]
            )
        }
    }

    //理财记录
    _goToFinancialRecord = () =>{
        let data = global.USER;
        if (data) {
            this.props.navigator.push({
                component: FinancialRecord,
                name: 'FinancialRecord'
            });
        } else {
            Alert.alert(
                '提示信息',
                '您还未登录，请先登录！',
                [
                    {text: '取消'},
                    {text: '确定', onPress: () => this.props.navigator.push({component: Login, name: 'Login'})},
                ]
            )
        }
    }


    //我的红包
    _goToRedPacket = () =>{
        let data = global.USER;
        if (data) {
            this.props.navigator.push({
                component: MyRed,
                name: 'MyRed'
            });
        } else {
            Alert.alert(
                '提示信息',
                '您还未登录，请先登录！',
                [
                    {text: '取消'},
                    {text: '确定', onPress: () => this.props.navigator.push({component: Login, name: 'Login'})},
                ]
            )
        }
    }

    //回款计划
    _goToPayment = () =>{
        let data = global.USER;
        if(data) {
            this.props.navigator.push({
                component:Payment,
                name:'Payment',
            })
        } else{
            Alert.alert(
                '提示信息',
                '您还未登录，请先登录！',
                [
                    {text: '取消'},
                    {text: '确定', onPress: () => this.props.navigator.push({component: Login, name: 'Login'})},
                ]
            )
        }
    }


    render() {
        return (
            <View>          
                <NavigationBar title="我的财富"/>
                <ScrollView style={{backgroundColor:'#f5f5f5'}}  
                refreshControl={
                   <RefreshControl
                     refreshing={this.state.isRefreshing}
                     onRefresh={this._onRefresh.bind(this)}
                     tintColor="#ff0000"
                     title="刷新中..."
                     titleColor="#999"
                   />}>
                <View>
                    <Image
                        style={styles.back}
                        source={require('../../imgs/myWealth/back.png')}>
                        <View style={styles.padding}>
                            <View style={{height:97/oPx}}>
                                <Text style={styles.info}>{this.disUserName(this.state.userName)},您的：</Text>
                            </View>
                            <View style={styles.center}>
                                <Text style={styles.info}>总资产(元)</Text>
                                <Text style={styles.center_money}>{this.disTotalAssets(this.state.totalAssets)}</Text>
                            </View>
                        </View>
                        <View style={styles.bottom}>
                            <View style={styles.bottom_box}>
                                <Text style={styles.font}>待收收益(元)</Text>
                                <Text style={styles.money}>{this.disInterestToBe(this.state.interestToBe)}</Text>
                            </View>
                            <View style={styles.bottom_box}>
                                <Text style={styles.font}>累计收益(元)</Text>
                                <Text style={styles.money}>{this.disTotalIncome(this.state.totalIncome)}</Text>
                            </View>
                            <View style={{width:234/oPx,alignItems:'center'}}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.font}>冻结资金(元)</Text>
                                    {/*<Image
                                        style={styles.qustion}
                                        source={require('../../imgs/myWealth/ques.png')}/>*/}
                                </View>
                                <Text style={styles.money}>{this.disFrozenAmtN(this.state.frozenAmtN)}</Text>
                            </View>
                        </View>

                    </Image>
                </View>
                <View style={styles.balance}>
                    <View style={{width:360/oPx}}>
                        <Text style={styles.use_font}>可用余额(元):</Text>
                        <Text style={styles.balance_money}>{this.disBalance(this.state.balance)}</Text>
                    </View>
                    <View style={{width:360/oPx,flexDirection:'row'}}>
                        <TouchableOpacity style={styles.withdrawal} onPress={this._goToWithdraw}>
                            <Text style={styles.withdrawal_text}>提现</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.topUp} onPress={this._goToRecharge}>
                            <Text style={styles.topUp_text}>充值</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginTop:20/oPx}}>
                    <TouchableOpacity style={styles.line} onPress={this._goToCapitalRecord}>
                        <Image source={require('../../imgs/myWealth/icon_zj.png')}
                               style={styles.icon}/>
                        <Text style={styles.line_font}>资金记录</Text>
                        <Image source={require('../../imgs/myWealth/icon_right.png')}
                               style={styles.icon_right}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.line} onPress={this._goToFinancialRecord}>
                        <Image source={require('../../imgs/myWealth/icon_lc.png')}
                               style={styles.icon}/>
                        <Text style={styles.line_font}>理财记录</Text>
                        <Image source={require('../../imgs/myWealth/icon_right.png')}
                               style={styles.icon_right}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.line} onPress={this._goToRedPacket}>
                        <Image source={require('../../imgs/myWealth/icon_hb.png')}
                               style={styles.icon}/>
                        <Text style={styles.line_font}>我的红包</Text>
                        <Image source={require('../../imgs/myWealth/icon_right.png')}
                               style={styles.icon_right}/>
                    </TouchableOpacity>
                    <View style={{marginTop:20/oPx}}>
                        <TouchableOpacity style={styles.line} onPress={this._goToPayment}>
                            <Image source={require('../../imgs/myWealth/icon_hk.png')}
                                   style={styles.icon}/>
                            <Text style={styles.line_font}>回款计划</Text>
                            <Image source={require('../../imgs/myWealth/icon_right.png')}
                                   style={styles.icon_right}/>
                        </TouchableOpacity>
                        {/*<TouchableOpacity style={styles.line}>
                            <Image source={require('../../imgs/myWealth/icon_tb.png')}
                                   style={styles.icon}/>
                            <Text style={styles.line_font}>自动投标</Text>
                            <Image source={require('../../imgs/myWealth/icon_right.png')}
                                   style={styles.icon_right}/>
                        </TouchableOpacity>*/}
                    </View>
                </View>
            </ScrollView>
            </View>

        );
    }
}

export const styles = StyleSheet.create({
    back: {
        width: StyleConfig.screen_width,
        height: 390 / oPx
    },
    padding: {
        marginLeft: 24 / oPx,
        marginRight: 24 / oPx
    },
    info: {
        fontSize: 28 / oPx,
        color: '#fff'
    },
    center: {
        height: 200 / oPx,
        alignItems: 'center'
    },
    center_money: {
        fontSize: 64 / oPx,
        fontWeight: '400',
        color: '#fff'
    },
    bottom: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    bottom_box: {
        width: 234 / oPx,
        borderRightWidth: StyleConfig.borderWidth,
        justifyContent: 'center',
        borderColor: '#fff',
        alignItems: 'center'
    },
    qustion: {
        width: 20 / oPx,
        height: 20 / oPx,
        marginLeft: 2 / oPx
    },
    font: {
        fontSize: 26 / oPx,
        color: '#fff'
    },
    money: {
        fontSize: 36 / oPx,
        color: '#fff',
        fontWeight: '400'
    },
    //余额
    balance: {
        width: StyleConfig.screen_width,
        backgroundColor: '#fff',
        height: 120 / oPx,
        borderColor: StyleConfig.borderColor,
        borderWidth: StyleConfig.borderWidth,
        //justifyContent:'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 24 / oPx,
        paddingRight: 24 / oPx
    },
    use_font: {
        fontSize: 28 / oPx,
        color: '#666'
    },
    balance_money: {
        color: '#ff9919',
        fontSize: 36 / oPx
    },
    topUp: {
        backgroundColor: '#ff404c',
        width: 160 / oPx,
        height: 60 / oPx,
        borderRadius: 10 / oPx,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30 / oPx
    },
    topUp_text: {
        fontSize: 30 / oPx,
        color: '#fff'
    },
    withdrawal: {
        backgroundColor: '#fff',
        width: 160 / oPx,
        height: 60 / oPx,
        borderRadius: 10 / oPx,
        borderWidth: 1 / oPx,
        borderColor: '#0f98df',
        alignItems: 'center',
        justifyContent: 'center',
    },
    withdrawal_text: {
        fontSize: 30 / oPx,
        color: '#0f98df'
    },

    //行
    line: {
        height: 100 / oPx,
        width: StyleConfig.screen_width,
        backgroundColor: '#fff',
        borderBottomColor: StyleConfig.borderColor,
        borderBottomWidth: StyleConfig.borderWidth,
        paddingLeft: 24 / oPx,
        paddingRight: 24 / oPx,
        flexDirection: 'row',
        alignItems: 'center',
    },
    line_font: {
        color: '#333',
        fontSize: 28 / oPx,
        width: 625 / oPx,
        paddingLeft: 10 / oPx
    },
    icon: {
        width: 42 / oPx,
        height: 42 / oPx
    },
    icon_right: {
        width: 22 / oPx,
        height: 22 / oPx,
    },
});