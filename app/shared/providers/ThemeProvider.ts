import React from "react";
import {StyleProp, ViewStyle} from "react-native";

export interface ThemeModel {

    backgroundColor: string;
    color: string;

    progressBarBackgroundColor: string;
    progressBarColor: string;
    progressBarMinHeight: number;

    navBar: {
        iconFontSize: number,
        iconHeight: number,
        iconMargin: number,

        badgeWidth: number,
        badgeHeight: number,
        badgeRadius: number,
        badgeTop: number,
        badgeRight: number,
        badgeColor: string;
        badgeBackColor: string;
    },

    downloadList: {
        backgroundColor: string;
        color: string;
        subtitleColor: string;
        progressColor: string;

        textStyles: ViewStyle;

        textAreaMargins: number;

        separatorColor: string;
        separatorHeight: number;

        settingsButton: {
            width: number;
            height: number;

            iconWidth: number,
            iconHeight: number,
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
    progressBarMinHeight = 15;
    progressBarBackgroundColor = '#333';

    navBar = {
        iconFontSize: 18,
        iconHeight: 24,
        iconMargin: 5,

        badgeWidth: 16,
        badgeHeight: 16,
        badgeRadius: 10,
        badgeTop: -5,
        badgeRight: -15,
        badgeColor: 'white',
        badgeBackColor: 'blue',
    };

    downloadList = {
        backgroundColor : this.backgroundColor,
        color : this.color,
        subtitleColor:'#bbb',
        progressColor:'#555',

        textStyles: {
            marginTop: 3,
            marginLeft: 20,
            marginRight: 20,
        },

        textAreaMargins: 5,

        separatorColor: '#444',
        separatorHeight: 1,

        settingsButton: {
            width: 70,
            height: 70,

            iconWidth: 30,
            iconHeight: 30,
            iconFontSize: '3em',
            iconColor: '#fff',
            iconHighlightColor: '#444',
        }
    };

}

export const DefaultTheme = new DarkTheme();

export const ThemeProviderContext = React.createContext<ThemeModel>(DefaultTheme);

export const ThemeProvider = ThemeProviderContext.Provider;
export const ThemeConsumer = ThemeProviderContext.Consumer;
