/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler'
import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, TextInput, Button} from 'react-native'
import {NavigationContainer, Dimensions} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {ButtonAdd} from '../../components/ButtonAddClient'
import {ButtonNavigate} from '../../components/ButtonNavigate'
import {ButtonType} from '../../components/Button3'
import {openDatabase} from 'react-native-sqlite-storage'
var db = openDatabase({name: 'UserDatabase.db'})

const EditarCliente: () => React$Node = ({route, navigation}) => {
  const [clienteNombre, setclienteNombre] = useState('')
  const [clienteApellido, setclienteApellido] = useState('')
  const [clienteCorreo, setclienteCorreo] = useState('')
  const [cliente, setCliente] = useState([])

  const {param} = route.params

  useEffect(() => {
    searchUser()
  }, [])

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
    fillData()
  }

  const fillData = () => {
    setclienteNombre(cliente.user_name)
    setclienteApellido(cliente.user_lastname)
    setclienteCorreo(cliente.user_mail)
  }

  const edit = () => {
    if (clienteNombre) {
      if (clienteApellido) {
        if (clienteCorreo) {
          db.transaction(tx => {
            tx.executeSql(
              'UPDATE table_user set user_name=?, user_lastname=? , user_mail=? where user_id=?',
              [clienteNombre, clienteApellido, clienteCorreo, param],
              (tx, results) => {
                console.log('Results', results.rowsAffected)
                if (results.rowsAffected > 0) {
                  console.log('Actualizado')
                } else {
                  alert('Error')
                }
              },
            )
          })
        }
      }
    }
    navigation.navigate('Listado')
  }

  //UI
  return (
    <>
      <View style={styles.viewInput}>
        <View>
          <Text style={styles.titulo}>Editar Cliente</Text>
        </View>

        <View style={styles.estiloForm}>
          <View>
            <Text style={styles.inputTitulo}> Nombre </Text>
            <TextInput
              placeholder='Introduzca su nombre'
              onChangeText={val => setclienteNombre(val)}
              value={clienteNombre}
            />
          </View>
          <View>
            <Text style={styles.inputTitulo}> Apellidos </Text>
            <TextInput
              placeholder='Introduzca sus apellidos'
              onChangeText={val => setclienteApellido(val)}
              value={clienteApellido}
            />
          </View>
          <View>
            <Text style={styles.inputTitulo}> Correo </Text>
            <TextInput
              placeholder='Introduzca su correo'
              onChangeText={val => setclienteCorreo(val)}
              value={clienteCorreo}
            />
          </View>
        </View>
      </View>

      <View style={styles.viewButtons}>
        <ButtonAdd
          onPress={() => {
            edit()
          }}>
          Editar Cliente
        </ButtonAdd>
        <ButtonAdd
          onPress={() => {
            fillData()
          }}>
          Cargar datos del cliente
        </ButtonAdd>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  titulo: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 35,
    marginTop: 25,
  },
  estiloForm: {
    padding: 25,
  },
  inputTitulo: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  inputBox: {
    fontSize: 15,
  },
  viewButtons: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1,
  },
  viewInput: {
    flex: 1,
  },
})

export default EditarCliente
