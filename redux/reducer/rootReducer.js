import { combineReducers } from "redux";
import actividadesReducer from "./actividadesReducer";
import citiesReducer from "./citiesReducer";
import itinerariesReducer from "./itinerariesReducer";
import usuariosReducer from "./usuariosReducer"
const rootReducer = combineReducers({
  todasCiudades: citiesReducer,
  todosItinerarios: itinerariesReducer,
  usuarios: usuariosReducer,
  actividades: actividadesReducer
});

export default rootReducer;
