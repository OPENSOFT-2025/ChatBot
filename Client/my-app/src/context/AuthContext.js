"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, TwitterAuthProvider  } from "firebase/auth";
import { auth } from "../firebase/conifg.js"
const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const provider = new TwitterAuthProvider();
    const [user, setUser] = useState();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
        return () => unsubscribe();
    }, [user])
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
    }
    const signInWithTwitter = async () => {
        const provider = new TwitterAuthProvider();
        await signInWithPopup(auth, provider);
    };
    const logOut = () => {
        signOut(auth);
    }


    return (
        <AuthContext.Provider value={{ user, signInWithTwitter, googleSignIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}


export const UsersAuth = () => {
    return useContext(AuthContext)
}






