import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AulaVirtual() {
  const router = useRouter();

  const [dark, setDark] = useState(false);

  // 🔐 PROTEGER SESIÓN
  useFocusEffect(
    useCallback(() => {
      const checkSession = async () => {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          router.replace('/auth');
        }
      };

      checkSession();
    }, [])
  );

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const saved = await AsyncStorage.getItem('theme');
    if (saved !== null) {
      setDark(saved === 'dark');
    }
  };

  const toggleTheme = async () => {
    const newTheme = !dark;
    setDark(newTheme);
    await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  // 🚪 LOGOUT SEGURO
  const handleLogout = async () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Seguro que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salir',
          style: 'destructive',
          onPress: async () => {

            await AsyncStorage.multiRemove([
              'token',
              'user',
              'theme'
            ]);

            router.replace('/auth');
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, dark ? styles.darkBg : styles.lightBg]}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={[styles.title, dark && { color: '#fff' }]}>
          Aula Virtual
        </Text>

        <View style={{ flexDirection: 'row', gap: 15 }}>

          {/* TEMA */}
          <TouchableOpacity onPress={toggleTheme}>
            <Ionicons
              name={dark ? 'sunny' : 'moon'}
              size={24}
              color={dark ? '#FFD700' : '#0A1F44'}
            />
          </TouchableOpacity>

          {/* LOGOUT */}
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons
              name="log-out-outline"
              size={24}
              color="#FF4D4D"
            />
          </TouchableOpacity>

        </View>
      </View>

      {/* MENÚ */}
      <View style={styles.menu}>

        <Item icon="calendar" text="Horario" dark={dark} onPress={() => router.push('/horario')} />
        <Item icon="star" text="Notas" dark={dark} onPress={() => router.push('/calificaciones')} />
        <Item icon="checkmark-circle" text="Asistencia" dark={dark} onPress={() => router.push('/asistencia')} />
        <Item icon="document-text" text="Historial" dark={dark} onPress={() => router.push('/historial')} />
        <Item icon="card" text="Cuenta" dark={dark} onPress={() => router.push('/cuenta')} />
        <Item icon="list" text="Planificación" dark={dark} onPress={() => router.push('/planificacion')} />

      </View>

    </View>
  );
}

/* ITEM COMPONENT */
function Item({ icon, text, onPress, dark }: any) {
  return (
    <TouchableOpacity
      style={[styles.item, dark && styles.itemDark]}
      onPress={onPress}
    >
      <View style={[styles.iconBox, dark && styles.iconBoxDark]}>
        <Ionicons
          name={icon}
          size={22}
          color={dark ? '#FFD700' : '#0A1F44'}
        />
      </View>

      <Text style={[styles.text, dark && { color: '#fff' }]}>
        {text}
      </Text>

      <Ionicons
        name="chevron-forward"
        size={18}
        color={dark ? '#888' : '#A0A7B4'}
      />
    </TouchableOpacity>
  );
}

/* ESTILOS */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  lightBg: {
    backgroundColor: '#F3F6FB',
  },

  darkBg: {
    backgroundColor: '#0A1F44',
  },

  header: {
    marginTop: 50,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0A1F44',
  },

  menu: {
    marginTop: 10,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
  },

  itemDark: {
    backgroundColor: '#132B57',
  },

  iconBox: {
    width: 40,
    height: 40,
    backgroundColor: '#FFD70020',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  iconBoxDark: {
    backgroundColor: '#FFD70010',
  },

  text: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1C',
    fontWeight: '500',
  },
});