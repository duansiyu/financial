import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    TouchableOpacity
    } from 'react-native';

import {StyleConfig} from '../../../style/index';
import {goBack} from '../../../utils/NavigatorBack';
import TitileBar from '../../../components/TitleBar';
import {Navigator} from 'react-native-deprecated-custom-components';
import RechargeRecord from './RechargeRecord';
import Financial from '../../financial/financial';
const oPx = StyleConfig.oPx;

export default class RechargeSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _goBack() {
        goBack(this.props.navigator);
    }

    //充值记录
    _gotoRechargeRecord = () =>{
        this.props.navigator.push({
            component: RechargeRecord,
            name: 'RechargeRecord'
        });
    }

    //理财
    _gotoFinancial = () =>{
        this.props.navigator.push({
            component: Financial,
            name: 'Financial'
        });
    }


    render() {
        return (
            <View style={styles.container}>
                <TitileBar title='充值'  leftBtnFunc={this._goBack.bind(this)}/>
                <TouchableOpacity style={styles.record} onPress={this._gotoRechargeRecord}>
                    <Text style={styles.record_txt}>充值记录</Text>
                </TouchableOpacity>
                <View style={styles.main}>
                    <View>
                        <Text style={styles.call}>亲！</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.font_black}>您已</Text>
                        <Text style={styles.font_orange}>成功充值</Text>
                        <Text style={styles.font_red}>2000元</Text>
                        <Text  style={styles.font_black}>，赶紧去</Text>
                    </View>
                    <View style={styles.btns}>
                        <TouchableOpacity style={styles.button} onPress={this._gotoFinancial}>
                            <Text style={styles.btn_txt}>理财</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={this._gotoRechargeRecord}>
                            <Text style={styles.btn_txt}>查询</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.tips}>还有</Text>
                        <Text style={styles.second}>5</Text>
                        <Text style={styles.tips}>秒钟跳转至“我的财富”......</Text>
                    </View>
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
    record: {
        position: 'absolute',
        right: 10,
        top: 20,
    },
    record_txt: {
        color: '#ffffff',
        fontSize: 28/oPx,
    },
    main: {
        marginTop: 60/oPx,
    },
    call: {
        textAlign: 'center',
        color: '#333333',
        fontSize: 36/oPx,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30/oPx,
    },
    font_black: {
        color: '#000000',
        fontSize: 30/oPx,
    },
    font_orange: {
        color: '#ffb133',
        fontSize: 30/oPx,
    },
    font_red: {
        color: '#fc0d1b',
        fontSize: 30/oPx,
    },
    btns: {
        marginTop: 45/oPx,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        width: 160/oPx,
        height: 60/oPx,
        marginRight: 36/oPx,
        marginLeft: 36/oPx,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffb133',
        borderRadius: 4,
        shadowColor: '#ff9d00',
        shadowOffset:{h:4/oPx,w:4/oPx},
        shadowRadius:4,

    },
    btn_txt: {
        color: '#ffffff',
        fontSize: 36/oPx,
    },
    tips: {
        color: '#666666',
        fontSize: 24/oPx,
    },
    second: {
        paddingLeft: 4,
        paddingRight: 4,
        color: '#fc0d1b',
        fontSize: 24/oPx,
    },
});
