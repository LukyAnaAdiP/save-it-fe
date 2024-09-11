import React from 'react';
import { useEffect } from "react";
import { useContext } from "react";
import { useReducer } from 'react';
import { createContext } from 'react';
import axiosInstance from '../api/axiosInstance';

export const AuthenticationContext = createContext();

const initialState = {
  isLoggedIn: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'),
  user: localStorage.getItem('user'),
  roles: JSON.parse(localStorage.getItem('roles')) || [],
}

const authenticationReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        user: action.payload.user,
        roles: action.payload.roles
      }
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        user: null,
        roles: null
      }
    case 'REGISTER':
      return {
        ...state,
        isLoggedIn: false,
        user: action.payload.user
      }
    default:
      return state
  }
}

export const AuthenticationProvider = ({ children }) => {
  const [authenticationState, dispatch] = useReducer(authenticationReducer, initialState);

  const login = async (username, password) => {
    try {
      // console.log("Logging in with username:", username, "and password:", password);

      const response = await axiosInstance.post('auth/login', { username, password });
      const { data } = response.data;

      if (data) {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', username);
        localStorage.setItem('roles', JSON.stringify(data.roles));
        dispatch({
          type: 'LOGIN',
          payload: { token: data.token, user: username, roles: data.roles },
        });
      }
    } catch (error) {
      console.error("Login Failed: " + error);
      throw error;
    }
  }

  const register = async (username, email, password) => {
    try {
      await axiosInstance.post('auth/register', { username, email, password });
      dispatch({
        type: 'REGISTER',
        payload: { user: username },
      });
    } catch (error) {
      console.error("Registration Failed: " + error);
      throw error;
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('roles');
    dispatch({
      type: 'LOGOUT'
    });
  }

  return (
    <AuthenticationContext.Provider value={{ authenticationState, login, register, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  return useContext(AuthenticationContext);
}