import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    RefreshControl,
    ActivityIndicator,
    InteractionManager
    } from 'react-native';

import {StyleConfig} from '../../../style/index';
import NavigationBar from '../../../components/NavigationBar';
import {Navigator} from 'react-native-deprecated-custom-components';
import {goBack} from '../../../utils/NavigatorBack';
import Service from '../../../utils/service';
import {toastShort} from '../../../utils/Toast';
const oPx = StyleConfig.oPx;

export default class PaymentList extends Component {
	constructor(props) {
	  super(props);
	  let listData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	  this.state = {
	  	 listData: listData.cloneWithRows([]),
	  	 monthNum:this.props.monthNum,
	  	 pageNumber:1,
	  	 numPerPage:10,
	  	 isRefreshing: false,
	  	 totalPageNum:0,
	  	 isShowBottomRefresh:false,
	  };
	}

	 componentDidMount(){
        this._getData();
    }

    _getData(){
    	let moneyList = new FormData();
    	moneyList.append("OPT","155");
    	moneyList.append("monthNum",this.state.monthNum);
    	moneyList.append("pageNumber",this.state.pageNumber);
        moneyList.append("numPerPage",this.state.numPerPage);

    	console.log(moneyList);
    	Service.post(moneyList,(data)=>{
    		var totalPageNum = data.result.totalPage;
    		console.log(data);
    		if(data.errorCode==0){
    			if(data.result==0){
    				this.setState({
    					isEmpty:true
    				})
    				return;
    			}
	    		this.setState({
	    			isShowBottomRefresh:true,
	    			isRefreshing: false,
	    			totalPageNum: totalPageNum,
	    			listData:this.state.listData.cloneWithRows(data.result),	
	    		})
    		}else{
    			this.setState({isRefreshing: false});
    			toastShort(data.errorMsg,-300);
    		}
    	},(error)=>{
    		this.setState({isRefreshing: false});
    	});
    }

    //利息
    Interest(data){
    	let ben = parseFloat(data.recycleMoney);
    	let all = parseFloat(data.principalAndInterest);
    	let interest = all-ben;
    	console.log("本金"+ben+"所有"+all+"利息"+interest.toFixed(2));
    	return interest.toFixed(2);
    }

	_renderRow(data){
		return(
			<View style={styles.one}>
				<View style={styles.titleView}>
					<Text style={styles.titleFont}>{data.borrowname}</Text>
				</View>
				<View style={styles.bottomView}>
					<View style={styles.flex}>
						<Text style={styles.num}>￥{data.recycleMoney}+{this.Interest(data)}</Text>
						<Text style={styles.info}>本金+利息</Text>
					</View>
					<View style={[styles.flex,{alignItems:'center'}]}>
						<Text style={styles.num}>{data.periods}</Text>
						<Text style={styles.info}>当前期/总期</Text>
					</View>
					<View style={[styles.flex,{alignItems:'flex-end'}]}>
						<Text style={styles.num}>{data.recycledate}</Text>
						<Text style={styles.info}>回收日期</Text>
					</View>
				</View>
			</View>
		);
	}

	//底部
    _renderFooter() {
	    if(this.state.isEmpty){	    	
	       return (
	       	<View style={styles.moreBottom}>
	               <Text style={{color:'#999'}}>没有符合条件的内容</Text>
	       </View>)
	     }
	     /*if(this.state.isShowBottomRefresh){
	         return (<View style={{marginVertical: 10}}>
	                 <ActivityIndicator />
	         </View>)
	     }*/
    }

   	_end(){
	     if(this.state.isEmpty) return;
	     if(this.state.totalPageNum == 1) return;
	     if(!this.isShowBottomRefresh)return;
	     let index = this.state.pageNumber;
	     index++;
	     if(index>this.state.totalPageNum){
	       toastShort('没有更多了哦',-100);
	       this.setState({isShowBottomRefresh:false});
	     }else{
	       this.setState({pageNumber:index},()=>this._getData());
	     }
   	}

    _onRefresh(){
     	this.setState({pageNumber:1,isRefreshing:true},()=>this._getData());
    }

	render(){
		return(
			<ListView
			     renderFooter={this._renderFooter.bind(this)}
			     dataSource={this.state.listData}
			     renderRow={this._renderRow.bind(this)}
			     onEndReached={this._end.bind(this)}
			     enableEmptySections = {true}
			     onEndReachedThreshold={30}
			     refreshControl={
	            <RefreshControl
	              refreshing={this.state.isRefreshing}
	              onRefresh={this._onRefresh.bind(this)}
	              tintColor="#ff0000"
	              title="刷新中..."
	              titleColor="#999"
	            />}
				 />
			);
	}
}

const styles = StyleSheet.create({
	moreBottom:{
	    height:80/oPx,
	    justifyContent:'center',
	    alignItems:'center'
  },
	one:{
		marginTop:20/oPx,
		width:750/oPx,
		height:200/oPx,
		backgroundColor:'#fff',
		borderColor:StyleConfig.borderColor,
		borderTopWidth:1/oPx,
		borderBottomWidth:1/oPx,
	},
	titleView:{
		marginLeft:24/oPx,
		marginRight:24/oPx,
		justifyContent: 'center',
		height:65/oPx,
		borderStyle:'dashed',
		borderBottomWidth:1/oPx,
		borderColor:StyleConfig.borderColor,
		width:702/oPx,
	},
	titleFont:{
		fontSize:28/oPx,
		color:'#333',
	},
	bottomView:{
		flexDirection:'row',
		width:750/oPx,
		height:135/oPx,
		paddingLeft:24/oPx,
		paddingRight:24/oPx,
		alignItems: 'center',
	},
	flex:{
		flex:1,
		//alignItems: 'center',
	},
	num:{
		fontSize:30/oPx,
		color:'#333',
	},
	info:{
		fontSize:20/oPx,
		color:'#999',
	}
})