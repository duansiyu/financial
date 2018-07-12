/**
 * Created in July 26, 2017
 * dsy
 * 手势密码
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    PanResponder,
    styleSheet,
    Alert,
    Image,
} from 'react-native';

import TitleBar from '../../components/TitleBar';
import {goBack} from '../../utils/NavigatorBack';
import {StyleConfig} from '../../style';
import Storage from '../../utils/Storage';
import Login from './login';
import appMain from '../appMain';
import Service from '../../utils/service';
import Loading from '../../components/Loading';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const oPx = StyleConfig.oPx;
const Radius = Width / 10;
const Line = 4;
const count = 5;

//线
class Lines extends Component {
	render(){
		let { start, end, color, length, angle, moveX, moveY } = this.props;
		return(
			<View style={[styles.lineView,
				{top:start.y,width:length,left:start.x,backgroundColor:color},
				{transform:[{translateX:moveX},{translateY:moveY},{rotateZ:angle}]}
			]}>				
			</View>
		);
	}
}

//圆
class Circle extends Component {
	render(){
		let { isActive, x, y ,color} = this.props;
		return(
			  <View style={[styles.childView,{borderRadius:Radius,width:Radius*2,height:Radius*2,left:x,top:y,borderColor:isActive?color:'#fff'}]}>
                <View style={styles.circul}>
                   { isActive?
                    <Image source={require('../../imgs/icon/fill.png')} style={styles.img}/>:
                    null
                   } 
                </View>
              </View>
			)

	}
}

export default class setGesture extends Component{
	constructor(props) {
        super(props);
        let circles = [];
        let lines = [];
        let Margin = Radius;
        this.Password = '';
        for (let i=0; i < 9; i++) {
            let row = i % 3;
            let clu = parseInt(i / 3);
            circles.push({
                isActive: false,
                x: (row*3+1)*Radius,
                y: (clu*3+1)*Radius,
                color:'#ff9919'
            });
            lines.push({
                start: {
                    x: (row*3+2)*Radius-Line/2,
                    y: (clu*3+2)*Radius-Line/2
                },
                end: {
                    x: (row*3+2)*Radius,
                    y: (clu*3+2)*Radius
                },
                angle:'0rad',
                moveX:0,
                moveY:0,
                length:0,
                color:'#ff9919',
                lock:false,
                
            })
        }
        this.state = {
            circles: circles,
            circlesInit:circles,
            lines: lines,
            linesInit:lines,
            viewWidth:0,
            password:[],
            isSetOrLogn:props.isSetOrLogn,
            message:props.isSetOrLogn == 'set'?'请设置手势密码':'请绘制手势密码',
            mobilePhone:'',
            gestlock:false,
            showDialog:false
        }
    }

    componentDidMount() {
        setTimeout(this.measureWatermarkerImage.bind(this));
        this.setState({
            isSetOrLogn:this.props.isSetOrLogn,
        })
    }
    measureWatermarkerImage(){
        this.refs.watermarkerImage.measure((a, b, width, height, px, py) =>
            this.setState({viewWidth:width,viewHeight:height,viewPageX:px,viewPageY:py})
        );
    }
    componentWillMount() {
        this._panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (event) => true,
            onStartShouldSetPanResponderCapture: (event) => true,
            onMoveShouldSetPanResponder: (event) => true,
            onMoveShouldSetPanResponderCapture: (event) => true,

            // 开始手势操作
            onPanResponderGrant: (event) => {
                this.onStart(event);
            },
            // 移动操作
            onPanResponderMove: (event) => {
                this.onMove(event);
            },
            // 释放手势
            onPanResponderRelease: (event) => {
                this.onEnd(event);
            }
        })
    }

    //返回
    _goBack(){
        goBack(this.props.navigator);
    }

    //登录
    _goLogin(){
        this.props.navigator.push({component:Login,name:'Login'});
    }

    _goMain(){
        Storage.clearItem('unGestLock');
        let route = this.props.navigator.getCurrentRoutes();
        this.props.navigator.jumpTo(route[0]);
    }

    onStart(e){
        if(this.state.gestlock){
            Alert.alert(
                '提示信息',
                '手势密码已被锁定，请重新登录',
                [
                    {text: '确定', onPress: () => this._goLogin()},
                ]

            )
            return;
        }
        let x = e.nativeEvent.pageX;
        let y = e.nativeEvent.pageY - this.state.viewPageY;
        let index = this.getTouchChar({x,y});
        if(index){
            this.setActive(index);
            this.linesChiner(index,{x,y});
        }
    }

    onMove(e){
        if(this.state.gestlock) return;
        let x = e.nativeEvent.pageX;
        let y = e.nativeEvent.pageY - this.state.viewPageY;
        let index = this.getTouchChar({x,y});

        this.linesChiner(index,{x,y});
        if(index){
            this.setActive(index);
        }
    }
    onEnd(e){
        if(this.state.gestlock) return;
        if(this.state.password.length==0){
            return;
        }
        //截断尾巴
        let endIndex = this.state.password[this.state.password.length-1];
        this.linesChiner(endIndex,this.state.lines[endIndex].start);
        if(this.state.password.length<3){
            Alert.alert('提示','密码太过简单啦，请重新绘制哦！');
            this.onReset();
        }else{
            let thisPwd = this.state.password.join('');
            //设置
            if(this.state.isSetOrLogn == 'set'){

                if(this.Password == ''){
                    this.Password = thisPwd;
                    this.setState({message:'请再次确认手势密码'})
                }else if(this.Password != thisPwd){
                    this.setError();
                    this.Password = '';
                    this.setState({message:'两次密码绘制不一致'});
                    return;
                }else{
                    this.setState({showDialog:true});
                    Service.post('',(data)=>{
                        if(data.error == '0'){
                            this.setState({message:'手势密码设置成功'});
                            Alert.alert(
                                '提示信息',
                                '手势密码设置成功',
                                [
                                    {text: '确定', onPress: () => this._goMain()},
                                ]

                            );
                        }
                        this.setState({showDialog:false});
                    },(error)=>{
                        this.setState({showDialog:false});
                        console.log(error);
                    })
                }
            //修改
            }else if(this.state.isSetOrLogn == 'change'){

                if(this.Password == ''){
                    this.Password = thisPwd;
                    this.setState({message:'请再次确认手势密码'})
                }else if(this.Password != thisPwd){
                    this.setError();
                    this.Password = '';
                    this.setState({message:'两次密码绘制不一致'});
                    return;
                }else{
                    this.setState({showDialog:true});
                    Service.post('',(data)=>{
                        if(data.error == '0'){
                            this.setState({message:'手势密码修改成功'});
                            Alert.alert(
                                '提示信息',
                                '手势密码修改成功',
                                [
                                    {text: '确定', onPress: () => this._goMain()},
                                ]

                            );
                        }else{
                            Alert.alert('提示',data.msg);
                        }
                        this.setState({showDialog:false});
                    },(error)=>{
                        this.setState({showDialog:false});
                        console.log(error);
                    })
                }
            //验证    
            }else{

                this.setState({showDialog:true});
                alert(thisPwd);
                /*Service.post(,(data)=>{
                    console.log(data)
                    if(data.error == '0'){
                        Storage.setItem('GestTime',Date.now());
                        this.props.navigator.resetTo({component:AppMain,name:'AppMain',params:{selectedTab:'user'}});
                    }else{
                        if(data.errorCount && data.errorCount == '5'){
                            Storage.clear();
                            this.setState({message:'您已经没有机会啦,请重新登录后再设置！',gestlock:true});
                        }else{
                            let count = 5 - data.errorCount;
                            this.setError();
                            setTimeout(()=>this.onReset());
                            this.setState({message:'手势密码错误，您还有'+count+'次机会！'});
                        }
                    }
                    this.setState({showDialog:false});
                },(error)=>{
                    console.log(error);
                    this.setState({showDialog:false});
                })*/
            }
            this.onReset();
        }
    }
    linesChiner(index,op){
        try{
            if(index && !this.state.circles[index].isActive){
                let pre = this.state.password[this.state.password.length-1];
                let transform = this.getTransform(this.state.lines[pre].start,this.state.lines[index].start);
                let length = transform.d;
                let angle = transform.a + 'rad';
                let moveX = transform.x;
                let moveY = transform.y;
                this.state.lines[pre].length = length;
                this.state.lines[pre].angle = angle;
                this.state.lines[pre].moveX = moveX;
                this.state.lines[pre].moveY = moveY;
                let lines = this.state.lines;
                this.setState({lines});
                return;
            }else{
                let older = this.state.password[this.state.password.length-1];
                let transform = this.getTransform(this.state.lines[older].start,op);
                let length = transform.d;
                let angle = transform.a + 'rad';
                let moveX = transform.x;
                let moveY = transform.y;
                this.state.lines[older].length = length;
                this.state.lines[older].angle = angle;
                this.state.lines[older].moveX = moveX;
                this.state.lines[older].moveY = moveY;
                let lines = this.state.lines;
                this.setState({lines});
            }
         }catch(e){}   
    }
    getDistance(pt1, pt2) {
        let a = Math.pow((pt1.x - pt2.x), 2);
        let b = Math.pow((pt1.y - pt2.y), 2);
        let d = Math.sqrt(a + b);
        return d;
    }
    getTransform(pt1, pt2) {
        //计算线条角度，wsl
        let d = this.getDistance(pt1, pt2);
        let c = (pt2.x - pt1.x) / d || 0;
        let a = Math.acos(c);
        if ( pt1.y > pt2.y ) a = 2 * Math.PI - a;
        let c1 = {
            x: pt1.x + d / 2,
            y: pt1.y
        };
        let c2 = {
            x: (pt2.x + pt1.x) / 2,
            y: (pt2.y + pt1.y) /2
        };
        let x = c2.x - c1.x;
        let y = c2.y - c1.y;
        return {d, a, x, y};
    }
    getTouchChar(touch) {
        let x = touch.x;
        let y = touch.y;
        for (let i=0; i < 9; i++){
            let minx = this.state.circles[i].x;
            let miny = this.state.circles[i].y;
            let maxx = minx + Radius*2;
            let maxy = miny + Radius*2;
            if(x>minx && y>miny && x<maxx && y<maxy){
                return String(i);
            }
        }
        return false;
    }
    setActive(index){
        if(index){
            if(this.state.circles[index].isActive) return;
            this.state.circles[index].isActive = true;
            let circles = this.state.circles;
            this.setState({circles});
            let password = this.state.password;
            password.push(index);
            if(password.length>1){
                this.linesChiner(password[password.length-2],this.state.lines[index].start);
            }
            this.setState({password:password});
        }
    }
    onReset(){
        for(let i =0;i<9;i++){
            this.state.circles[i].isActive = false;
            this.state.circles[i].color = '#ff9919';
            let circles = this.state.circles;
            this.setState({circles});
            this.state.lines[i].color = '#ff9919';
            this.state.lines[i].length = 0;
            let lines = this.state.lines;
            this.setState({lines});
        }
        this.setState({password:[]});
    }
    setError(){
        for(let i =0;i<this.state.password.length;i++){
            this.state.circles[this.state.password[i]].color = '#de0000';
            let circles = this.state.circles;
            this.setState({circles});
            this.state.lines[this.state.password[i]].color = '#de0000';
            let lines = this.state.lines;
            this.setState({lines});
        };
        setTimeout(()=>{this.onReset()},500);
    }
    circlesDom(row,index){
        return (<Circle key={index} {...this.state.circles[index]} />)
    }
    linesDom(row,index){
        return (<Lines key={index} {...this.state.lines[index]} />)
    }

    render(){
    	return(
    		<View style={styles.body}>
    			<TitleBar title="验证手势密码" leftBtnFunc={this._goBack.bind(this)}/>
    			<View style={styles.main}>
    				<Image source={require('../../imgs/myAccount/head.png')} style={styles.head}/>
    				<Text style={styles.mainText}>15773008830</Text>
    				<Text style={styles.mainText}>{this.state.message}</Text>
    			</View>
    			<View
	                ref="watermarkerImage"
	                style={styles.container} {...this._panResponder.panHandlers}>
	                {this.state.circles.map((row,index)=>{return this.circlesDom(row,index)})}
	                {this.state.lines.map((row,index)=>{return this.linesDom(row,index)})}
            	</View>
            	{/*<Loading show={this.state.showDialog} top={true}/>*/}
                { this.state.isSetOrLogn=='set'?
                    <Text style={styles.text}>设置手势密码，防止他人未经授权查看</Text>
                  :null
                }

    		</View>
    		)
    }


}

const styles = StyleSheet.create({
	lineView:{
        width:Line,
        height:Line,
        position:'absolute',
        zIndex:-1
    },
    childView:{
        backgroundColor:'transparent',
        borderWidth:2,
        borderColor:'#fff',
        position:'absolute',
        justifyContent:'center',
        alignItems:'center'
    },
    circul:{
        width:Radius*2,
        height:Radius*2,
        borderRadius:Radius,
        backgroundColor:'transparent',
        justifyContent:'center',
        alignItems:'center',
    },
    img:{
         width:Radius*2-4,
         height:Radius*2-4,            
    },
    body:{
        width:Width,height:Height,
        backgroundColor:'#ffb133',
    },
    main:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'transparent'
    },
    mainText:{
        marginTop:10/oPx,
        color:'#fff'
    },
    head:{
		width:120/oPx,
		height:120/oPx,
		borderWidth:StyleConfig.borderWidth,
		borderColor:'#fff',
		borderRadius:8/oPx
	},
	container:{
        backgroundColor:'transparent',
        width:Width,
        height:Width,
    },
    text:{
        textAlign:'center',
        fontSize:28/oPx,
        marginTop:20/oPx,
        color:'#fff'
    }
})