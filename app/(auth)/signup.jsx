import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");

  console.log(username, email, password, description);
  const router = useRouter();
  const styles = useStyles();

  const handleSubmit = async () => {
    setErrorMessage(null);
    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
        {
          email: email,
          username: username,
          password: password,
          description: description,
        }
      );
      alert("Sign up ok");
    } catch (error) {
      console.log(error);
      if (password !== confirmPassword) {
        setErrorMessage("Password must be the same");
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez compléter tous les champs !");
      } else if (
        error.response.data.message === "This email already has an account."
      ) {
        setErrorMessage("L'adresse mail saisie existe déjà");
      } else {
        setErrorMessage("Une erreur est survenue, merci de réessayer");
      }
    }
  };
  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.titleLogo}>
          <FontAwesome5 name="airbnb" size={100} color="#EB5A62" />
          <Text style={styles.titlePage}>Sign up</Text>
        </View>
        <View style={styles.titlePage}>
          <View>
            <TextInput
              placeholder="email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
          </View>
          <View>
            <TextInput
              placeholder="username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />
          </View>
          <View>
            <TextInput
              placeholder="Describe yourself in a few words..."
              value={description}
              onChangeText={setDescription}
              style={styles.inputDescr}
            />
          </View>
          <View>
            <TextInput
              placeholder="password"
              value={password}
              secureTextEntry
              onChangeText={setPassword}
              style={styles.input}
            />
          </View>
          <View>
            <TextInput
              placeholder="confirm password"
              value={confirmPassword}
              secureTextEntry
              onChangeText={setConfirmPassword}
              style={styles.input}
            />
          </View>
        </View>

        {errorMessage && (
          <View>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>
        )}
        {}
        <View style={styles.btnContainer}>
          <Pressable onPress={handleSubmit}>
            <Text style={styles.btn}>Sign up</Text>
          </Pressable>
          <Text
            style={styles.linkLogSign}
            onPress={() => {
              router.push("/login");
            }}
          >
            Already have an account ? Login
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signup;

const useStyles = () => {
  const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-around",
      alignItems: "center",

      width: width,
      height: height,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
    },
    titleLogo: {
      alignItems: "center",
      gap: 20,
    },
    titlePage: {
      fontSize: 34,
      fontWeight: "bold",
      color: "gray",
    },

    input: {
      height: 40,
      borderBottomWidth: 2,
      borderBottomColor: "#EB5A62",
      width: width - 100,
      height: 50,
    },
    inputDescr: {
      height: 100,
      borderWidth: 2,
      borderColor: "#EB5A62",
      width: width - 100,
      paddingLeft: 10,
      textAlignVertical: "top",
      marginTop: 30,
      marginBottom: 30,
    },
    btnContainer: {
      gap: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    btn: {
      width: 180,
      height: 60,
      fontSize: 24,
      color: "gray",
      fontWeight: 500,
      borderBottomColor: "#EB5A62",
      borderWidth: 3,
      textAlign: "center",
      textAlignVertical: "center",
      borderRadius: 40,
    },
    linkLogSign: {
      color: "gray",
    },
    errorMessage: {
      color: "#EB5A62",
    },
  });

  return styles;
};
