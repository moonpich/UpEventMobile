import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SaveEvents } from "../screens/SaveEvents";
import { SearchEvents } from "../screens/SearchEvents";
import { Profile } from "../screens/ProfileUser";
import { Event } from "../screens/Event";
import { AvailableEvents } from "../screens/AvailableEvents";
import Access from "../screens/Access";
import { SavedEvent } from "../screens/SavedEvent";
import {CalendarClock, CalendarHeart, CalendarSearch, CircleUserRound} from "lucide-react-native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AvailableEventsStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: true, headerTitle: "", headerStyle: { backgroundColor: "#000000"}, headerTintColor: "#FFFFFF"}}>
      <Stack.Screen name="AvailableEventsScreen" component={AvailableEvents} />
      <Stack.Screen name="Event" component={Event} />
    </Stack.Navigator>
  );
}

function SaveEventsStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: true, headerTitle: "", headerStyle: {backgroundColor: "#000000"}, headerTintColor: "#FFFFFF"}}>
      <Stack.Screen name="SaveEventsScreen" component={SaveEvents} />
      <Stack.Screen name="SavedEvent" component={SavedEvent} />
      <Stack.Screen name="Access" component={Access} />
    </Stack.Navigator>
  );
}

function SearchEventsStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: true, headerTitle: "", headerStyle: {backgroundColor: "#000000"}, headerTintColor: "#FFFFFF"}}>
      <Stack.Screen name="SearchEvents" component={SearchEvents} />
      <Stack.Screen name="Event" component={Event} />
    </Stack.Navigator>
  );
}
export const UserNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let icon;
        if (route.name === "AvailableEvents") {
          icon = <CalendarClock size={size} color={color} />;
        } else if (route.name === "SaveEvents") {
          icon = <CalendarHeart size={size} color={color} />;
        } else if (route.name === "SearchEvents") {
          icon = <CalendarSearch size={size} color={color} />;
        } else if (route.name === "Profile") {
          icon = <CircleUserRound size={size} color={color} />;
        }
        return icon;
      },
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: "#B23BC4",
      tabBarInactiveTintColor: "#FFFFFF",
      tabBarStyle: { backgroundColor: "#0e0e0e" },
    })}
  >
    <Tab.Screen name="AvailableEvents" component={AvailableEventsStack} />
    <Tab.Screen name="SaveEvents" component={SaveEventsStack} />
    <Tab.Screen name="SearchEvents" component={SearchEventsStack} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);
