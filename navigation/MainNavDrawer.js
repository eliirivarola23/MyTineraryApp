import { createDrawerNavigator } from '@react-navigation/drawer';
import { connect } from "react-redux";
import React from 'react'
import Cities from '../screens/Cities';
import SignIn from '../screens/SignIn';
import Home from '../screens/Home';
import City from '../screens/City';
import SignUp from '../screens/SignUp';
import LogOut from '../components/LogOut'
import usuariosActions from '../redux/action/usuariosActions';
import NavigatorStack from '../navigation/MainNavStack';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,Image
  } from "react-native";
const Drawer = createDrawerNavigator()


const Navigator = (props) => {
  useEffect(()=> {
    const mantenerSesion = async () => {
      let getToken = await AsyncStorage.getItem('token') 
      getToken && props.ingresar(getToken)
    }
    mantenerSesion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
    return (
       <Drawer.Navigator>
            {props.token && <Drawer.Screen name='Itinerary' component={Home} options={{drawerActiveTintColor: 'black',drawerActiveBackgroundColor: 'white', title: `¡Hi ${props.nombre}!`,drawerIcon:  () => <Image source={{uri: `${props.usuarioFoto }` }} style={{width:100, height:100, borderRadius:100 }}/>  }}/>}
           <Drawer.Screen name={'Home'} component={ Home}  options={{drawerActiveTintColor: 'black',drawerIcon:  () => <Image source={{uri: 'https://i.postimg.cc/t4bBGqy0/2971550.png'}} style={styles.icon}/>}} />
           <Drawer.Screen name='Cities' component={Cities} options={{drawerActiveTintColor: 'black', title: 'Cities', drawerIcon:  () => <Image source={{uri: 'https://i.postimg.cc/m2CmncvN/3364310.png'}} style={styles.icon}/>  }}/>
           
           {!props.token && 
               <>
               <Drawer.Screen name='SignIn' component={SignIn} options={{drawerActiveTintColor: 'black',title: 'Sign In',drawerIcon:  () => <Image source={{uri: 'https://i.postimg.cc/K8HwSKG9/1066646.png'}} style={styles.icon}/>}}/>
           <Drawer.Screen name='SignUp' component={SignUp} options={{drawerActiveTintColor: 'black',title: 'Sign Up',drawerIcon:  () => <Image source={{uri: 'https://i.postimg.cc/pTNSrgnz/1164576.png'}} style={styles.icon}/>}}/>
               </>
           } 
           {props.token && (<Drawer.Screen name='LogOut' component={LogOut} onPress={() => props.salir()} options={{ title: ' Log Out',drawerIcon:  () => <Image source={{uri: 'https://i.postimg.cc/7h1czmyh/5692197.png'}} style={styles.icon}/>}}/>
           ) }
           <Drawer.Screen  name=' ' component={City} options={{drawerActiveBackgroundColor: 'white',inactiveTintColor: 'white', drawerActiveTintColor: 'white'}}/>
          
       </Drawer.Navigator>
    )
}

const mapDispatchToProps =  {
    salir: usuariosActions.salir,
    ingresar: usuariosActions.ingresarLocalStorage
    };
const mapStateToProps = (state) => {
    return {
      token: state.usuarios.token,
      nombre: state.usuarios.nombre,
      usuarioFoto: state.usuarios.url_foto,
    };
  };

  const styles = StyleSheet.create({
      ruta: {
          opacity: 0,
          borderWidth:1
      },
      icon: {
        width: 40, 
        height: 40, 
        resizeMode: "center",
      }, 
      color: {
        backgroundColor: "#1d1d1d65",
      }
  })
  export default connect(mapStateToProps, mapDispatchToProps) (Navigator);



