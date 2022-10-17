import React, { createContext, useEffect, useState } from 'react';
import {applyActionCode, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import App from '../firebase/firebase.config';


export const AuthContext = createContext();

const auth = getAuth(App)

const UserContext = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect( () => {
        const unSubscribe = onAuthStateChanged( auth, currentUser => {
            console.log('currect user : ', currentUser)
            setUser(currentUser)
            setLoading(false)
        })

        return () => unSubscribe();

    } , [])

    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    
    const authInfo = {user, loading, createUser, signIn, logOut}

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default UserContext;