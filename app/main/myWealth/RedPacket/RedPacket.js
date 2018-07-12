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
import RedPacketList from './RedPacketList';
const oPx = StyleConfig.oPx;

export default class RedPacket extends Component {
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
                <TitileBar title='我的红包'  leftBtnFunc={this._goBack.bind(this)}/>
                <View style={styles.tab} >
                    <ScrollableTabView
                        initialPage={0}
                        renderTabBar={() => <ScrollableTabBar tabStyle={styles.tabStyle} style={styles.scrollable} />}
                        tabBarActiveTextColor={'#e5383e'}
                        tabBarInactiveTextColor={'#333'}
                        tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                        tabBarTextStyle={styles.tabBarTextStyle}
                        >
                        <RedPacketList tabLabel="现金券" status="0" />
                        <RedPacketList tabLabel="代金券" status="1" />
                        <RedPacketList tabLabel="加息券" status="2" />

                    </ScrollableTabView>
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
    tab: {
        margin: 30/oPx,
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
