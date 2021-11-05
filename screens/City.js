import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import itinerariesAction from "../redux/action/itinerariesActions";
import ciudadesActions from "../redux/action/ciudadesActions";
import usuariosActions from "../redux/action/usuariosActions";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import Itinerary from "../components/Itinerary";

const City = (props) => {
  const [preLoader, setPreLoader] = useState(true);
  const BannerWidth = Dimensions.get("window").width;
  const BannerHeight = 350;
  useEffect(() => {
    const fetchearItinerarios = async () => {
      try {
        await props.fetchearItinerarios(props.route.params.id);
        await props.ingresar(props.token);
      } catch (e) {
       Alert.alert("There was a problem, try later")
      } finally {
        setPreLoader(!preLoader);
      }
    };
    fetchearItinerarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.usuarioId]);
  var itinerariosFiltrados = props.itinerarios.map((itinerario) => (
    <Itinerary
      itinerario={itinerario}
      key={itinerario._id}
      usuarioId={props.usuarioId}
      meGusta={itinerario.meGusta}
      comentarios={itinerario.comentarios}
    />
  ));
  const condicion = !itinerariosFiltrados.length ? (
    <View>
      <View
        style={{
          flex: 1,
          height: BannerHeight,
          marginVertical: 18,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Image
          source={require("../assets/hiroshima1.jpg")}
          style={{ width: "80%", height: 150, backgroundColor: "#1d1d1d65" }}
        />
        <Text style={styles.h2}>
          There are no itineraries yet for this city
        </Text>
      </View>
    </View>
  ) : (
    itinerariosFiltrados
  );
  return (
    <View
      style={{
        flex: 1,
        width: BannerWidth,
        backgroundColor: "white",
        justifyContent: "center",
        minHeight: 100
      }}
    >
      {preLoader ? (
        <ImageBackground
          source={{ uri: "https://i.postimg.cc/zfMhNQLL/Loading-1.gif" }}
          style={styles.preLoader}
        ></ImageBackground>
      ) : (
        <ImageBackground
          source={{ uri: props.route.params.foto }}
          style={styles.imageBackground}
        >
          <ScrollView>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                height: 350,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={styles.h2}>
                ¡Welcome to {props.route.params.nombreCiudad}!
              </Text>
            </View>
            {condicion}
          </ScrollView> 
        </ImageBackground>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preLoader: {
    minWidth: 200,
    minHeight: 500,
  },
  imageBackground: {
    minWidth: 300,
    height: 900,
    alignItems: "center",
    justifyContent: "center",
  },

  h1: {
    color: "white",
    fontSize: 40,
    opacity: 0.5,
    fontWeight: "bold",
    padding: 10,
  },
  h2: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  h3: {
    color: "white",
    fontWeight: "bold",
    fontSize: 50,
    position: "absolute",
    zIndex: 10,
    left: 100,
  },
  p: {
    width: "90%",
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    textShadowColor: "black",
    marginVertical: 10,
    textAlign: "center",
    paddingVertical: 10,
  },

  pInfo: {
    color: "white",
    width: "90%",
    marginVertical: 10,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  pFooter: {
    color: "white",
    fontSize: 20,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    height: 400,
    width: 400,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
    width: "100%",
  },
  price: {
    width: "90%",
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
    // backgroundColor: "#383838",
    textShadowColor: "black",
    marginVertical: 10,
    textAlign: "center",
    paddingVertical: 10,
  },
});
const mapStateToProps = (state) => {
  return {
    itinerarios: state.todosItinerarios.itinerarios,
    ciudades: state.todasCiudades.ciudades,
    usuarioId: state.usuarios._id,
    token: state.usuarios.token,
  };
};
const mapDispatchToProps = {
  fetchearItinerarios: itinerariesAction.obtenerItinerarios,
  fetchearCiudades: ciudadesActions.obtenerCiudades,
  ingresar: usuariosActions.ingresarLocalStorage,
};
export default connect(mapStateToProps, mapDispatchToProps)(City);
