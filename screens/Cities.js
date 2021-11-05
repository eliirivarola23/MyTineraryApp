import { connect } from "react-redux";
import ciudadesActions from "../redux/action/ciudadesActions";
import React from "react";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TextInput,
  Dimensions,
  Alert
} from "react-native";
import Footer from "../components/Footer";

const Cities = (props) => {
  const [preLoader, setPreLoader] = useState(true);
  const BannerWidth = Dimensions.get("window").width;
  const BannerHeight = 350;
  useEffect(() => {
    async function fetchearCiudades() {
      try {
        await props.fetchearCiudades();
      } catch (e) {
        Alert.alert("There was a problem, try later");
      } finally {
        setPreLoader(!preLoader);
      }
    }
    fetchearCiudades();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allCities = props.ciudadesFiltradas.map((ciudad) => (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        borderWidth: 1,
        height: 350,
        marginVertical: 18,
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
      }}
      key={ciudad._id}
    >
      <ImageBackground
        source={{ uri: ciudad.imagen }}
        resizeMode="cover"
        style={{ width: "100%", height: BannerHeight }}
      >
        <Text
          style={styles.text}
          onPress={() => {
            props.navigation.navigate("City", {
              id: ciudad._id,
              nombreCiudad: ciudad.caption,
              foto: ciudad.imagen
            });
          }}
        >
          {ciudad.caption}
        </Text>
      </ImageBackground>
    </View>
  ));

  const mensaje = (
    <View
      style={{
        flex: 1,
        height: BannerHeight,
        marginVertical: 18,
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
      }}
     
    >
        <Text
          style={{fontSize: 20, backgroundColor: 'black', color: 'white', marginVertical: 40,}}
        >   Oops! There are no matches with your search. Try another city</Text>
    </View>
  );

  const ciudadesAMostrar = !allCities.length ? mensaje : allCities;
  return (
    <View
      style={{
        flex: 1,
        width: BannerWidth,
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >
      { preLoader ? <ImageBackground source={{uri: 'https://i.postimg.cc/zfMhNQLL/Loading-1.gif'}}  style={styles.preLoader}></ImageBackground> :
      <ImageBackground
        source={{ uri: "https://i.postimg.cc/66Vsmxr1/itsukushima.jpg" }}
        style={styles.imageBackground}
      >
        <ScrollView>
          <View
            style={{
              width: BannerWidth,
              height: BannerHeight,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 0,
            }}
          >
            <Text style={styles.h2}>Find your next adventure</Text>
            <TextInput
              style={{
                height: 80,
                width: "90%",
                borderColor: "white",
                borderWidth: 1,
                padding: 10,
                marginVertical: 10,
                color: "white",
                fontSize: 30,
                backgroundColor: "#1d1d1d65",
              }}
              onChange={(e) =>
                props.filtroCiudades(e.nativeEvent.text.toLowerCase().trim())
              }
              placeholder="Search City"
              placeholderTextColor="white"
            />
          </View>
          <View
            style={{
              width: BannerWidth,
              alignItems: "center",
              backgroundColor: "#1d1d1d65",
              justifyContent: "center",
            }}
          >
            {ciudadesAMostrar}
            <Footer/>
          </View>
        </ScrollView>
      </ImageBackground>
      }
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    minWidth: 300,
    height: 900,
    alignItems: "center",
    justifyContent: "center",
  },
  preLoader: {
    minWidth: 200,
    minHeight: 500,
  },
  containCities: {
    alignItems: "center",
    marginBottom: 50,
    borderWidth: 1,
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
    color: 'black'
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
  button: {
    borderRadius: 100,
    padding: 10,
    width: "100",
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
  },
});
const mapDispatchToProps = {
  fetchearCiudades: ciudadesActions.obtenerCiudades,
  filtroCiudades: ciudadesActions.ciudadAFiltrar,
};
const mapStateToProps = (state) => {
  return {
    ciudades: state.todasCiudades.ciudades,
    ciudadesFiltradas: state.todasCiudades.ciudadFiltrada,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cities);
