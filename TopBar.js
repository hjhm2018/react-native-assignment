import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MoviesScreen from "./screens/MoviesScreen";
import SearchResultsScreen from "./screens/SearchResultsScreen";
import TvShowsScreen from "./screens/TvShowsScreen";

const Tab = createMaterialTopTabNavigator();

export const TopBarStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Movies"
        component={MoviesScreen}
        options={{
          title: "Movies",
        }}
      />
      <Tab.Screen
        name="Search Results"
        component={SearchResultsScreen}
        options={{
          title: "Search Results",
        }}
      />
      <Tab.Screen
        name="Tv Shows"
        component={TvShowsScreen}
        options={{
          title: "Tv Shows",
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <TopBarStack />
    </NavigationContainer>
  );
}
