package com.yourapp;

import com.facebook.react.ReactActivity;

import android.content.Intent;

public class MainActivity extends ReactActivity {

    @Override
    protected String getMainComponentName() {
        return "YourAppName"; // Replace with your app name
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }
}
