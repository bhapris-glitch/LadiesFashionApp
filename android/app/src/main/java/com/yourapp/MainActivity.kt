package com.yourapp

import com.facebook.react.ReactActivity
import android.content.Intent

class MainActivity : ReactActivity() {
    override fun getMainComponentName(): String? {
        return "YourAppName" // Replace with your app name
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        setIntent(intent)
    }
}
