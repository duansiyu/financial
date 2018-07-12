import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ViewPagerAndroid,
    Image,
    Dimensions,
    ToastAndroid,
}from 'react-native';
import {StyleConfig} from '../../style';
import AppMain from '../../main/appMain';
import {Navigator} from 'react-native-deprecated-custom-components';
const oPx = StyleConfig.oPx;
const Height = Dimensions.get('window').height;

export default class WelcomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
        }
    }
    //监听页面变化
    onPageSelected=function(e) {
        //默认从0开始，0是第一页
        this.setState({page: e.nativeEvent.position});
    }

     componentDidMount() {
        setTimeout( () => {
            this.props.navigator.push({
                name:'AppMain',
                component:AppMain
            })
        },1000);
    }

    render() {
        let page = this.state.page;
        return (
            <View style={styles.bg}>
                <ViewPagerAndroid
                    /*左右翻页组件*/
                    style={styles.container}
                    //绑定事件，引用时要在函数末尾加bind(this)
                    onPageSelected={this.onPageSelected.bind(this)}
                    //初始化页面为第一个页面，从0开始
                    initialpage={0}>
                    <View style={styles.container}>
                        <Image source={require('../../imgs/icon/welcome.jpg')} style={styles.image} resizeMode="stretch"/>                       
                    </View>
                   {/* <View style={styles.container}>
                        <Image source={require('../../imgs/icon/welcome.jpg')} style={styles.image}/>                      
                    </View>
                    <View style={styles.container}>
                        <Image source={require('../../imgs/icon/welcome.jpg')} style={styles.image}/>                       
                    </View>
                    <View style={styles.container}>
                        <Image source={require('../../imgs/icon/welcome.jpg')} style={styles.image}/>                        
                    </View>*/}
                </ViewPagerAndroid>
                <View
                    /*模拟页面选中*/
                    style={styles.slider}>
                    {/*<View style={styles.ol}>
                        <View style={page==0?styles.currt:styles.li}/>
                        <View style={page==1?styles.currt:styles.li}/>
                        <View style={page==2?styles.currt:styles.li}/>
                        <View style={page==3?styles.currt:styles.li}/>
                    </View>*/}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor:'#fff',
    },
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    image: {
        width:750/oPx,
        height:Height,
    },
    slider: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'transparent'
    },
    ol: {
        backgroundColor:'rgba(0,0,0,0.3)',
        height:20,
        width:80,
        justifyContent:'space-around',
        alignItems: 'center',
        flexDirection:'row',
        borderRadius:10,
        margin:20,
    },
    li: {
        backgroundColor:'rgba(255,255,255,1.0)',
        height:10,
        width:10,
        borderRadius:5,
    },
    currt: {
        backgroundColor:'rgba(255,255,255,1.0)',
        height:10,
        width:15,
        borderRadius:5,
    },
});
