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
import { useTheme } from "../../global/context/ThemeContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function AvailableEventsStack() {
  const { theme } = useTheme(); 
  return (
    <Stack.Navigator screenOptions={{headerShown: true, headerTitle: "", headerTransparent: true, headerTintColor: theme.textColor}}>
      <Stack.Screen name="AvailableEventsScreen" component={AvailableEvents} />
      <Stack.Screen name="Event" component={Event} />
    </Stack.Navigator>
  );
}

function SaveEventsStack() {
  const { theme } = useTheme(); 
  return (
    <Stack.Navigator screenOptions={{headerShown: true, headerTitle: "", headerTransparent:true, headerTintColor: theme.textColor}}>
      <Stack.Screen name="SaveEventsScreen" component={SaveEvents} />
      <Stack.Screen name="SavedEvent" component={SavedEvent} />
      <Stack.Screen name="Access" component={Access} />
    </Stack.Navigator>
  );
}

function SearchEventsStack() {
  const { theme } = useTheme(); 
  return (
    <Stack.Navigator screenOptions={{headerShown: true, headerTitle: "", headerTransparent:true, headerTintColor: theme.textColor}}>
      <Stack.Screen name="SearchEvents" component={SearchEvents} />
      <Stack.Screen name="Event" component={Event} />
    </Stack.Navigator>
  );
}
export const UserNavigator = () => {
  const { theme } = useTheme(); 

  return( 
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
      tabBarActiveTintColor: theme.navIconColorActive,
      tabBarInactiveTintColor: theme.navIconColorInactive,
      tabBarStyle: { backgroundColor: theme.tabBarStyle},
    })}
  >
    <Tab.Screen name="AvailableEvents" component={AvailableEventsStack} />
    <Tab.Screen name="SaveEvents" component={SaveEventsStack} />
    <Tab.Screen name="SearchEvents" component={SearchEventsStack} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);};
