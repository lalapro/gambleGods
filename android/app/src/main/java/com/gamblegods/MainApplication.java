package com.gamblegods;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.List;
import com.microsoft.codepush.react.CodePush;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.ReactGateway;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
import io.invertase.firebase.database.ReactNativeFirebaseDatabasePackage;

public class MainApplication extends NavigationApplication {

    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() { return "index"; }
            @Override
            public String getJSBundleFile() {
                return CodePush.getJSBundleFile();
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new CodePush("w56oBfEVCy4USE2liskFIqSOTZKfaye6f7ul23", getApplicationContext(), BuildConfig.DEBUG),
                new ReactNativeFirebaseAppPackage(),
                new ReactNativeFirebaseDatabasePackage()
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
}
