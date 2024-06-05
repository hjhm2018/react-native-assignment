import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  FlatList,
  Button,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { Image } from "expo-image";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import { api_key } from "../configFile";

export default function TvShowsScreen({ navigation }) {
  const [selectedTopic, setSelectedTopic] = useState("airing_today");
  const [tvShowsData, setTvShowsData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${selectedTopic}?api_key=${api_key}`
      );

      const data = await response.json();

      setTvShowsData(data.results);
      setIsLoading(false);
      setError("");
    } catch (error) {
      console.log("Error fetching data: ", error);
      setIsLoading(false);
      setError("Failed to fetch tv shows");
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, [selectedTopic]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {error ? (
        <View>
          <Text>{error}</Text>
        </View>
      ) : (
        <>
          <View style={styles.picker}>
            <Picker
              mode="dropdown"
              style={{ width: 200, height: 100 }}
              selectedValue={selectedTopic}
              onValueChange={(itemValue) => setSelectedTopic(itemValue)}
            >
              <Picker.Item
                style={{ fontSize: 20 }}
                label="Airing Today"
                value="airing_today"
              />
              <Picker.Item
                style={{ fontSize: 20 }}
                label="On The Air"
                value="on_the_air"
              />
              <Picker.Item
                style={{ fontSize: 20 }}
                label="Popular"
                value="popular"
              />
              <Picker.Item
                style={{ fontSize: 20 }}
                label="Top Rated"
                value="top_rated"
              />
            </Picker>
          </View>
          <View style={styles.listContainer}>
            <FlatList
              data={tvShowsData}
              renderItem={({ item }) => {
                return (
                  <View style={styles.card}>
                    <View style={{ width: 100 }}>
                      <Image
                        style={styles.image}
                        source={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        contentFit="fill"
                        transition={1000}
                      />
                    </View>
                    <View
                      style={{
                        width: 200,
                        gap: 4,
                      }}
                    >
                      <Text style={styles.titleText}>{item.original_name}</Text>
                      <Text style={styles.bodyText}>
                        Popularity: {item.popularity}
                      </Text>
                      <Text style={styles.bodyText}>
                        Release Date: {item.first_air_date}
                      </Text>
                      <Button
                        title="More details"
                        onPress={() => navigation.navigate("Details", { item })}
                      />
                    </View>
                  </View>
                );
              }}
              ItemSeparatorComponent={<View style={{ height: 16 }} />}
              ListEmptyComponent={<Text>No Tv Shows Found</Text>}
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 20,
    fontWeight: "bold",
  },
  bodyText: {
    fontSize: 16,
  },
  image: {
    flex: 1,
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
