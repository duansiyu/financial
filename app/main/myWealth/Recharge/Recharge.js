import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    TouchableOpacity,
    InteractionManager
} from 'react-native';

import {StyleConfig} from '../../../style/index';
import {goBack} from '../../../utils/NavigatorBack';
import TitileBar from '../../../components/TitleBar';
import {Navigator} from 'react-native-deprecated-custom-components';
import RechargeSuccess from './RechargeSuccess';
import RechargeRecord from './RechargeRecord';
import {toastShort} from '../../../utils/Toast';
import {ActionUrl} from '../../../utils/ActionUrl';
import Service from '../../../utils/service';
import ViewHtml from '../../../components/ViewHtml';
const oPx = StyleConfig.oPx;

export default class Recharge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance:0,      //可用余额
            tranAmt:null
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

    _goBack() {
        goBack(this.props.navigator);
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

    //充值
    _toRecharge = () =>{
        if (this.state.tranAmt == null || this.state.tranAmt == '') {
            return (
                toastShort('请先输入金额！',-300)
            );
        }

        //充值跳转前检查

        let url=ActionUrl.RECHARGE_ADDRESS ;//充值地址
        url+="?tranAmt="+this.state.tranAmt;
        this._openUrl(url,"充值");
    }

    //充值记录
    _gotoRechargeRecord = () =>{
        this.props.navigator.push({
            component: RechargeRecord,
            name: 'RechargeRecord'
        });
    }

    //充值成功返回界面
    _goToRechargeSuccess = () => {

        this.props.navigator.push({
            component: RechargeSuccess,
            name: 'RechargeSuccess'
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TitileBar title='充值'  leftBtnFunc={this._goBack.bind(this)}/>
                <TouchableOpacity style={styles.record} onPress={this._gotoRechargeRecord}>
                    <Text style={styles.record_txt}>充值记录</Text>
                </TouchableOpacity>
                <View style={styles.top}>
                    <View style={styles.top_item}>
                        <Image style={styles.image} source={require('../../../imgs/myWealth/withdraw_card.jpg')}/>
                        <Text style={styles.top_font}>银行卡资金</Text>
                    </View>
                    <View style={styles.top_item}>
                        <Image style={styles.image_line} source={require('../../../imgs/myWealth/withdraw_line.jpg')}/>
                        <Text style={styles.top_font}>即时到账</Text>
                    </View>
                    <View style={styles.top_item}>
                        <Image style={styles.image} source={require('../../../imgs/myWealth/withdraw_hf.jpg')}/>
                        <Text style={styles.top_font}>托管账户</Text>
                    </View>
                </View>

                <View style={[styles.infos,styles.border_b]}>
                    <Text style={styles.txt_l}>可用余额：</Text>
                    <View style={styles.txt_r}>
                        <Text style={styles.money}>{this.state.balance}</Text>
                        <Text style={styles.font_1}>元</Text>
                    </View>
                </View>
                <View style={styles.infos}>
                    <Text style={styles.txt_l}>手续费：</Text>
                    <View style={styles.txt_r}>
                        <Text style={styles.font_1}>0</Text>
                        <Text style={styles.font_2}>(手续费由中仁财富全额垫付)</Text>
                    </View>
                </View>
                <View style={[styles.infos,styles.withdraw_box]}>
                    <Text style={styles.txt_l}>金额(元)：</Text>
                    <View style={styles.txt_r}>
                        <TextInput
                            style={[styles.font_1,styles.withdraw_money]}
                            placeholder={'输入充值金额'}
                            placeholderTextColor={'#cdcdcd'}
                            underlineColorAndroid={'transparent'}
                            ref="tranAmt"
                            onChangeText={(tranAmt) => this.setState({tranAmt})}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.withdraw} onPress={this._toRecharge}>
                    <Text style={styles.btn}>充值</Text>
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
    withdraw: {
        marginLeft: 20/oPx,
        marginRight: 20/oPx,
        marginTop: 70/oPx,
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
});
