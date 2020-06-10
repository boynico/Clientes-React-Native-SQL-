import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const ButtonNavigate = (props) => {
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
        backgroundColor: '#519ba6',
        width: '75%',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    }
});

export { ButtonNavigate };