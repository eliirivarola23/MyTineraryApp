import axios from "axios";

const actividadesActions = {
  obtenerActividades: (id) => {
    return async () => {
      try {
        let res = await axios.get(
          `http://192.168.0.121:4000/api/actividades/${id}`
        );
        return res.data.respuesta

      } catch (e) {
        console.log(e);
      }
    };
  },
};

export default actividadesActions;
