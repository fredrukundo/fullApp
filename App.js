import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import * as Updates from "expo-updates";
import { DataProvider } from "./contexts/DataContext";
import AppAuth from "./Authsrc/AppAuth";
import { AuthProvider } from "./Authsrc/src/contexts/AuthContext";
import { AxiosProvider } from "./Authsrc/src/contexts/AxiosContext";

export default function App() {
  //this part is for expo updates
  //in the future u want to make chnges and publish
  //to expo go it will be easy
  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  const [theme, setTheme] = useState({ mode: "light" });

  const updateTheme = (newTheme) => {
    let mode;
    if (!newTheme) {
      mode = theme.mode === "dark" ? "light" : "dark";
      newTheme = { mode };
    }
    setTheme(newTheme);
  };

  return (
    <DataProvider>
      <ThemeContext.Provider value={{ theme, updateTheme }}>
        <AuthProvider>
          <AxiosProvider>
            <AppAuth />
          </AxiosProvider>
        </AuthProvider>
        <StatusBar style={theme.mode == "dark" ? "light" : "dark"} />
      </ThemeContext.Provider>
    </DataProvider>
  );
}
