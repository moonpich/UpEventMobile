import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./src/global/context/AuthContext";
import { MainNavigator } from "./src/global/navigation/AppNavigator";
import { ThemeProvider } from "./src/global/context/ThemeContext";
import Toast, {BaseToast} from "react-native-toast-message";
import { useFonts } from 'expo-font';
import { ActivityIndicator } from 'react-native';

const customToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#4CAF50", backgroundColor: "#222" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontFamily: "Century Gothic",
        color: "#ffffff"
      }}
    />
  ),
  error: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#FF3B30", backgroundColor: "#222" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontFamily: "Century Gothic",
        color: "#ffffff"
      }}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#1E90FF", backgroundColor: "#222" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontFamily: "Century Gothic",
        color: "#ffffff"
      }}
    />
  )
};


export default function App() {
  const [fontsLoaded] = useFonts({
    'Century Gothic': require('./assets/fonts/CenturyGothic.ttf'),
    'Century Gothic Bold': require('./assets/fonts/CenturyGothic-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ThemeProvider>
          <MainNavigator />
          <Toast config={customToastConfig}/>
        </ThemeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
