import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    Picker,
    Alert,
    ScrollView,
    TouchableOpacity,
    InteractionManager
} from 'react-native';

import {StyleConfig} from '../../../style/index';
import {goBack} from '../../../utils/NavigatorBack';
import TitileBar from '../../../components/TitleBar';
import {Navigator} from 'react-native-deprecated-custom-components';
import WithdrawRecord from './WithdrawRecord';
import WithdrawSuccess from './Withdraw_success';
import {toastShort} from '../../../utils/Toast';
import {ActionUrl} from '../../../utils/ActionUrl';
import Service from '../../../utils/service';
import ViewHtml from '../../../components/ViewHtml';
const oPx = StyleConfig.oPx;

export default class Withdraw extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance:0,      //可用余额
            transType:null, //提现方式
            userBankId:null,
            money:null,
        };
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
       formTjData.append("OPT","120");
       formTjData.append("userId","");

       //alert("pageNumber:"+this.state.pageNumber);
       Service.post(formTjData,(data)=> {
           var userData = data.result;
           var balance=userData.balance;
           var errorCode = data.errorCode;
           var errorMsg = data.errorMsg;

           //alert("loanData[0]:"+JSON.stringify(loanData));
           if(errorCode==0){
               this.setState({
                   balance: balance,
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

    //webview打开页面
    _openUrl = (url_,title_) =>{
        console.log(title_+':'+url_);
        this.props.navigator.push({
            component:ViewHtml,
            name:'openViewHtml',
            params:{
                url:url_,
                title:title_,
                showTitle:false
            }
        });
    }

    //提现
    _toWithdraw = () =>{
        console.log(" -- this.state.transType --> "+this.state.transType);
        //检查数据合法性
        if(this.state.transType==null || this.state.transType==''){
            return (
                toastShort('请选择提现方式！',-300)
            );
        }
        if (this.state.money == null || this.state.money == '') {
            return (
                toastShort('请先输入金额！',-300)
            );
        }
        if(this.state.transType=='T0'){
            Alert.alert(
                '提示信息',
                'T+0提现手续费由用户自行承担，VIP会员免费！',
                [
                    {text: '取消' },
                    {text: '确定', onPress: () => this._toWithdrawUrl() },
                ]
            );
        }else if(this.state.transType=='T1'){
            this._toWithdrawUrl();
        }else{

        }
        
    }

    //进入提现（打开汇付提现页面）
    _toWithdrawUrl = () =>{
        let url=ActionUrl.WITHDRAW_ADDRESS ;//提现地址
        url+="?money="+this.state.money+"&transType="+this.state.transType;
        this._openUrl(url,"提现");
    }

    _goBack() {
        goBack(this.props.navigator);
    }

    //成功返回界面
    _goToWithdrawSuccess = () => {
        this.props.navigator.push({
            component: WithdrawSuccess,
            name: 'WithdrawSuccess'
        });
    }

    //记录
    _gotoRecord = () =>{
        this.props.navigator.push({
            component: WithdrawRecord,
            name: 'WithdrawRecord'
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TitileBar title='提现'  leftBtnFunc={this._goBack.bind(this)}/>
                <TouchableOpacity style={styles.record} onPress={this._gotoRecord}>
                    <Text style={styles.record_txt}>提现记录</Text>
                </TouchableOpacity>
                <View style={styles.top}>
                    <View style={styles.top_item}>
                        <Image style={styles.image} source={require('../../../imgs/myWealth/withdraw_hf.jpg')}/>
                        <Text style={styles.top_font}>您的托管资金</Text>
                    </View>
                    <View style={styles.top_item}>
                        <Image style={styles.image_line} source={require('../../../imgs/myWealth/withdraw_line.jpg')}/>
                        <Text style={styles.top_font}>处理中</Text>
                    </View>
                    <View style={styles.top_item}>
                        <Image style={styles.image} source={require('../../../imgs/myWealth/withdraw_card.jpg')}/>
                        <Text style={styles.top_font}>您的银行卡账户</Text>
                    </View>
                </View>

                <View style={[styles.infos,styles.border_b]}>
                    <Text style={styles.txt_l}>可用余额：</Text>
                    <View style={styles.txt_r}>
                        <Text style={styles.money}>{this.state.balance}</Text>
                        <Text style={styles.font_1}>元</Text>
                    </View>
                </View>
                {/*
                <View style={[styles.infos,styles.border_b]}>
                    <Text style={styles.txt_l}>提现至：</Text>
                    <View style={styles.txt_r}>
                        <Text style={styles.font_1}>农行-9565122545487442545</Text>
                    </View>
                </View>
                */}
                <View style={styles.infos}>
                    <Text style={styles.txt_l}>手续费：</Text>
                    <View style={styles.txt_r}>
                        <Text style={styles.font_1}>0</Text>
                        <Text style={styles.font_2}>(手续费由中仁财富全额垫付)</Text>
                    </View>
                </View>

                <View style={[styles.infos,styles.withdraw_box]}>
                    <Text style={styles.txt_l}>提现方式：</Text>
                    <View style={styles.txt_r}>
                        <Picker style = {[styles.pickerStyle]}
                        selectedValue={this.state.transType}
                        onValueChange={(vv) => this.setState({transType: vv})}>
                            <Picker.Item label="-请选择-" value="" />
                            <Picker.Item label="T+1" value="T1" />
                            <Picker.Item label="T+0" value="T0" />
                        </Picker>
                    </View>
                </View>
                <View style={[styles.infos,styles.border_b]}>
                    <Text style={styles.txt_l}>金额(元)：</Text>
                    <View style={styles.txt_r}>
                        <TextInput
                            style={[styles.font_1,styles.withdraw_money]}
                            placeholder={'输入提现金额'}
                            placeholderTextColor={'#cdcdcd'}
                            underlineColorAndroid={'transparent'}
                            ref="money"
                            onChangeText={(money) => this.setState({money})}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.tips}>到账时间：资金托管平台“汇付天下”将在1-2个工作日之内将钱转至您在网站绑定的银行卡上（具体提现时间以“汇付天下”T+1规则为准）。</Text>
                </View>
                <TouchableOpacity style={styles.withdraw} onPress={this._toWithdraw}>
                    <Text style={styles.btn}>提现</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    record: {
        position: 'absolute',
        right: 10,
        top: 20,
    },
    record_txt: {
        color: '#ffffff',
        fontSize: 28/oPx,
    },
    top: {
        paddingTop: 34/oPx,
        paddingBottom: 34/oPx,
        marginBottom: 20/oPx,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#ffb133',
    },
    top_item: {
        alignItems:'center',
    },
    image: {
        width: 118/oPx,
        height: 118/oPx,
    },
    image_line: {
        width: 260/oPx,
        height: 14/oPx,
    },
    top_font: {
        color: '#ffffff',
        marginTop: 6/oPx,
        fontSize:  28/oPx,
    },
    infos: {
        flexDirection: 'row',
        height: 100/oPx,
        paddingLeft: 20/oPx,
        paddingRight: 20/oPx,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    border_b: {
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },
    txt_l: {
        width: 160/oPx,
        color: '#666666',
        fontSize: 30/oPx,
    },
    txt_r: {
        flex: 1,
        flexDirection: 'row',
    },
    money: {
        color: '#ff981a',
        fontWeight: '600',
        fontSize: 30/oPx,
    },
    font_1: {
        color: '#333333',
        fontSize: 30/oPx,
    },
    font_2: {
        color: '#cdcdcd',
        fontSize: 30/oPx,
        marginLeft: 25/oPx,
    },
    withdraw_box: {
        marginTop: 20/oPx,
    },
    withdraw_money: {
        flex: 1,
        padding: 0,
    },
    tips: {
        color: '#989898',
        fontSize: 26/oPx,
        padding: 20/oPx,
        lineHeight: 24,
    },
    withdraw: {
        margin: 20/oPx,
        height: 80/oPx,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffb133',
        borderRadius: 2,
    },
    btn: {
        color: '#fff',
        fontSize: 36/oPx,
    },
    pickerStyle:{
        marginLeft:80/StyleConfig.oPx,
        marginTop:12/StyleConfig.oPx,
        height:60/StyleConfig.oPx,
        width:StyleConfig.screen_width-280/StyleConfig.oPx,
    },
});
