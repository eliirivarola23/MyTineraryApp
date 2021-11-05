import React from 'react'
import { useEffect } from 'react';
import { connect } from "react-redux";
import usuariosActions from '../redux/action/usuariosActions';
import {
    View,
  } from "react-native";

const LogOut = (props) => {
    useEffect(() => {
        props.salir()
        props.navigation.jumpTo('Home')
    }, [])
    return (
        <View>
        </View>
    )
}


const mapDispatchToProps =  {
  salir: usuariosActions.salir
  };
  export default connect(null,mapDispatchToProps)(LogOut);


