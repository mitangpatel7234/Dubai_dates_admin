import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./assets/css/tailwind.output.css";
import App from "./App";
import { SidebarProvider } from "./context/SidebarContext";
import ThemedSuspense from "./components/ThemedSuspense";
import { UserPermissionProvider } from "./context/UserPermissionsContext";
import { Windmill } from "@windmill/react-ui";
import windmillTheme from "./windmillTheme";

ReactDOM.render(
  <SidebarProvider>
    <UserPermissionProvider>
    <Suspense fallback={<ThemedSuspense />}>
      <Windmill usePreferences theme={windmillTheme}>
        <App />
      </Windmill>
    </Suspense>
    </UserPermissionProvider>
  </SidebarProvider>,
  document.getElementById("root")
);
