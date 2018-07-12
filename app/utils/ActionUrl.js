 import {

 } from 'react-native';
 const HOST = 'http://120.76.27.179:8080';            //主机地址
 //const HOST = 'http://192.168.1.226:8080';            //主机地址
 const DEFAULT_ADDRESS = '/appVisitor/appAction';     //默认action-接口地址
 export const ActionUrl = {
   /**
     * 网页地址
     */
    HOST : HOST,
    DEFAULT_OPT_ADDRESS : HOST + DEFAULT_ADDRESS,//接口地址

    PAY_OPEN_ADDRESS : HOST + "/huifu/userregisterM",//开通汇付
    INVEST_ADDRESS : HOST + "/appVisitor/tenderloansign",//投资
    ABOUT_ADDRESS : HOST + "/mobileMoreIntroduc/about?device=app",//关于我们
    CONTACT_ADDRESS : HOST + "/mobileMoreIntroduc/contact?device=app",//联系我们
    PROJECT_DETAIL_ADDRESS : HOST + "/mobileLoan/toLoanDetail",//项目详情
    WIND_CONTROL_ADDRESS : HOST + "/mobileLoan/toLoanDetail_FK",//风控措施
    CARD_ADD_ADDRESS : HOST + "/userBank/toAddUserCard",//添加银行卡
    CARD_DELETE_ADDRESS : HOST + "/userBank/delUserBank",//删除银行卡
    WITHDRAW_ADDRESS : HOST + "/mobileWithdrawal/saveWithdraw",//提现
    RECHARGE_ADDRESS : HOST + "/mobileRecharge/huifuPayment",//充值
    PROTOCOL_ADDRESS : HOST + "/views/Agreement.html",//网站服务协议
    ACTIVATION_ADDRESS : HOST + "/appVisitor/redMoneyActivate",//激活红包
    TRANSFER_ADDRESS : HOST + "/transfer/buyTransfer",//购买债券转让


 }
