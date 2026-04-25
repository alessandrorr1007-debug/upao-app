import { useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Asistencia() {
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#FFD700" />
        </View>
      )}

      <WebView
        ref={webViewRef}
        source={{
          uri: 'https://ssb.upao.edu.pe/StudentSelfService/ssb/studentAttendanceTracking#!/',
        }}

        javaScriptEnabled
        domStorageEnabled
        cacheEnabled
        cacheMode="LOAD_CACHE_ELSE_NETWORK"

        sharedCookiesEnabled
        thirdPartyCookiesEnabled

        startInLoadingState
        scalesPageToFit
        bounces={false}
        pullToRefreshEnabled={false}
        originWhitelist={['*']}

        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000055',
    zIndex: 1,
  },
});