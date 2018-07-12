import {toastShort} from './Toast';
 export const goBack = (navigator)=>{
   if (!navigator) return false;
   const routers = navigator.getCurrentRoutes();
  // 当前页面不为root页面时的处理
  if (routers.length > 2) {   //这里因为多了一个welcome界面，所以是2
    // 默认行为： 退出当前界面。
    navigator.pop();
    return true;
  }
  // 当前页面为root页面时的处理
  if (this.lastBackPressed && (this.lastBackPressed + 2000 >= Date.now())) {
       //最近2秒内按过back键，可以退出应用。
       return false;
      }
    this.lastBackPressed = Date.now();
    toastShort('再按一次退出应用');
    return true;
 }