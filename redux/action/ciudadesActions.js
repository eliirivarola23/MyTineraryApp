import axios from "axios";

const ciudadesActions = {
  obtenerCiudades: () => {
    return async (dispatch) => {
      let res = await axios.get("http://192.168.0.121:4000/api/cities");
      dispatch({ type: "OBTENER_CIUDADES", payload: res.data.respuesta });
      return res.data
    };
  },
  ciudadAFiltrar: (ciudadBuscada) => {
    return (dispatch, getState) => {
      dispatch({ type: "FILTRAR_CIUDADES", payload: ciudadBuscada });
    };
  },
};

export default ciudadesActions;
