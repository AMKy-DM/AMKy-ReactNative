import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DownloadsPage} from "./app/pages/downloads/HomePage";
import {ApplicationState} from "./app/shared/state/ApplicationState";
import {DarkTheme, DefaultTheme, ThemeModel, ThemeProvider} from "./app/shared/providers/ThemeProvider";
import NavigationPage from "./app/pages/NavigationPage";
import {AppStateProvider} from "./app/shared/providers/AppStateProvider";
import {DefaultLocalization, LocalizationProvider} from "./app/shared/providers/LocalizationProvider";


export default class App extends Component<{}, ApplicationState> {

    private styleSheets: any;

    constructor(props: {}) {
        super(props);

        const theme = DefaultTheme;

        const testDl = {
            totalSize: 2000,
            estimatedDownloadSpeedPerSecond: 1000,
            estimatedTimeRemaining: 60,
            finishedSegments: [
                {
                    start: 0,
                    end: 100
                },
                {
                    start: 600,
                    end: 900
                },
                {
                    start: 1000,
                    end: 1400
                }
            ],
            downloadItem: {
                uniqueIdentifier: '12',
                displayName: 'test',
                fileName: 'file1.txt',
                uri: {
                    uri: 'http://google.com/'
                }
            }
        };

        this.state = {
            theme: theme,
            localization: DefaultLocalization,
            downloadItems: [testDl, testDl, testDl, testDl, testDl, testDl, testDl, testDl, testDl, testDl, testDl, testDl, testDl]
        };

        this.styleSheets = this.createStyleSheet(theme);
    }

    createStyleSheet(theme: ThemeModel) {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: theme.backgroundColor,
                //color: theme.color,
            },
        });
    }

    render() {
        return (
            <AppStateProvider value={this.state}>
                <LocalizationProvider value={this.state.localization}>
                    <ThemeProvider value={this.state.theme}>
                        <View style={this.styleSheets.container}>
                            <NavigationPage/>
                        </View>
                    </ThemeProvider>
                </LocalizationProvider>
            </AppStateProvider>
        );
    }
}