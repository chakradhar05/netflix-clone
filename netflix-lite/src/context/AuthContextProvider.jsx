import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth,db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged,updateProfile } from 'firebase/auth';
import {doc,setDoc} from 'firebase/firestore'
const AuthContext = createContext();

function AuthContextProvider({ children }) {

    const [user, setUser] = useState({});
    

    const handleProfileUpdate = async (photoURL,displayName=`${user?.email}`) => {
        try {
          
          if (user) {
            // Update user profile with display name and photo URL
            await updateProfile(user,{
              displayName: displayName || user.displayName,
              photoURL: photoURL || user.photoURL
            });
    
            window.alert('User profile updated successfully');
          } else {
            console.log('User is not signed in.');
          }
        } catch (error) {
         
          console.error('Error updating profile:', error);
        }
      };


    const logIn = (email,password) => {
        return signInWithEmailAndPassword(auth, email, password);

    }
    const signUp = (email,password) => {
        createUserWithEmailAndPassword(auth, email, password);
        setDoc(doc(db,"users",email),{
            savedShows : []
        })

    }
    const logOut = () => {

        return signOut(auth);


    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) setUser(authUser);
            else setUser(null);
        })
        return () => { unsubscribe(); }

    }, [])



    return (

        <AuthContext.Provider value={{ user, logIn, signUp, logOut,handleProfileUpdate }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider

export function userAuht() {
    return useContext(AuthContext);
}
