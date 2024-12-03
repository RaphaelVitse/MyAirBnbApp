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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  console.log(email, password);

  const router = useRouter();
  const styles = useStyles();

  const handleSubmit = async () => {
    setErrorMessage(null);
    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        {
          email: email,
          password: password,
        }
      );
      alert("login ok");
    } catch (error) {
      console.log(error);
      if (error.status === 400 || error.status === 401) {
        setErrorMessage("Mauvais email et/ou mot de passe");
      } else {
        setErrorMessage("Problème serveur");
      }
    }
  };
  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.titleLogo}>
          <FontAwesome5 name="airbnb" size={100} color="#EB5A62" />
          <Text style={styles.titlePage}>Login</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            style={styles.input}
          />
        </View>

        {errorMessage && (
          <View>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>
        )}
        <View style={styles.btnContainer}>
          <Pressable onPress={handleSubmit}>
            <Text style={styles.btn}>Sign in</Text>
          </Pressable>
          <Text
            style={styles.linkLogSign}
            onPress={() => {
              router.push("/signup");
            }}
          >
            No account ? Register
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;

const useStyles = () => {
  const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-evenly",
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
      gap: 30,
    },
    titlePage: {
      fontSize: 34,
      fontWeight: "bold",
      color: "gray",
    },
    inputContainer: {
      gap: 30,
    },
    input: {
      height: 40,
      borderBottomWidth: 2,
      borderBottomColor: "#EB5A62",
      width: width - 100,
      height: 50,
      gap: 50,
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
