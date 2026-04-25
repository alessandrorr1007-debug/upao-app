import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Cuenta() {
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const logout = () => {
    router.replace('/auth'); // 🔥 vuelve al login
  };

  return (
    <View style={styles.container}>

      {/* 🔴 BOTÓN CERRAR SESIÓN */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Ionicons name="log-out-outline" size={28} color="#FF3B30" />
      </TouchableOpacity>

      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#FFD700" />
        </View>
      )}

      <WebView
        ref={webViewRef}
        source={{
          uri: 'https://ssb.upao.edu.pe/StudentSelfService/ssb/accountSummary#!/',
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

  /* 🔥 botón logout arriba */
  logoutButton: {
    position: 'absolute',
    top: 40,
    right: 15,
    zIndex: 10,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    elevation: 5,
  },

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