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
import NavigationBar from '../../../components/NavigationBar';
import {Navigator} from 'react-native-deprecated-custom-components';
import TitileBar from '../../../components/TitleBar';
import {goBack} from '../../../utils/NavigatorBack';
import TabNavigator from 'react-native-tab-navigator';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import RecordList from './RecordList';
const oPx = StyleConfig.oPx;

export default class CapitalRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _goBack() {
        goBack(this.props.navigator);
    }

    render() {
        return (
            <View style={styles.container}>
                <TitileBar title='资金记录'  leftBtnFunc={this._goBack.bind(this)}/>
                <ScrollableTabView
                    initialPage={0}
                    renderTabBar={() => <ScrollableTabBar tabStyle={styles.tabStyle} style={styles.scrollable} />}
                    tabBarActiveTextColor={'#e5383e'}
                    tabBarInactiveTextColor={'#333'}
                    tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                    tabBarTextStyle={styles.tabBarTextStyle}
                >
                    <RecordList tabLabel="全部" accountTypeId="0" />
                    <RecordList tabLabel="充值" accountTypeId="1" />
                    <RecordList tabLabel="奖励" accountTypeId="2" />
                    <RecordList tabLabel="提现扣费" accountTypeId="3" />
                    <RecordList tabLabel="汇付调账" accountTypeId="4" />
                    <RecordList tabLabel="借出收款相关" accountTypeId="5" />
                    <RecordList tabLabel="借出还款相关" accountTypeId="6" />
                    <RecordList tabLabel="放款相关" accountTypeId="7" />


                </ScrollableTabView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollable: {
        height: 80/oPx,
        borderWidth: 1,
        borderBottomColor: '#e5e5e5',
        backgroundColor: '#fff5e5',
    },
    tabStyle: {
        height: 80/oPx,
        borderWidth: 0,
    },
    tabBarTextStyle: {
        fontSize: 26/oPx,
        fontWeight: '300',
    },
    tabBarUnderlineStyle: {
        height: 0,
    }

});
