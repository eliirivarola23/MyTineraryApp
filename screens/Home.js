import React from "react";
import Footer from "../components/Footer";
import Carousel from "react-native-banner-carousel";
import { connect } from "react-redux";
import { useEffect } from "react";
import ciudadesActions from "../redux/action/ciudadesActions";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Button,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const Home = (props) => {
  const BannerWidth = Dimensions.get("window").width;
  const BannerHeight = 350;
  useEffect(() => {
    async function fetchearCiudades() {
      try {
        let res = await props.fetchearCiudades();
      } catch (e) {
        console.log(e);
      }
    }
    fetchearCiudades();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: "https://i.postimg.cc/4yFwppwH/fondo3.jpg" }}
        style={styles.imageBackground}
      >
        <ScrollView>
          <View
            style={{
              width: BannerWidth,
              height: 500,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 8,
              paddingVertical: 140,
            }}
          >
            <Text style={styles.h2}>私 の 旅 程</Text>
            <Text style={styles.h1}>M Y T I N E R A R Y</Text>
            <Text style={styles.p}>
              FIND YOUR PERFECT TRIP, DESIGNED BY INSIDERS WHO KNOW AND LOVE
              THEIR CITIES
            </Text>
            <TouchableOpacity>
              <View
                style={{
                  padding: 4,
                  margin: 10,
                  backgroundColor: "white",
                  borderRadius: 100,
                  minHeight: 50,
                  width: 180,
                }}
              >
                <Text
                  style={styles.button}
                  onPress={() => {
                    props.navigation.navigate("Cities");
                  }}
                >
                  Click Here
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: BannerWidth,
              alignItems: "center",
              marginBottom: 50,
            }}
          >
            <Text style={styles.pInfo}>
              The application that gives you all the information about your trip
              in just one place: travel itineraries, information about
              activities and services so that you arrive at your destination
              100% prepared.
            </Text>
            <Image
              source={require("../assets/info.png")}
              style={{ width: 300, height: 300 }}
            />
            <Image
              source={require("../assets/info2.png")}
              style={{ width: 300, height: 300 }}
            />
            <Image
              source={require("../assets/info3.png")}
              style={{ width: 300, height: 300 }}
            />
            <Text style={styles.h2}>POPULAR MYTINERARIES</Text>
            <View style={{ height: 350, marginVertical: 20 }}>
              <Carousel
                autoplay
                autoplayTimeout={5000}
                loop
                index={0}
                pageSize={BannerWidth}
              >
                {props.ciudades.map((ciudad) => (
                  <View key={ciudad._id}>
                    <ImageBackground
                      style={{ minWidth: BannerWidth, height: 350 }}
                      source={{ uri: ciudad.imagen }}
                      resizeMode="cover"
                    >
                      <Text style={styles.h1}>{ciudad.caption}</Text>
                    </ImageBackground>
                  </View>
                ))}
              </Carousel>
            </View>

            <Footer />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
const mapDispatchToProps = {
  fetchearCiudades: ciudadesActions.obtenerCiudades,
};
const mapStateToProps = (state) => {
  return {
    ciudades: state.todasCiudades.ciudades,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    minWidth: 300,
    minHeight: 200,
    alignItems: "center",
    justifyContent: "center",
  },

  h1: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    padding: 10,
  },
  h2: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  p: {
    width: "80%",
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
    textShadowColor: "black",
    marginVertical: 10,
    textAlign: "center",
  },
  button: {
    borderRadius: 100,
    padding: 10,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
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
});
