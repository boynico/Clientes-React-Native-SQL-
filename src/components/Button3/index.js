import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const ButtonType = (props) => {
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
        backgroundColor: '#f28774',
        width: '40%',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    }
});

export { ButtonType };