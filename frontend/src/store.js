import React, { createContext, useContext} from "react";
import useReducerWithSideEffects, { UpdateWithSideEffect } from 'use-reducer-with-side-effects';
import { getStorageItem, setStorageItem } from "utils/useLocalStorage";


const AppContext = createContext();
const reducer= (prevState, action) => {
    const { type } = action;
    if (type === SET_TOKEN) {
        const { payload: jwtToken } = action;
        const newState = {
            ...prevState,
            jwtToken,
            IsAuthenticated: true
        };
       return UpdateWithSideEffect(newState, (state, dispatch)=>{
           setStorageItem("jwtToken", jwtToken);
       })
    }
    else if (type === DELETE_TOKEN) {
        const newState = {
            ...prevState,
            jwtToken: "",
            IsAuthenticated: false
        };
        return UpdateWithSideEffect(newState, (state, dispatch)=>{
            setStorageItem("jwtToken", "");
        })
    }
    return prevState;
};

export const AppProvider = ({ children }) => {
    const jwtToken = getStorageItem("jwtToken", "");
    const [ store, dispatch ] = useReducerWithSideEffects(reducer, {
        jwtToken,
        IsAuthenticated: jwtToken.length > 0
    });
    return (
        <AppContext.Provider value={{store, dispatch}}>
            {children}
        </AppContext.Provider>
    )
};

export const useAppContext = () => useContext(AppContext);

// Action
const SET_TOKEN = "APP/SET_TOKEN";
const DELETE_TOKEN = "APP/DELETE_TOKEN";

// Action Creators
export const setToken = token => ({
    type: SET_TOKEN, payload: token
});

export const deleteToken = () => ({
    type: DELETE_TOKEN
});