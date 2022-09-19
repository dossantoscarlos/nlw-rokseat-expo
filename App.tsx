import { StatusBar, View } from 'react-native';
import { Background } from './src/components/Background/index';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter';

import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';
import './src/services/notificationConfigs';
import {getPushNotificationToken } from './src/services/getPushNotificationToken'
import { useRef, useEffect } from 'react';
import { Subscription } from 'expo-modules-core';
 

function App() { 
  const getNotificationListener = useRef<Subscription>()
  const responseNotificationListener = useRef<Subscription>()

  useEffect(() => {
    getPushNotificationToken();
  })

  const [ fontsLoaded ] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });
  
  return (
    <Background>
      <StatusBar 
        barStyle={"light-content"}
        backgroundColor={'transparent'}
        translucent
      />
      {fontsLoaded ? <Routes/> : <Loading /> }
    </Background>
  );
}
export default App;