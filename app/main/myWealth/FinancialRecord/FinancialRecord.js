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
import FinancialRecordList from './FinancialRecordList';
const oPx = StyleConfig.oPx;

export default class FinancialRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total:null,
            count:null,
            tabLabel:null,
        };
    }

    _goBack() {
        goBack(this.props.navigator);
    }

    //用于子组件回调，更新数据
    _callback = (_total, _count, _tabLabel) => {
        this.setState({
            total: _total,
            count: _count,
            tabLabel: _tabLabel,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TitileBar title='理财记录'  leftBtnFunc={this._goBack.bind(this)}/>
                <View style={styles.info}>
                    <View>
                        <Text style={styles.txt}>{this.state.tabLabel}项目总值（本金+利息）</Text>
                        <Text style={styles.num}>{this.state.total}</Text>
                    </View>
                    <View>
                        <Text style={styles.txt}>笔数（笔）</Text>
                        <Text style={styles.num}>{this.state.count}</Text>
                    </View>
                </View>

                
                <ScrollableTabView
                    initialPage={0}
                    renderTabBar={() => <ScrollableTabBar tabStyle={styles.tabStyle} style={styles.scrollable} />}
                    tabBarActiveTextColor={'#fc0d1b'}
                    tabBarInactiveTextColor={'#333333'}
                    tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                    tabBarTextStyle={styles.tabBarTextStyle}
                >
                    {/*
                    <Text>投标中</Text>
                    <Text>持有中</Text>
                    <Text>已还款</Text>
                    */}
                    <FinancialRecordList tabLabel="投标中" status="1" callback={this._callback}/>
                    <FinancialRecordList tabLabel="持有中" status="2" callback={this._callback}/>
                    <FinancialRecordList tabLabel="已还款" status="3" callback={this._callback}/>

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
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20/oPx,
        marginBottom: 20/oPx,
        backgroundColor: '#fff5e5',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },
    txt: {
        fontSize: 24/oPx,
        color: '#666666',
    },
    num: {
        fontSize: 36/oPx,
        color: '#333333',
    },
    tab: {
        height: 80/oPx,
    },
    scrollable: {
        height: 80/oPx,
        borderWidth: 1,
        borderBottomColor: '#e5e5e5',
        backgroundColor: '#ffffff',
    },
    tabStyle: {
        height: 80/oPx,
        borderWidth: 0,
    },
    tabBarTextStyle: {
        fontSize: 28/oPx,
        fontWeight: '300',
    },
    tabBarUnderlineStyle: {
        height: 0,
    }

});
