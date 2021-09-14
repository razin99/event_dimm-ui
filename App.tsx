import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";

const Stack = createNativeStackNavigator();

export default function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://7482-115-131-129-206.ngrok.io/graphql",
  });
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
