package com.project;

import android.app.Application;

import com.facebook.react.ReactApplication;
import cn.jpush.reactnativejpush.JPushPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.chinaztt.encapsulation.EncryptionReactPackager;//加密
//import com.react_native_encryption_library.EncryptionReactPackager;
import com.theweflex.react.WeChatPackage;
import cn.reactnative.modules.qq.QQPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      boolean SHUTDOWN_TOAST = false;
      boolean SHUTDOWN_LOG = false;
      return Arrays.<ReactPackage>asList(
          new EncryptionReactPackager(),
          new MainReactPackage(),
          new WeChatPackage(),
          new QQPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
