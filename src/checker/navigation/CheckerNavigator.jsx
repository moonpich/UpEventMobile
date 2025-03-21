import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CheckerAvailableEvents } from "../screens/CheckerAvailableEvents.jsx";
import { CheckerSearchEvents } from "../screens/CheckerSearchEvents.jsx";
import { CheckerProfile } from "../screens/CheckerProfile.jsx";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Scanner from "../screens/Scanner.jsx";
import {
  CalendarDays,
  CalendarCheck2,
  ContactRound,
} from "lucide-react-native";
import { useTheme } from "../../global/context/ThemeContext.jsx";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AvailableEventsStack() {
  const { theme } = useTheme(); 
  return (
    <Stack.Navigator screenOptions={{headerShown: true, headerTitle: "", headerTransparent: true, headerTintColor: theme.textColor}}>
      <Stack.Screen name="CheckerAvailableEvents" component={CheckerAvailableEvents} />
      <Stack.Screen name="Scanner" component={Scanner} />
    </Stack.Navigator>
  );
}

export const CheckerNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let icon;
        if (route.name === "CheckerAvailableEventsStack") {
          icon = <CalendarDays size={size} color={color} />;
        } else if (route.name === "CheckerSearchEvents") {
          icon = <CalendarCheck2 size={size} color={color} />;
        } else if (route.name === "CheckerProfile") {
          icon = <ContactRound size={size} color={color} />;
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
    <Tab.Screen name="CheckerAvailableEventsStack"component={AvailableEventsStack}/>
    <Tab.Screen name="CheckerSearchEvents" component={CheckerSearchEvents} />
    <Tab.Screen name="CheckerProfile" component={CheckerProfile} />
  </Tab.Navigator>
);
