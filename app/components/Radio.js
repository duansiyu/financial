/**
 * Created by zlx on 2017/1/19.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    } from 'react-native';
import {StyleConfig} from '../style';

export default class Radio extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = ({
            isCheck: this.props.isCheck,
        });

    }

    //点击选择框的事件
    onClick () {
        this.setState({
            isCheck: !this.state.isCheck,
        });
        this.props.onClick(this.state.isCheck);
    };

    render(){
        // 文字 string
        var text = this.props.text;
        // 文字样式 object
        let textStyle = this.props.textStyle;
        // 文字是否在图标后面 boolean
        let textAtBehind = this.props.textAtBehind;
        // 是否选中 boolean
        this.state.checked = this.props.checked;
        // 点击事件 function
        //let onClick = this.props.onClick;

        //选择框的图片 是否选中，选择不一样的图片
        let imgSource = this.state.isCheck ? require('../imgs/other/icon_radio_ckecked.png') : require('../imgs/other/icon_radio.png');

        // 设置文字和图片的位置
        let container;
        if(textAtBehind){
            container = (
                <View style = {styles.container} >
                    <Image
                        style = {styles.image}
                        source = {imgSource} />
                    <View style = {styles.view} >
                        <Text style = {[textStyle, styles.text]} >{text}</Text>
                    </View>
                </View>
            );
        }else{
            container = (
                <View style = {styles.container} >
                    <View style = {styles.view} >
                        <Text style = {[textStyle, styles.text]} >{text}</Text>
                    </View>
                    <Image
                        style = {styles.image}
                        source = {imgSource} />
                </View>
            );
        }

        return(
            <TouchableHighlight
                onPress = {this.onClick.bind(this)}
                underlayColor='white' >
                {container}
            </TouchableHighlight>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    image:{
        width: 36/StyleConfig.oPx,
        height: 36/StyleConfig.oPx,
    },
    view:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        fontSize: 28/StyleConfig.oPx,
    }
});