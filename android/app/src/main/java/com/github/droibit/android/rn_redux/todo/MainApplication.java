package com.github.droibit.android.rn_redux.todo;

import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.reactnativenavigation.NavigationApplication;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

  @Override public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  @NonNull
  protected List<ReactPackage> getPackages() {
    return Arrays.asList(
        new MainReactPackage(),
        new RNI18nPackage(),
        new ReactNativeConfigPackage()
    );
  }

  @Nullable @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }

  @Nullable @Override public String getJSMainModuleName() {
    return "index";
  }
}
