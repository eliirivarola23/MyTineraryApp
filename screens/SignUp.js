import { connect } from "react-redux";
import usuariosActions from "../redux/action/usuariosActions";
import React from "react";
import { useState } from "react";
import Footer from "../components/Footer";
import SelectDropdown from "react-native-select-dropdown";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Button,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

const SignUp = (props) => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    url_foto: "",
    pais: "",
  });
  const registarUsuario = async () => {
    if (Object.values(usuario).includes("")) {
      Alert.alert("All fields are required");
      return false;
    } else {
      try {
        let respuesta = await props.registarUsuario(usuario);
        if (!respuesta.data.success) {
          respuesta.data.respuesta[0].message
            ? Alert.alert(respuesta.data.respuesta[0].message)
            : Alert.alert(respuesta.data.respuesta);
        }
        if(respuesta.data.success) {
          Alert.alert("Registered user successfully");
          props.navigation.jumpTo("Home");
        } 
      } catch (e) {
        Alert.alert("There was a problem, try later");
      }
    }
  };
  const paises = [
    "Afganistán",
    "Albania",
    "Alemania",
    "Andorra",
    "Angola",
    "Antigua y Barbuda",
    "Arabia Saudita",
    "Argelia",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaiyán",
    "Bahamas",
    "Bangladés",
    "Barbados",
    "Baréin",
    "Bélgica",
    "Belice",
    "Benín",
    "Bielorrusia",
    "Birmania",
    "Bolivia",
    "Bosnia y Herzegovina",
    "Botsuana",
    "Brasil",
    "Brunéi",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Bután",
    "Cabo Verde",
    "Camboya",
    "Camerún",
    "Canadá",
    "Catar",
    "Chad",
    "Chile",
    "China",
    "Chipre",
    "Ciudad del Vaticano",
    "Colombia",
    "Comoras",
    "Corea del Norte",
    "Corea del Sur",
    "Costa de Marfil",
    "Costa Rica",
    "Croacia",
    "Cuba",
    "Dinamarca",
    "Dominica",
    "Ecuador",
    "Egipto",
    "El Salvador",
    "Emiratos Árabes Unidos",
    "Eritrea",
    "Eslovaquia",
  ];
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: "https://i.postimg.cc/66Vsmxr1/itsukushima.jpg" }}
          style={styles.imageBackground}
        >
          <ScrollView>
            <View style={styles.sign}>
              <Text style={styles.h2}>Create Account!</Text>
              <Text style={styles.p}> Please fill the details to Sign Up!</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor="white"
                placeholder="First Name"
                name="nombre"
                onChange={(e) =>
                  setUsuario({ ...usuario, nombre: e.nativeEvent.text })
                }
              />
              <TextInput
                style={styles.input}
                placeholderTextColor="white"
                placeholder="Last Name"
                name="apellido"
                onChange={(e) =>
                  setUsuario({ ...usuario, apellido: e.nativeEvent.text })
                }
              />

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
                name="password"
                secureTextEntry={true}
                onChange={(e) =>
                  setUsuario({ ...usuario, password: e.nativeEvent.text })
                }
              />
              <TextInput
                style={styles.input}
                placeholderTextColor="white"
                placeholder="Profile picture url "
                name="url_foto"
                onChange={(e) =>
                  setUsuario({ ...usuario,  url_foto: e.nativeEvent.text })
                }
              />
              <SelectDropdown
                data={paises}
                onSelect={(selectedItem, index) => {
                  return setUsuario({ ...usuario, pais: selectedItem });
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
              <View title="Submit"  style={{
                  padding: 4,
                  margin: 10,
                  backgroundColor: "white",
                  borderRadius: 100,
                  minHeight: 20,
                  width: 180,
                }}>
                  <Text style={styles.button} onPress={registarUsuario}>
                    Submit
                  </Text>
                </View>
              <Text
                style={styles.p}
                onPress={() => {
                  props.navigation.navigate("SignIn");
                }}
              >
                Do you already have an account? Sign In here!
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
  registarUsuario: usuariosActions.registrarUsuario,
};
export default connect(null, mapDispatchToProps)(SignUp);

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
