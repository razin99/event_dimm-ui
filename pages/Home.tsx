import { useQuery } from "@apollo/client";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import gql from "graphql-tag";
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { RootStackParams } from "../App";
import { CenterText } from "../components/CenterText";

interface Event {
  id: string;
  title: string;
  date: number;
  fee: number;
  location: string;
  organizer: { username: string };
}
interface Events {
  events: Event[];
}
const ALL_EVENTS = gql`
  query getEvents {
    events {
      id
      title
      date
      fee
      location
      organizer {
        username
      }
    }
  }
`;

type HomeProp = NativeStackScreenProps<RootStackParams, "Home">;
export default function Home({ navigation }: HomeProp): JSX.Element {
  const { loading, error, data } = useQuery<Events>(ALL_EVENTS, { pollInterval: 1000 });
  if (loading) return <CenterText>Loading...</CenterText>;
  if (error) return <CenterText>ERR!:: {error.message}</CenterText>;
  // TODO paginate instead of normal scroll
  if (data && data.events.length === 0) return <CenterText>No events yet</CenterText>;
  return (
    <ScrollView>
      {data &&
        data.events.map((event: Event) => {
          return (
            <Card key={event.id} navigation={navigation} eventId={event.id}>
              <View style={styles.row}>
                <Text style={styles.title} numberOfLines={1}>
                  {event.title}
                </Text>
                <Text style={styles.price} numberOfLines={1}>
                  ${event.fee}
                </Text>
              </View>
              <View style={{ ...styles.row, marginTop: 16 }}>
                <Text numberOfLines={1}>Organized by: {event.organizer.username}</Text>
                <Text numberOfLines={1}>{new Date(event.date * 1000).toDateString()}</Text>
              </View>
              <Text numberOfLines={1}>Location: {event.location}</Text>
            </Card>
          );
        })}
    </ScrollView>
  );
}

interface CardProp {
  children: React.ReactNode;
  eventId: string;
  navigation: NativeStackNavigationProp<RootStackParams, "Home">;
}
const Card = ({ children, navigation, eventId }: CardProp) => {
  const handleCardTap = () => {
    navigation.navigate("Event", { eventId });
  };
  return (
    <TouchableOpacity style={styles.card} onPress={handleCardTap}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: "#eeb300",
    borderRadius: 16,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  price: {
    fontSize: 32,
  },
});
