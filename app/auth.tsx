import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Auth() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  return (
    <View style={{ flex: 1 }}>

      {/* 🔥 LOADER */}
      {loading && (
        <ActivityIndicator
          size="large"
          color="#FFD700"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [{ translateX: -10 }, { translateY: -10 }],
            zIndex: 1,
          }}
        />
      )}

      {/* 🔐 LOGIN REAL UPAO */}
      <WebView
        source={{
          uri: 'https://ssb.upao.edu.pe/StudentSelfService/ssb',
        }}

        javaScriptEnabled
        domStorageEnabled
        sharedCookiesEnabled
        thirdPartyCookiesEnabled

        startInLoadingState

        onLoadEnd={() => setLoading(false)}

        // 🚀 CUANDO YA LOGUEA → VA A AULA VIRTUAL
        onNavigationStateChange={(navState) => {
          const url = navState.url;

          // cuando ya entra al sistema
          if (
            url.includes('StudentSelfService') &&
            !url.includes('login')
          ) {
            router.replace('/aula'); // 🔥 NUEVO FLUJO
          }
        }}
      />
    </View>
  );
}