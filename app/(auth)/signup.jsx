import { View, Text, TextInput, Pressable } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");

  console.log(username, email, password, description);
  const router = useRouter();

  const handleSubmit = async () => {
    setErrorMessage(null);
    try {
      const response = await axios.post(
        ": https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
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
      } else if (error.response.status === 409) {
        setErrorMessage("L'adresse mail saisie existe déjà");
      } else {
        setErrorMessage("Une erreur est survenue, merci de réessayer");
      }
    }
  };
  return (
    <View>
      <View>
        <FontAwesome5 name="airbnb" size={24} color="black" />
        <Text>Sign up</Text>
      </View>
      <View>
        <TextInput placeholder="email" value={email} onChangeText={setEmail} />
      </View>
      <View>
        <TextInput
          placeholder="username"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View>
        <TextInput
          placeholder="Describe yourself in a few words..."
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View>
        <TextInput
          placeholder="password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>
      <View>
        <TextInput
          placeholder="confirm password"
          value={confirmPassword}
          secureTextEntry
          onChangeText={setConfirmPassword}
        />
      </View>

      {errorMessage && (
        <View>
          <Text>{errorMessage}</Text>
        </View>
      )}
      {}
      <View>
        <Pressable onPress={handleSubmit}>
          <Text>Sign up</Text>
        </Pressable>
        <Text
          onPress={() => {
            router.push("/login");
          }}
        >
          Already have an account ? Login
        </Text>
      </View>
    </View>
  );
};

export default Signup;
