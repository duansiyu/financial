import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
   ScrollView,
   TouchableOpacity,
   ListView
 } from 'react-native';
 import {StyleConfig} from '../style';
 const oPx = StyleConfig.oPx;
 export default class ProductList extends Component{
   constructor(props){
     super(props);
     this.state = {
       time:'',
       loanSigntypeId:this.props.loanSigntypeId,
       rateTimes:this.props.rateTimes?this.props.rateTimes:1,    //年化利率显示倍数（1 or 100），如首页为实际的年化利率小数值显示时需要乘以100，理财列表中的是整数值不需要乘100
     }
   }

   componentDidMount(){
     this.timer = setInterval(()=>{this.willTime()},1000);     
   }

   componentWillUnmount(){
    clearInterval(this.timer);
   }

   //标的类型
  loanSigntype(data){
    let type = this.props.data.loanSigntypeId;
    let status = type =='4'?
    <Image source={require('../imgs/financial/novice.png')} style={styles.img}/>:
    <View></View>
    return status;
   }

   //加息
   addRate(data){
    let rate = this.props.data.addRate;
    let addR = rate == '0.0'?
    <View></View>:
    <Image source={require('../imgs/financial/addRate.png')} 
           style={styles.addImg}>
      <Text style={styles.addText}>{this.props.data.addRate * this.state.rateTimes}%</Text>
    </Image>
    return addR;
   }

   //时间差
   willTime(data){   
    let grab = this.props.data.grabTime;
    let time = (new Date(grab)).valueOf();
    var nowTime = (new Date()).valueOf();
    var date3 = time-nowTime;
    var days=Math.floor(date3/(24*3600*1000));
    //时
    var leave1=date3%(24*3600*1000);
    var hours=Math.floor(leave1/(3600*1000));
    //分
    var leave2=leave1%(3600*1000);
    var minutes=Math.floor(leave2/(60*1000));
    //秒
    var leave3=leave2%(60*1000);
    var seconds=Math.round(leave3/1000);
    
    if(days>0){
       var myText = days+'天'+hours+'时'+minutes+'分'+seconds+'秒';  
       this.setState ({
        time : myText
      })        
    }

    if(days==0&&hours>0){
       var myText = hours+'时';
       this.setState ({
       time : myText
      })
    }

    if(days==0&&hours==0&&minutes>0){
       var myText = minutes+'分';
       this.setState ({
        time : myText
      })
    }

    if(days==0&&hours==0&&minutes==0&&seconds>0){
       var myText = seconds+'秒';
       this.setState ({
        time : myText
      })
    }
   }

   render(){
     let data = this.props.data;
     let onPress = this.props.onPress;
     return(
       <TouchableOpacity style={styles.line} onPress={()=>onPress(data.id,data.title)}>
         <View style={styles.title}>
           <Text style={styles.title_text}>{data.title}</Text>
         </View>
         <View style={styles.info}>
           <View style={styles.info_left}>
             <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={styles.left_top_text}>{data.apr * this.state.rateTimes}%</Text>
                {this.addRate(data)}
             </View>
             <Text style={styles.bott_text}>年利率</Text>
           </View>
           <View style={styles.info_center}>
             <Text style={styles.center_top_text}>{data.period}</Text>
             <Text style={styles.bott_text}>借款期限</Text>
           </View>
           { data.state=='2'?
           <View style={styles.info_right}>
             <Text style={styles.right_top_text}>{data.surplus}元</Text>
             <Text style={styles.bott_text}>剩余金额</Text>
           </View> :null
           }
           { data.state=='3'?
           <View style={styles.info_right}>
             <Text style={styles.right_text}>还款中</Text>
             <Text style={styles.bott_text}></Text>
           </View>:null
           } 
           { data.state=='4'?
           <View style={styles.info_right}>
             <Text style={styles.right_text}>已完成</Text>
             <Text style={styles.bott_text}></Text>
           </View>:null
           } 
           { data.state=='6'?
           <View style={styles.info_right}>
             <Text style={styles.right_text}>即将开售</Text>
             <Text style={styles.bott_text}></Text>
           </View>:null
           }         
         </View>
         {this.loanSigntype(data)}
         { data.state=='6'?
         <View style={styles.willView}>
             <Image source={require('../imgs/index/clock.png')} style={styles.willicon}/>
             <Text style={styles.will}>
                <Text style={{color:'#f4313f'}}>预发标，</Text>距离开抢还有{this.state.time}</Text>
          </View>:null
        }       
       </TouchableOpacity>
     );
   }
}

const styles = StyleSheet.create({
  line:{
    paddingLeft:22/oPx,
    paddingRight:22/oPx,
    paddingTop:28/oPx,
    paddingBottom:28/oPx,
    backgroundColor:'#fff',
    //borderTopWidth:1,
    //borderTopColor:'#e5e5e5',
    //borderBottomWidth:1,
    //borderBottomColor:'#e5e5e5',
    width:750/oPx,
    marginTop:10/oPx,
  },
  title:{
    width:750/oPx,
    height:40/oPx,
    marginBottom:20/oPx
  },
  title_text:{
    height:40/oPx,
    fontSize:32/oPx,
    color:'#000'
  },
  info:{
    flexDirection:'row',
    alignItems:'center',
  },
  info_left:{
    flex:1,
    alignItems:'flex-start',
  },
  left_top_text:{
    fontSize:40/oPx,
    fontWeight:'400',
    color:'#ff6600',
  },
  bott_text:{
    fontSize:26/oPx,
    color:'#777777',
    marginTop:20/oPx,
  },
  info_center:{
    flex:1,
    alignItems:'center'
  },
  center_top_text:{
    fontSize:30/oPx,
    color:'#000',
  },
  info_right:{
    flex:1,
    alignItems:'flex-end'
  },
  right_top_text:{
    fontSize:30/oPx,
    color:'#000',
  },
  right_text:{
    fontSize:30/oPx,
    color:'#666',
  },
  img:{
    position:'absolute',
    top:0,
    right:0,
    width:94/oPx,
    height:108/oPx
  },
  addImg:{
    width:75/oPx,
    height:25/oPx,
    //justifyContent:'center',
    alignItems:'center',
  },
  addText:{
    fontSize:15/oPx,
    color:'#f4313f',
    marginLeft:21/oPx,
  },
  willView:{
    marginTop:20/oPx,
    backgroundColor:'#f7f4df',
    borderRadius:20/oPx,
    paddingLeft:20/oPx,
    width:450/oPx,
    paddingTop:5/oPx,
    paddingBottom:5/oPx,
    flexDirection:'row',
    alignItems:'center'
  },
  will:{
    fontSize:20/oPx,
    color:'#333',
    marginLeft:10/oPx
  },
  willicon:{
    width:24/oPx,
    height:24/oPx,
  },
  disAndTimeText:{
    color:'#f57b25',
  }
})
