import { StyleSheet, Text, View, Button } from 'react-native';
import React from "react";

export const AuthenticatedScreen = ({user, handleAuthentication}) => {
    return(
      <View style={styles.authContainer}>
        <Text style={styles.title}> WELCOME TO AUTHENTICATEDSCREEN! </Text>
        <Text style={styles.emailText}> {user.email} </Text>
        <Button title="Logout" color="#e74c3c" onPress={handleAuthentication} />
      </View>
    );
}

const styles = StyleSheet.create({
    authContainer: {
      width: '80%',
      maxWidth: 400,
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 8,
      elevation: 3,
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
      textAlign: 'center',
    },
    emailText: {
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 20,
    },
});