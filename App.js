import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './screens/Dashboard';
import Attendance from './screens/Attendance';
import MemosMain from './screens/Memo';
import AssignmentsMain from './screens/AssignmentsMain';
import StudentRegister from './Authentication/StudentRegister';
import TeacherLogin from './Authentication/TeacherLogin';
import TeacherRegister from './Authentication/TeacherRegister';
import StudentLogin from './Authentication/StudentLogin';
import Sidebar from './screens/Siderbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Drawer.Navigator
          initialRouteName="Dashboard"
          drawerContent={(props) => <Sidebar {...props} onLogout={handleLogout} />}
        >
          <Drawer.Screen name="Dashboard" component={Dashboard} />
          <Drawer.Screen name="Attendance" component={Attendance} />
          <Drawer.Screen name="MemosMain" component={MemosMain} />
          <Drawer.Screen name="AssignmentsMain" component={AssignmentsMain} />
          <Drawer.Screen name="StudentLogin">
            {props => <StudentLogin {...props} onLoginSuccess={handleLoginSuccess} />}
          </Drawer.Screen>
          <Drawer.Screen name="StudentRegister" component={StudentRegister} />
          <Drawer.Screen name="TeacherLogin">
            {props => <TeacherLogin {...props} onLoginSuccess={handleLoginSuccess} />}
          </Drawer.Screen>
          <Drawer.Screen name="TeacherRegister" component={TeacherRegister} />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="StudentLogin">
            {props => <StudentLogin {...props} onLoginSuccess={handleLoginSuccess} />}
          </Stack.Screen>
          <Stack.Screen name="StudentRegister" component={StudentRegister} />
          <Stack.Screen name="TeacherLogin">
            {props => <TeacherLogin {...props} onLoginSuccess={handleLoginSuccess} />}
          </Stack.Screen>
          <Stack.Screen name="TeacherRegister" component={TeacherRegister} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
