import React from "react";
import { connect } from "react-redux";
import usuariosActions from "../redux/action/usuariosActions";
import { useState } from "react";
import Footer from "../components/Footer";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Button,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";

const SignIn = (props) => {
  const [usuario, setUsuario] = useState({ email: "", password: "" });
  const usuarioAVerificar = async () => {
    if (Object.values(usuario).includes('')) {
      Alert.alert("All fields are required");
      return false;
    } else {
      try {
        let res = await props.ingresarCuenta(usuario);
        if (!res.data.success) {
          if (res.data.respuesta) {
            Alert.alert(res.data.respuesta);
          } else {
            Alert.alert("Incorrect username or password");
          }
        } else {
          Alert.alert("Welcome back!");
          props.navigation.jumpTo("Home");
        }
      } catch (e) {
        Alert.alert("There was a problem, try later");
      }
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: "https://i.postimg.cc/66Vsmxr1/itsukushima.jpg" }}
          style={styles.imageBackground}
        >
          <ScrollView>
            <View style={styles.sign}>
              <Text style={styles.h2}>Log in to your account</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor="white"
                placeholder="E-mail"
                name="email"
                onChange={(e) =>
                  setUsuario({ ...usuario, email: e.nativeEvent.text })
                }
              />
              <TextInput
                style={styles.input}
                placeholderTextColor="white"
                placeholder="Password"
                secureTextEntry={true}
                name="password"
                onChange={(e) =>
                  setUsuario({ ...usuario, password: e.nativeEvent.text })
                }
              />
              <View title="Submit"  style={{
                  padding: 4,
                  margin: 10,
                  backgroundColor: "white",
                  borderRadius: 100,
                  minHeight: 20,
                  width: 180,
                }}>
                  <Text style={styles.button} onPress={usuarioAVerificar}>
                    Submit
                  </Text>
                </View>
              <Text
                style={styles.p}
                onPress={() => {
                  props.navigation.navigate("SignUp");
                }}
              >
                UpYou do not have an account? Sign Up here!
              </Text>
            </View>
            <Footer />
          </ScrollView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const mapDispatchToProps = {
  ingresarCuenta: usuariosActions.ingresarCuenta,
};
export default connect(null, mapDispatchToProps)(SignIn);

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
  input: {
    height: 50,
    width: "90%",
    borderColor: "white",
    padding: 5,
    marginVertical: 10,
    color: "white",
    fontSize: 30,
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  sign: {
    width: 460,
    height: 680,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    paddingVertical: 0,
    backgroundColor: "#1d1d1d65",
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
});
