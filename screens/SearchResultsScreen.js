import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  StatusBar,
  Button,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Image } from "expo-image";
import { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { api_key } from "../configFile";

export default function SearchResultsScreen({ navigation }) {
  const [name, setName] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("movie");
  const [moviesData, setMoviesData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    if (name == "") {
      setError(true);
      setMoviesData([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/${selectedTopic}?query=${encodeURI(
          name
        )}&api_key=${api_key}`
      );

      const data = await response.json();
      // console.log(data.results);

      setMoviesData(data.results);
      setError(false);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ paddingBottom: 10 }}>
        Search Movie/Tv Show Name<Text style={{ color: "red" }}>*</Text>
      </Text>
      <View style={[styles.searchBar, error ? styles.error : ""]}>
        <Ionicons name="search" size={24} style={{ padding: 10 }} />
        <TextInput
          style={styles.input}
          placeholder="i.e. James Bond, CSI"
          onChangeText={setName}
        />
      </View>
      <Text style={{ paddingTop: 20 }}>
        Choose Search Type<Text style={{ color: "red" }}>*</Text>
      </Text>
      <View style={styles.box}>
        <View style={styles.picker}>
          <Picker
            mode="dropdown"
            style={[styles.dropdown, error ? styles.error : ""]}
            selectedValue={selectedTopic}
            onValueChange={(itemValue) => setSelectedTopic(itemValue)}
          >
            <Picker.Item style={{ fontSize: 20 }} label="Movie" value="movie" />
            <Picker.Item style={{ fontSize: 20 }} label="Multi" value="multi" />
            <Picker.Item style={{ fontSize: 20 }} label="TV" value="tv" />
          </Picker>
        </View>
        <View style={{ justifyContent: "center" }}>
          <Button
            title="Search"
            onPress={fetchData}
            // disabled={name == "" ? true : false}
          />
        </View>
      </View>
      {error ? (
        <View>
          <Text style={{ color: "red", paddingBottom: 10 }}>
            Movie/Tv Show name is required
          </Text>
        </View>
      ) : (
        ""
      )}
      <View style={styles.listContainer}>
        <FlatList
          data={moviesData}
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
                  <Text style={styles.titleText}>
                    {item?.original_title}
                    {item?.original_name}
                  </Text>
                  <Text style={styles.bodyText}>
                    Popularity: {item.popularity}
                  </Text>
                  <Text style={styles.bodyText}>
                    Release Date: {item?.first_air_date} {item?.release_date}
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
          ListEmptyComponent={<Text>Please Initiate a Search</Text>}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
  },
  input: {
    height: 40,
    padding: 10,
    width: 200,
    fontSize: 20,
  },
  picker: {
    paddingHorizontal: 10,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  box: {
    flexDirection: "row",
  },
  card: {
    backgroundColor: "white",
    flexDirection: "row",
    gap: 5,
    padding: 16,
    borderBottomWidth: 1,
  },
  image: {
    flex: 1,
    width: "100%",
  },
  searchBar: {
    flexDirection: "row",
    borderWidth: 1,
  },
  error: {
    borderColor: "red",
  },
  dropdown: {
    width: 200,
    height: 100,
  },
});
