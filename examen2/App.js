// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "@firebase/auth";
import React from "react";
import { AuthScreen } from "./Components/AuthScreen";
import { AuthenticatedScreen } from "./Components/AuthenticatedScreen";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_zX5mgIlbVnngLi9cal5IlntzHHxJqd8",
  authDomain: "examenparcial2-c9e26.firebaseapp.com",
  projectId: "examenparcial2-c9e26",
  storageBucket: "examenparcial2-c9e26.appspot.com",
  messagingSenderId: "113016742827",
  appId: "1:113016742827:web:644b650d4df6d5be9328ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default function App(){

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [user, setUser] = React.useState('')
  const [isLogin, setIsLogin] = React.useState('')

  const auth = getAuth(app)

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    return () => unsubscribe()
  }, [auth])

  const handleAuthentication = async () => {
    try {
      if(user){
        console.log("User logged out successfully")
        await signOut(auth)
      }else{
        if(isLogin){
          await signInWithEmailAndPassword(auth, email, password)
          console.log("User signed in successfully")
        }else{
          await createUserWithEmailAndPassword(auth, email, password)
          console.log("User created successfully")
        }
      }
    } catch (error) {
      console.error("Authentication error: " + error.message)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
      ) : (
        <AuthScreen email={email} setEmail={setEmail} password={password} setPassword={setPassword} isLogin={isLogin} setIsLogin={setIsLogin} handleAuthentication={handleAuthentication} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#eaeaea',
  },
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
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});