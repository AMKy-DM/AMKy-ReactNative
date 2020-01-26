import React from "react";
import {StyleProp, ViewStyle} from "react-native";

export interface ThemeModel {

    backgroundColor: string;
    color: string;

    progressBarBackgroundColor: string;
    progressBarColor: string;
    progressBarMinHeight: string;

    downloadList: {
        backgroundColor: string;
        color: string;
        subtitleColor: string;
        progressColor: string;

        textStyles: ViewStyle;

        textAreaMargins: string;

        separatorColor: string;
        separatorHeight: string;

        settingsButton: {
            width: string;
            height: string;

            iconWidth: string,
            iconHeight: string,
            iconFontSize: string,
            iconColor: string,
            iconHighlightColor: string,
        }
    }

}

export class DarkTheme implements ThemeModel {

    backgroundColor = '#222';
    color = '#fff';

    progressBarColor = '#0f0';
    progressBarMinHeight = '15px';
    progressBarBackgroundColor = '#333';

    downloadList = {
        backgroundColor : this.backgroundColor,
        color : this.color,
        subtitleColor:'#bbb',
        progressColor:'#555',

        textStyles: {
            marginTop: '3px',
            marginLeft: '20px',
            marginRight: '20px',
        },

        textAreaMargins: '5px',

        separatorColor: '#444',
        separatorHeight: '1px',

        settingsButton: {
            width: '50px',
            height: '50px',

            iconWidth: '30px',
            iconHeight: '30px',
            iconFontSize: '2em',
            iconColor: '#fff',
            iconHighlightColor: '#444',
        }
    };

}

export const DefaultTheme = new DarkTheme();

export const ThemeProviderContext = React.createContext<ThemeModel>(DefaultTheme);

export const ThemeProvider = ThemeProviderContext.Provider;
export const ThemeConsumer = ThemeProviderContext.Consumer;