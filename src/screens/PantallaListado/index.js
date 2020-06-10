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
import {openDatabase} from 'react-native-sqlite-storage'
var db = openDatabase({name: 'UserDatabase.db'})

const PantallaListado: () => React$Node = ({navigation}) => {
  const abrirCliente = userid => {
    console.log('Llego')
    console.log(userid)
    navigation.navigate('Detalle', {param: userid})
  }

  const [listaClientes, setlistaClientes] = useState([])
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        var temp = []
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i))
        }
        setlistaClientes(temp)
      })
    })
  })

  //UI
  return (
    <View>
      <FlatList
        data={listaClientes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              abrirCliente(item.user_id)
            }}>
            <View key={item.user_id} style={styles.rowClientes}>
              <View style={styles.labels}>
                <Text style={styles.labelsText}>Nombre</Text>
                <Text style={styles.labelsText}>Apellidos</Text>
                <Text style={styles.labelsText}>Correo</Text>
                <Text style={styles.labelsText}>Id</Text>
              </View>
              <View style={styles.datos}>
                <Text style={styles.labelsText}>{item.user_name}</Text>
                <Text style={styles.labelsText}>{item.user_lastname}</Text>
                <Text style={styles.labelsText}>{item.user_mail}</Text>
                <Text style={styles.labelsText}>{item.user_id}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  rowClientes: {
    backgroundColor: 'white',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labels: {
    flex: 1,
    alignSelf: 'center',
  },
  datos: {
    flex: 2,
    alignSelf: 'center',
    alignItems: 'center',
  },
  labelsText: {
    fontSize: 20,
  },
})

export default PantallaListado
