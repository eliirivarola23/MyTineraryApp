import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Cities from '../screens/Cities';
import City from '../screens/City';
import SignIn from '../screens/SignIn';
import Home from '../screens/Home';
import SignUp from '../screens/SignUp';
import MainNavDrawer from './MainNavDrawer';
const navStack = createNativeStackNavigator()
const NavigatorStack = (props) => {
    return (
       <navStack.Navigator>
           <navStack.Screen name=' ' component={MainNavDrawer} options={{title: 'home', headerShown: false}}/>
           <navStack.Screen name='Cities' component={Cities} options={{title: 'Cities', headerShown: false}} />
           <navStack.Screen name='City' component={City} options={{title: 'City'}}/>
           {/* <navStack.Screen name='SignIn' component={SignIn} options={{title: 'Sign In', headerShown: false}}/>
           <navStack.Screen name='SignUp' component={SignUp} options={{title: 'Sign Up', headerShown: false}}/> */}
       </navStack.Navigator>
    )
}

export default NavigatorStack


