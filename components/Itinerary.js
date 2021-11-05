import { connect } from "react-redux";
import itinerariesAction from "../redux/action/itinerariesActions";
import actividadesActions from "../redux/action/actividadesActions";
import React from "react";
import Carousel from "react-native-banner-carousel";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableHighlight,
  Keyboard,
  Alert,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const Itinerary = (props) => {
  const BannerWidth = Dimensions.get("window").width;
  const BannerHeight = 350;
  const {
    itinerario,
    comentarios,
    meGusta,
    fetchearComentarios,
    fetchearMeGusta,
    token,
    usuarioId,
    url_foto,
    nombre,
  } = props;
  const [todosMeGusta, setTodosMeGusta] = useState(meGusta);
  const [activity, setActivity] = useState(false);
  const [comentario, setComentario] = useState("");
  const [arrayComentarios, setArrayComentarios] = useState(comentarios);
  const [actividades, setActividades] = useState([]);
  useEffect(() => {
    const fetchearActividades = async () => {
      try {
        let res = await props.fetchearActividades(itinerario._id);
        setActividades(res[0].actividades);
      } catch (e) {
        Alert.alert("There was a problem, try later");
      }
    };
    fetchearActividades();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity]);

  var enviarComentario = async () => {
    if (!token) {
      Alert.alert("Login to comment");
    } else {
      if (!comentario) {
        Alert.alert("Comment cannot be empty");
        return false;
      }
      try {
        let res = await fetchearComentarios(
          itinerario._id,
          {
            comentarios: {
              comentario: comentario,
              usuarioId: usuarioId,
              usuarioFoto: url_foto,
              usuarioNombre: nombre,
            },
          },
          token
        );
        if (res.success) {
          let nuevoComentario = {
            usuarioId,
            usuarioFoto: url_foto,
            usuarioNombre: nombre,
            comentario,
          };
          setArrayComentarios([...arrayComentarios, nuevoComentario]);
          Alert.alert("Comment created successfully");
          window.scrollTo(0,0)
        }
      } catch (e) {
        Alert.alert("There was a problem, try later");
      }
    }
  };

  var darMeGusta = async () => {
    if (!token) {
      Alert.alert("Login to like");
    } else {
      try {
        let res = await fetchearMeGusta(
          itinerario._id,
          { usuarioId: usuarioId },
          token
        );
        if (res.data.success) {
          setTodosMeGusta(res.data.respuesta, ...meGusta);
        }
      } catch (e) {
        Alert.alert("There was a problem, try later");
      }
    }
  };
  var pintadoCorazon = todosMeGusta.includes(usuarioId)
    ? "https://i.postimg.cc/HLZ8G6tM/corazon.png"
    : "https://i.postimg.cc/pLvFKhTm/heart.png";

  let todosPrecios = [];
  for (let i = 0; i < itinerario.precio; i++) {
    todosPrecios.push(
      <Image
        key={`box-${i}`}
        source={{ uri: "https://i.postimg.cc/WpGV9tQJ/893097.png" }}
        style={{ width: 35, height: 35, margin: 10 }}
      />
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ width: BannerWidth }}>
        <View
          style={{ width: BannerWidth, alignItems: "center", marginBottom: 50 }}
        >
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              minHeight: 150,
              width: BannerWidth,
              margin: 10,
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "#000000ee",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                width: BannerWidth,
                padding: 20,
              }}
            >
              <Text style={styles.p}>{itinerario.creador[0].nombre}</Text>
              <Image
                source={{ uri: itinerario.creador[0].foto }}
                style={{
                  width: 100,
                  height: 100,
                  borderWidth: 1,
                  borderRadius: 400,
                  resizeMode: "cover",
                }}
              />
            </View>

            <View
              style={{
                flex: 1,
                borderWidth: 0.5,
                minHeight: 150,
                width: "100%",
                margin: 10,
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  width: "10%",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  paddingVertical: 10,
                }}
              >
                <TouchableHighlight onPress={darMeGusta}>
                  <Image
                    source={{ uri: pintadoCorazon }}
                    style={{ width: 50, height: 50 }}
                  />
                </TouchableHighlight>
                <Text style={styles.pInfo}>
                  {(token && todosMeGusta.length) || meGusta.length}
                </Text>
              </View>
              <Text style={styles.pInfo}>{itinerario.titulo} </Text>
              <Image
                source={require("../assets/hiroshima1.jpg")}
                style={{
                  width: "100%",
                  height: 150,
                  borderWidth: 1,
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                minHeight: 150,
                width: "100%",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Text style={styles.p}>{itinerario.descripcion} </Text>
              <Text style={styles.p}>
                {itinerario.numeral.forEach((numeral) => `#${numeral} `)}
              </Text>
              <Text style={styles.price}>
                Price: {todosPrecios}{" "}
                <Image
                  source={{ uri: "https://i.postimg.cc/g2qGnjKW/2784399.png" }}
                  style={{ width: 30, height: 30, margin: 10 }}
                />{" "}
                {itinerario.duracion} hs
              </Text>
            </View>
            <TouchableOpacity>
              <View
                style={{
                  paddingVertical: 10,
                  margin: 10,
                  backgroundColor: "white",
                  borderRadius: 100,
                  minHeight: 50,
                  width: 180,
                }}
              >
                <Text
                  style={styles.button}
                  onPress={() => setActivity(!activity)}
                >
                  {!activity ? "View More" : "View Less"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {activity && (
          <>
            <Carousel
              autoplay
              autoplayTimeout={5000}
              loop
              index={0}
              pageSize={BannerWidth}
            >
              {actividades.map((actividad, index) => (
                <View  key={index}>
                  <ImageBackground
                    style={{ minWidth: BannerWidth, height: BannerHeight }}
                    source={{ uri: actividad.foto }}
                    resizeMode="cover"
                  >
                    <Text style={styles.p}>{actividad.titulo}</Text>
                  </ImageBackground>
                </View>
              ))}
            </Carousel>
            <View
              style={{
                flex: 1,
                minHeight: BannerHeight,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#000000ee",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "90%",
                  padding: 10,
                }}
              >
                <Text style={styles.h2}>Comments</Text>
              </View>

              <View style={{ flex: 1, width: "90%" }}>
                <View style={{ height: BannerHeight }}>
                  <ScrollView>
                    {!arrayComentarios.length ? (
                      <Text
                        style={{
                          textAlign: "center",
                          color: "white",
                          fontSize: 20,
                          padding: "20%",
                        }}
                      >
                        There are no comments yet. Write one! 😊
                      </Text>
                    ) : (
                      arrayComentarios.map((comentario, index) => (
                        <View style={{ flex: 1, padding: 4 }} key={index}>
                          <View
                            style={{
                              minWidth: 100,
                              flexDirection: "row",
                              padding: 4,
                            }}
                          >
                            <Image
                              source={{ uri: comentario.usuarioFoto }}
                              style={{
                                width: 60,
                                height: 60,
                                borderRadius: 100,
                              }}
                            />
                            <Text style={styles.pNombre}>
                              {comentario.usuarioNombre}
                            </Text>
                          </View>
                          <Text style={styles.pComentario}>
                            {comentario.comentario}
                          </Text>
                        </View>
                      ))
                    )}
                  </ScrollView>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                width: "100%",
                minHeight: 100,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "black",
                marginBottom: 100,
                paddingVertical: 20,
              }}
            >
              <TextInput
                style={styles.input}
                placeholder={token ? "Write Comment" : "log in to comment"}
                editable={token ? true : false}
                placeholderTextColor="white"
                onChange={(e) => setComentario(e.nativeEvent.text)}
              />
              <TouchableOpacity>
                <View
                  style={{
                    width: 150,
                    height: 50,
                    backgroundColor: "white",
                    padding: 4,
                    borderRadius: 100,
                  }}
                >
                  <Text style={styles.button} onPress={enviarComentario}>
                    Submit
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.usuarios.token,
    usuarioId: state.usuarios._id,
    url_foto: state.usuarios.url_foto,
    nombre: state.usuarios.nombre,
  };
};
const mapDispatchToProps = {
  fetchearComentarios: itinerariesAction.crearComentario,
  fetchearMeGusta: itinerariesAction.meGusta,
  fetchearActividades: actividadesActions.obtenerActividades,
};
export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    borderRadius: 100,
    padding: 10,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  alert: {
    width: "90%",
    fontSize: 30,
    fontWeight: "bold",
    fontSize: 25,
    color: "red",
    textAlign: "center",
  },
  imageBackground: {
    minWidth: 300,
    height: 900,
    alignItems: "center",
    justifyContent: "center",
  },
  containCities: {
    width: "80%",
    alignItems: "center",
    borderRadius: 100,
    position: "absolute",
    backgroundColor: "black",
    height: 100,
    zIndex: 1,
    top: "10%",
  },
  input: {
    height: 60,
    width: "90%",
    borderColor: "white",
    paddingHorizontal: 10,
    marginVertical: 10,
    color: "white",
    fontSize: 30,
    backgroundColor: "black",
    borderBottomColor: "black",
    borderRadius: 200,
    borderBottomWidth: 1,
    borderBottomColor: "white",
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
    width: "100%",
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
    width: "80%",
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    textShadowColor: "black",
    marginVertical: 10,
    textAlign: "center",
    paddingVertical: 10,
  },
  pNombre: {
    width: "80%",
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    textShadowColor: "black",
    margin: 8,
    paddingVertical: 10,
  },
  pComentario: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
    textShadowColor: "white",
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 100,
    backgroundColor: "white",
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
    width: 50,
    height: 65,
    borderRadius: 200,
    borderWidth: 1,
    alignItems: "center",
    marginHorizontal: 5,
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
    fontSize: 20,
    color: "white",
    textShadowColor: "black",
    marginVertical: 10,
    textAlign: "center",
    paddingVertical: 10,
  },
});
