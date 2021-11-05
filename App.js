
import React from 'react';
import {applyMiddleware, createStore} from "redux" 
import {Provider} from "react-redux" 
import rootReducer from "./redux/reducer/rootReducer";
import thunk from "redux-thunk";
import { NavigationContainer} from '@react-navigation/native'
import Navigator from './navigation/MainNavStack';
import {LogBox} from 'react-native'
LogBox.ignoreAllLogs(true)

const myStore = createStore(rootReducer, applyMiddleware(thunk)) 
const App =() => {
  return (
    <>
    <Provider store={myStore}> 
    <NavigationContainer>
    <Navigator/>
    </NavigationContainer>
    </Provider>
    </>
  );
}


export default App

