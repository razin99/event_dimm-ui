import { Text, View, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { RootStackParams } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { CenterText } from "../components/CenterText";

interface EventInfo {
  title: string;
  description: string;
  date: number;
  fee: number;
  location: string;
  organizer: {
    first_name: string;
    last_name: string;
  };
  attendees: {
    id: string;
    first_name: string;
    last_name: string;
  }[];
}

interface EventInfoInput {
  eventId: string;
}

const EVENT_INFO = gql`
  query getEvent($eventId: String!) {
    event(id: $eventId) {
      title
      description
      date
      fee
      location
      organizer {
        first_name
        last_name
      }
      attendees {
        id
        first_name
        last_name
      }
    }
  }
`;

type EventProp = NativeStackScreenProps<RootStackParams, "Event">;
export default function Event({ route }: EventProp): JSX.Element {
  const eventId = route.params.eventId;
  const { loading, error, data } = useQuery<{ event: EventInfo }, EventInfoInput>(EVENT_INFO, {
    variables: {
      eventId,
    },
    pollInterval: 5000,
  });
  if (error) return <CenterText>ERR!:: {error.message}</CenterText>;
  if (loading) return <CenterText>Loading...</CenterText>;
  return (
    <View style={styles.parent}>
      <ScrollView>
        {data && data.event && (
          <View>
            <Header
              title={data.event.title}
              organizer_name={`${data.event.organizer.first_name} ${data.event.organizer.last_name}`}
            />
            <View style={styles.content}>
              <CollapsibleDescription description={data.event.description} />
              <View style={styles.sectionRow}>
                <View>
                  <Text style={styles.subtitle}>Date</Text>
                  <Text>{new Date(data.event.date * 1000).toDateString()}</Text>
                </View>
                <View>
                  <Text style={styles.subtitle}>Fee: ${data.event.fee}</Text>
                </View>
              </View>
              <View style={styles.section}>
                <Text style={styles.subtitle}>Location</Text>
                <Text>{data.event.location}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.subtitle}>Attendees</Text>
                {data.event.attendees.map((user, i) => (
                  <Text key={user.id} style={{ textTransform: "capitalize" }}>
                    {i + 1}. {user.first_name} {user.last_name}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "baseline",
    justifyContent: "flex-start",
    padding: 32,
  },
  parent: {
    backgroundColor: "#eaeaea",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
  },
  organizer: {
    fontSize: 24,
    fontWeight: "600",
  },
  header: {
    backgroundColor: "#eeb300",
    padding: 32,
    paddingBottom: 16,
  },
  content: {
    padding: 32,
    fontSize: 16,
  },
  section: {
    marginVertical: 16,
  },
  sectionRow: {
    marginVertical: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

interface CollapsibleDescriptionProp {
  description: string;
}
function CollapsibleDescription({ description }: CollapsibleDescriptionProp): JSX.Element {
  const [expand, setExpand] = useState<boolean>(false);
  return (
    <View style={styles.section} onTouchEnd={() => setExpand(!expand)}>
      <Text style={styles.subtitle}>About event</Text>
      <Text numberOfLines={expand ? 0 : 3} style={styles.description}>
        {description}
      </Text>
    </View>
  );
}

interface HeaderProp {
  title: string;
  organizer_name: string;
}
function Header({ title, organizer_name }: HeaderProp): JSX.Element {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={{ ...styles.organizer, textTransform: "capitalize" }}>
        Event by: {organizer_name}
      </Text>
    </View>
  );
}
