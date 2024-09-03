/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react"

const AuthContext = createContext()

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

const types = {
    login: "login",
    logout: "logout",
    addError: "addError",
}

const initialState = {
    user: null,
    isAuthenticated: false,
    error: null
}

const reducer = (state, action) => {
    const { type, payload } = action
    switch(type){
        case types.login:
            return {...state, user: payload, isAuthenticated: true, error: null}
        case types.logout:
            return {...state, user: null, isAuthenticated: false}
        case types.addError:
            return {...state, error: payload}
        default:
            new Error(`Invalid reducer action: ${action}`)
    }
}

function AuthProvider( { children } ){
    
    const [{ user, isAuthenticated, error }, dispatch] = useReducer(reducer, initialState)

    const login = (email, password) => {
        console.log(`Logging in: ${email}, ${password}`);
        if(email == FAKE_USER.email && password == FAKE_USER.password){
            console.log('Authenticated')
            dispatch({ type: types.login, payload: FAKE_USER })
        }
        else{
            dispatch( { type: types.addError, payload: 'Invalid Email/Password'} )
        }
    }

    const logout = () => {
        dispatch({ type: types.logout })
    }

    return <AuthContext.Provider value={{
        login,
        logout,
        user,
        isAuthenticated,
        error
    }}>
        {children}
    </AuthContext.Provider>
}

const useAuth = () => {
    const auth = useContext(AuthContext)

    if(!auth){
        throw new Error("AuthContext is used outside of its scope")
    }

    return auth
}

export { AuthProvider, useAuth}