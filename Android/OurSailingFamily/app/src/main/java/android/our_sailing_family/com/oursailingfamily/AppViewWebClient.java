package android.our_sailing_family.com.oursailingfamily;

import android.content.Intent;
import android.net.Uri;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/**
 * Created by mookie on 12/2/14.
 */
public class AppViewWebClient extends WebViewClient {

    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        String host = Uri.parse(url).getHost();
        if (host.endsWith("sailing-project.appspot.com")||host.endsWith("google.com")||host.endsWith("youtube.com")){
            return false;
        }

        Intent intent = new Intent(Intent.ACTION_VIEW,Uri.parse(url));

        view.getContext().startActivity(intent);
        return true;
    }
}
