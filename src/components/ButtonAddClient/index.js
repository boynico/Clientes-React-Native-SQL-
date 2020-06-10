import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const ButtonAdd = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.buttonBody}>
            <Text
                style={styles.buttonText}>
                {props.children}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonBody: {
        backgroundColor: '#37adbf',
        width: '75%',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    }
});

export { ButtonAdd };