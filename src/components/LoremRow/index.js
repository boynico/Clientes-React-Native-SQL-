import React from 'react'
import {Text, StyleSheet, TouchableOpacity, View, Button} from 'react-native'

const LoremRow = props => {
  return (
    <>
      <View>
        <Text style={styles.textoPrincipal}>
          adipiscing elit donec aenean facilisis,
        </Text>
        <Text>by John Atler</Text>
      </View>
      <View>
        <View style={styles.contenedorBotones}>
          <View style={styles.estiloBoton}>
            <Button title='LABEL 3' color='#111111' />
          </View>
          <View style={styles.estiloBoton}>
            <Button title='LABEL 4' color='#111111' />
          </View>
        </View>

        <Text>15 comentarios</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  textoPrincipal: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
  },
  contenedorBotones: {
    width: 200,
    marginTop: 25,
    flexDirection: 'row',
  },
  estiloBoton: {
      width: 90,
      marginRight: 5,
  },
})

export {LoremRow}
