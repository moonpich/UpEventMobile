import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CheckerAvailableEvents } from "../screens/CheckerAvailableEvents.jsx";
import { CheckerSearchEvents } from "../screens/CheckerSearchEvents.jsx";
import { CheckerProfile } from "../screens/CheckerProfile.jsx";

import {
  CalendarDays,
  CalendarCheck2,
  ContactRound,
} from "lucide-react-native";

const Tab = createBottomTabNavigator();

export const CheckerNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let icon;
        if (route.name === "CheckerAvailableEvents") {
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
    <Tab.Screen
      name="CheckerAvailableEvents"
      component={CheckerAvailableEvents}
    />
    <Tab.Screen name="CheckerSearchEvents" component={CheckerSearchEvents} />
    <Tab.Screen name="CheckerProfile" component={CheckerProfile} />
  </Tab.Navigator>
);
