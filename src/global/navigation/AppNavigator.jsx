import { AuthContext, AuthProvider } from "../context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import LoginScreen from "../screens/LoginScreen";
import { UserNavigator } from "../../user/navigation/UserNavigator";
import { CheckerNavigator } from "../../checker/navigation/CheckerNavigator";

const Stack = createNativeStackNavigator();

export const MainNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user && user.email !== "" ? (
          user.role === "CHECADOR" ? (
            <Stack.Screen name="CheckerStack" component={CheckerNavigator} />
          ) : (
            <Stack.Screen name="UserStack" component={UserNavigator} />
          )
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
}
