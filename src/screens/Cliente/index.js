/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native'
import {BotonEliminar} from '../../components/BotonEliminar'
import {openDatabase} from 'react-native-sqlite-storage'
var db = openDatabase({name: 'UserDatabase.db'})

const PantallaCliente: () => React$Node = ({route, navigation}) => {
  const {param} = route.params
  const [cliente, setCliente] = useState([])

  useEffect(() => {
    searchUser()
  })

  const searchUser = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_user where user_id = ?',
        [param],
        (tx, results) => {
          var len = results.rows.length
          if (len > 0) {
            setCliente(results.rows.item(0))
          } else {
            console.log('No existe')
          }
        },
      )
    })
  }

  const borrar = () => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  table_user where user_id=?',
        [param],
        (tx, results) => {
          console.log('Results', results.rowsAffected)
          if (results.rowsAffected > 0) {
            console.log('Borrado con exito')
            redirigir()
          } else {
            alert('Error')
          }
        },
      )
    })
  }

  const editar = () => {
    navigation.navigate('Editar', {param: param})
  }

  const redirigir = () => {
    navigation.navigate('Listado')
  }

  //UI
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}> DATOS </Text>
      <View style={styles.rowStyle}>
        <View style={styles.labels}>
          <Text>NOMBRE</Text>
          <Text>APELLIDO</Text>
          <Text>CORREO</Text>
        </View>
        <View style={styles.datos}>
          <Text style={styles.datosText}>{cliente.user_name}</Text>
          <Text style={styles.datosText}>{cliente.user_lastname}</Text>
          <Text style={styles.datosText}>{cliente.user_mail}</Text>
        </View>
      </View>
      <BotonEliminar onPress={() => borrar()}>Eliminar</BotonEliminar>
      <BotonEliminar onPress={() => editar()}>Editar</BotonEliminar>
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AABBAA',
    height: '100%',
  },
  titulo: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  rowStyle: {
    flexDirection: 'row',
  },
  labels: {
    flex: 1,
    alignItems: 'center',
  },
  datos: {
    flex: 2,
    alignItems: 'center',
  },
  datosText: {
    fontWeight: 'bold',
  },
})

export default PantallaCliente
