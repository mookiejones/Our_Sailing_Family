package android.our_sailing_family.com.oursailingfamily;

import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.WebSettings;
import android.webkit.WebView;


public class MainActivity extends Activity {
    private WebView mWebView;

    private static final String data ="http://sailing-project.appspot.com/";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
       setContentView(R.layout.activity_main);

        // get Webview
        mWebView = (WebView)findViewById(R.id.activity_main_webview);
        WebSettings webSettings = mWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);

        // Stop local links and redirects from opening in browser instead of webview
        mWebView.setWebViewClient(new AppViewWebClient());
//        webView.loadData(data,"text/html",null);
//        webView.loadDataWithBaseURL("", data, "text/html", "UTF-8", "");
        mWebView.loadUrl(data);
 //        webView.addJavascriptInterface(new WebAppInterface(this), "Android");
  //      webView.loadUrl("http://sailing-project.appspot.com/");
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }else if (id==R.id.action_reload){
            mWebView.loadUrl(data);
            return true;

        }


        return super.onOptionsItemSelected(item);
    }
}
