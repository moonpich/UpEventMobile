import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./src/global/context/AuthContext";
import { MainNavigator } from "./src/global/navigation/AppNavigator";
import { ThemeProvider } from "./src/global/context/ThemeContext";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ThemeProvider>
          <MainNavigator />
        </ThemeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
