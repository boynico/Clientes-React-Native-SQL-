import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const RowClient = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.buttonBody}>
            <Text
                style={styles.buttonText}>
                Nombre: {props.children[0]} {props.children[2]} {"\n"}
                Correo: {props.children[4]}

            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonBody: {
        backgroundColor: '#f76b2f',
        width: '85%',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        margin: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export { RowClient };