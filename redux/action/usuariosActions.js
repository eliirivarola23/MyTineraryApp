import axios from "axios";

const usuariosActions = {
  registrarUsuario: (usuario) => {
    return async (dispatch, getState) => {
      let res = await axios.post("http://192.168.0.121:4000/api/usuarios", {
        ...usuario,
      });
      dispatch({ type: "USUARIO", payload: res.data.respuesta });
      return res
    };
  },
  ingresarCuenta: (usuario) => {
    return async (dispatch, getState) => {
      let res = await axios.post("http://192.168.0.121:4000/api/usuario/ingresar", {
        ...usuario,
      });
      dispatch({ type: "USUARIO", payload: res.data.respuesta });
      return res;
    };
  },

  salir: () => {
    return (dispatch) => {
      dispatch({ type: "CERRAR SESION" });
    };
  },
  ingresarLocalStorage: (token) => {
    return async (dispatch) => {
      try {
        let res = await axios.get("http://192.168.0.121:4000/api/verificarToken", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        dispatch({
          type: "USUARIO",
          payload: {
            token,
            nombre: res.data.nombre,
            url_foto: res.data.url_foto,
            _id: res.data._id, 
            apellido: res.data.apellido
          },
        });
      } catch (err) {
        return dispatch({ type: "CERRAR SESION" });
      }
    };
  },
  traerUsuario: (id) => {
    return async () => {
    try {
      let res = await axios.get(`http://192.168.0.121:4000/api/usuario/${id}`)
      return res
    }
    catch(e) {
      console.log(e)
    }
    }
  }
};

export default usuariosActions;
