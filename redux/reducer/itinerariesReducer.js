const ItinerariesReducer = (state = { itinerarios: [] }, action) => {
  switch (action.type) {
    case "OBTENER_ITINERARIOS":
      return {
        ...state,
        itinerarios: action.payload,
      };
    default:
      return state;
  }
};

export default ItinerariesReducer;
