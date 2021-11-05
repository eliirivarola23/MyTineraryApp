import AsyncStorage from '@react-native-async-storage/async-storage';
const usuariosReducer = (
  state = { token: null, nombre: null,apellido: null, url_foto: null, _id: null  },
  action
) => {
  switch (action.type) {
    case "USUARIO":
      AsyncStorage.setItem("token", action.payload.token);
      return {
        token: action.payload.token,
        nombre: action.payload.nombre,
        url_foto: action.payload.url_foto,
        _id: action.payload._id, 
        apellido: action.payload.apellido
      };
    case "CERRAR SESION":
      AsyncStorage.removeItem("token");
      return {
        token: null,
        nombre: null,
        url_foto: null,
        _id: null, 
        apellido: null
      };
    default:
      return state;
  }
};

export default usuariosReducer;
