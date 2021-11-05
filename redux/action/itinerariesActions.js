import axios from "axios";

const itinerariesAction = {
  obtenerItinerarios: (id) => {
    return async (dispatch, getState) => {
      let res = await axios.get(`http://192.168.0.121:4000/api/itineraries/${id}`);
      let info = res.data.respuesta;
      dispatch({ type: "OBTENER_ITINERARIOS", payload: info });
      return res.data.respuesta
    };
  },
  meGusta: (id,usuarioId,token) => {
    return async () => {
     try {
      let res = await axios.put(`http://192.168.0.121:4000/api/itinerary/meGusta/${id}`, {usuarioId},
       {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      return res
     } catch(e) { console.log(e)}
    }
  }, 
  crearComentario: (id,comentario,token) => {
    return async () => {
      try {
        let res = await axios.put(`http://192.168.0.121:4000/api/itinerary/comentario/${id}`, {...comentario},
        {
          headers: {
            Authorization: "Bearer " + token,
          }
        })
        
        return res.data
      }
      catch(e) {console.log(e)
      }
    }
  },
  borrarComentario: (id,comentario) => {
    return async () => {
      try{
        let res = await axios.put(`http://192.168.0.121:4000/api/itinerary/comentario/${id}`,{comentario},
        // {
        //   headers: {
        //     Authorization: "Bearer " + token,
        //   }
        // }
        )
        return res
      } catch(e) {console.log(e)
      }
    }
  }
};

export default itinerariesAction;
