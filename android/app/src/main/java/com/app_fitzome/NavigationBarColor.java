package com.app_fitzome;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;
import android.os.Build;
import com.facebook.react.bridge.Promise;
import android.view.Window;
import android.graphics.Color;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.uimanager.IllegalViewOperationException;
import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;
import android.animation.ValueAnimator;
import android.view.View;
import android.animation.ArgbEvaluator;

public class NavigationBarColor extends ReactContextBaseJavaModule {
    //https://developer.android.com/reference/android/view/Window#setNavigationBarColor(int)
    //https://gist.github.com/chourobin/f83f3b3a6fd2053fad29fff69524f91c#file-promises-md

    private static final String API_ERROR_TYPE = "API_LEVEl";
    private static final String API_ERROR_MESSAGE = "Only Android version >= 21 is supported";

    NavigationBarColor(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "NavigationBarColor";
    }

    @ReactMethod
    public void changeNavigationBarColor(String color, Boolean light, Promise promise) {
        final Window window = getCurrentActivity().getWindow();
        //CHECK IF VERSION IS SUPPORTED
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            try{
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        //CURRENT COLOR
                        Integer colorFrom = window.getNavigationBarColor();
                        //NEW COLOR
                        Integer colorTo = Color.parseColor(String.valueOf(color));
                        //ANIMATION
                        ValueAnimator colorAnimation = ValueAnimator.ofObject(new ArgbEvaluator(), colorFrom, colorTo);
                        colorAnimation.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
                            @Override
                            public void onAnimationUpdate(ValueAnimator animator) {
                                window.setNavigationBarColor((Integer) animator.getAnimatedValue());
                            }
                        });
                        colorAnimation.start();
                        //CHANGE BAR THEME
                        int flags = window.getDecorView().getSystemUiVisibility();
                        if (light) {
                            flags |= View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
                        } else {
                            flags &= ~View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
                        }
                        window.getDecorView().setSystemUiVisibility(flags);
                        //ALL FINE
                        promise.resolve("completed");
                    }
                });
            }catch (IllegalViewOperationException e) {
                promise.reject("error", e);
            }
        }else{
            promise.reject(API_ERROR_TYPE, new Throwable(API_ERROR_MESSAGE));
        }
    }
}