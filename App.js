import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TopBarStack } from "./TopBar";
import DetailsScreen from "./screens/DetailsScreen";
import { Pressable, Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "navy" },
          headerTintColor: "white",
          headerTitleAlign: "center",
          statusBarStyle: "dark",
        }}
      >
        <Stack.Screen name="Movies App" component={TopBarStack} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
