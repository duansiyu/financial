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
import PaymentList from './PaymentList';
const oPx = StyleConfig.oPx;

export default class FinancialRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _goBack() {
        goBack(this.props.navigator);
    }

    render() {
        return (
            <View style={styles.container}>
                <TitileBar title='回款计划'  leftBtnFunc={this._goBack.bind(this)}/>                
                <ScrollableTabView
                    initialPage={0}
                    renderTabBar={() => <ScrollableTabBar tabStyle={styles.tabStyle} style={styles.scrollable} />}
                    tabBarActiveTextColor={'#fc0d1b'}
                    tabBarInactiveTextColor={'#333333'}
                    tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                    tabBarTextStyle={styles.tabBarTextStyle}
                >
                    
                    <PaymentList tabLabel="全部" monthNum='d'/>
                    <PaymentList tabLabel="未来一月" monthNum='a'/>
                    <PaymentList tabLabel="未来三月" monthNum='b'/>
                    <PaymentList tabLabel="未来六月" monthNum='c'/>
                                      
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