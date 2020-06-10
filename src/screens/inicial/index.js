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

const PrimeraPantalla: () => React$Node = ({navigation}) => {
  //cada una de las partes del objeto que guardo en State
  const [clienteNombre, setclienteNombre] = useState('')
  const [clienteApellido, setclienteApellido] = useState('')
  const [clienteCorreo, setclienteCorreo] = useState('')
  const [contador, setContador] = useState(1)

  //objeto final
  let clienteObjeto = {nombre: '', apellido: '', correo: '', id: ''}

  const navegarPantalla = () => {
    navigation.navigate('Listado')
  }

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length)
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', [])
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_lastname VARCHAR(20), user_mail VARCHAR(255))',
              [],
            )
          }
        },
      )
    })
  })

  const addCliente = () => {
    if (clienteNombre) {
      if (clienteApellido) {
        if (clienteCorreo) {
          db.transaction(function (tx) {
            tx.executeSql(
              'INSERT INTO table_user (user_name, user_lastname, user_mail) VALUES (?,?,?)',
              [clienteNombre, clienteApellido, clienteCorreo],
              (tx, results) => {
                console.log('Results', results.rowsAffected)
                if (results.rowsAffected > 0) {
                  console.log('Todo bien', results.rowsAffected)
                } else {
                  console.log('No esta todo bien', results.rowsAffected)
                }
              },
            )
          })
        }
      }
    }
    setclienteNombre('')
    setclienteApellido('')
    setclienteCorreo()
  }

  //UI
  return (
    <>
      <View style={styles.viewInput}>
        <View>
          <Text style={styles.titulo}>Insertar Cliente</Text>
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
            addCliente()
          }}>
          Añadir Cliente
        </ButtonAdd>

        <ButtonNavigate
          onPress={() => {
            navegarPantalla()
          }}>
          Ir a la pantalla de clientes
        </ButtonNavigate>
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

export default PrimeraPantalla
