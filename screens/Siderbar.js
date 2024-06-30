import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons for icons
import SyncStorage from 'sync-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Sidebar = ({ navigation, onLogout }) => {
  const [storedUsername, setStoredUsername] = useState('');
  const [storedType, setStoredType] = useState('');

  useEffect(() => {
    const fetchUsernameAndType = async () => {
      const username = await SyncStorage.get('username');
      const type = await AsyncStorage.getItem('type');
      setStoredUsername(username);
      setStoredType(type);
    };

    fetchUsernameAndType();
  }, []);

  const handleLogout = async () => {
    await SyncStorage.remove('username');
    await SyncStorage.remove('rollNo');
    await SyncStorage.remove('email');
    await SyncStorage.remove('password');

    onLogout();
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <View style={{ alignItems: 'center', padding: 20 }}>
          {/* User Avatar */}
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: '#ccc',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <Ionicons name="person-outline" size={40} color="black" />
          </View>

          {/* Username */}
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>{storedUsername}</Text>
        </View>

        <View style={{ padding: 10 }}>
          {/* Logout */}
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={24} color="black" style={{ marginRight: 10 }} />
            <Text>Logout</Text>
          </TouchableOpacity>

          {/* Login as Student/Teacher */}
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
            onPress={() => navigation.navigate(storedType === 'Teacher' ? 'StudentLogin' : 'TeacherLogin')}
          >
            <Ionicons name="log-in-outline" size={24} color="red" style={{ marginRight: 10 }} />
            <Text style={{ color: 'red' }}>Login as {storedType === 'Teacher' ? 'Student' : 'Teacher'}</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default Sidebar;
