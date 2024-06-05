import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { useLayoutEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function DetailsScreen({ route, navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title:
        route.params.item?.original_name || route.params.item?.original_title,
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()}>
          <Text
            style={{
              color: "#fff",
              fontSize: 12,
            }}
          >
            <Ionicons name="chevron-back-outline" />
            <Text>Back to List</Text>
          </Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.titleText}>
            {route.params.item?.original_name}
            {route.params.item?.original_title}
          </Text>
          <View>
            <Image
              style={styles.image}
              source={`https://image.tmdb.org/t/p/w500${route.params.item.poster_path}`}
              contentFit="fill"
              transition={1000}
            />
          </View>
          <Text style={styles.bodyText}>{route.params.item.overview}</Text>
          <Text>
            Popularity: {route.params.item.popularity} | Release Date:{" "}
            {route.params.item?.first_air_date}
            {route.params.item?.release_date}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: StatusBar.currentHeight,
  },
  picker: {
    padding: 10,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  card: {
    backgroundColor: "white",
    flexDirection: "row",
    gap: 5,
    padding: 16,
    borderBottomWidth: 1,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bodyText: {
    fontSize: 16,
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
});
