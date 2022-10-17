import React, { createContext, useState } from 'react';
import {applyActionCode, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import App from '../firebase/firebase.config';


export const AuthContext = createContext();

const auth = getAuth(App)

const UserContext = ({children}) => {

    const [user, setUser] = useState(null);


    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth);
    }

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    
    const authInfo = {user, createUser, signIn, logOut}

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default UserContext;