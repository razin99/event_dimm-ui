import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Event from "./pages/Event";
import { AuthContext } from "./AuthContext";

export type RootStackParams = {
  Home: undefined;
  Login: undefined;
  Event: { eventId: string };
};
const Stack = createNativeStackNavigator<RootStackParams>();

export default function App(): JSX.Element {
  const url = "http://1478-115-131-129-206.ngrok.io";
  const userId = "a11c467e-b9f7-4267-85d7-d72dbc2d3ee0";

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: `${url}/graphql`,
  });
  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={userId}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Event" component={Event} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}
