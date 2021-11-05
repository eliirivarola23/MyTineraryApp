const citiesReducer = (
  state = { ciudades: [], ciudadFiltrada: [] },
  action
) => {
  switch (action.type) {
    case "OBTENER_CIUDADES":
      return {
        ...state,
        ciudades: action.payload,
        ciudadFiltrada: action.payload,
      };
    case "FILTRAR_CIUDADES":
      let filtrado = state.ciudades.filter(
        (ciudad) =>
          ciudad.caption.toLowerCase().startsWith(action.payload) && ciudad
      );
      return {
        ...state,
        ciudadFiltrada: filtrado,
      };
    default:
      return state;
  }
};

export default citiesReducer;
