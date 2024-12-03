import { View, Text, TextInput, Pressable } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  console.log(email, password);

  const router = useRouter();

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
    <View>
      <View>
        <FontAwesome5 name="airbnb" size={24} color="black" />
        <Text>Login</Text>
      </View>
      <View>
        <TextInput placeholder="email" value={email} onChangeText={setEmail} />
        <TextInput
          placeholder="password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>

      {errorMessage && (
        <View>
          <Text>{errorMessage}</Text>
        </View>
      )}
      <View>
        <Pressable onPress={handleSubmit}>
          <Text>Sign in</Text>
        </Pressable>
        <Text
          onPress={() => {
            router.push("/signup");
          }}
        >
          No account ? Register
        </Text>
      </View>
    </View>
  );
};

export default Login;
