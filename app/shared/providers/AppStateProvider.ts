import React from "react";
import {ApplicationState} from "../state/ApplicationState";
import {DarkTheme, DefaultTheme} from "./ThemeProvider";

export const AppStateProviderContext = React.createContext<ApplicationState>({
    downloadItems: [],
    theme: DefaultTheme
});

export const AppStateProvider = AppStateProviderContext.Provider;
export const AppStateConsumer = AppStateProviderContext.Consumer;