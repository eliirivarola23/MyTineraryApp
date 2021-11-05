const actividadesReducer = (state = {actividades : []}, action) => {
  switch (action.type) {
    case "OBTENER_ACTIVIDADES":
        return {
            ...state,
            actividades: action.payload
        }
    default:
      return state;
  }
};

export default actividadesReducer;