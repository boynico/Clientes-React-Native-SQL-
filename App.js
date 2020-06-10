/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler'
import React, {useState, useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import PrimeraPantalla from './src/screens/inicial'
import PantallaListado from './src/screens/PantallaListado'
import PantallaCliente from './src/screens/Cliente'
import EditarCliente from './src/screens/EditarCliente'

const Stack = createStackNavigator()

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Inicio'>
        <Stack.Screen name='Inicio' component={PrimeraPantalla} />
        <Stack.Screen name='Listado' component={PantallaListado} />
        <Stack.Screen name="Detalle" component={PantallaCliente}/>
        <Stack.Screen name="Editar" component={EditarCliente}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
