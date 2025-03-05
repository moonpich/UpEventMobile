import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./src/global/context/AuthContext";
import { MainNavigator } from "./src/global/navigation/AppNavigator";
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <MainNavigator />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
