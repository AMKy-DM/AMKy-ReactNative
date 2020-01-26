import React, {FunctionComponent, useContext} from "react";
import {View, Text, TouchableHighlight, Platform} from "react-native";
import {ThemeModel, ThemeProviderContext} from "../providers/ThemeProvider";
import {ProgressBar} from "./ProgressBar";
import {DownloadItemState} from "../state/DownloadItemState";
import {TextHelpers} from "../helpers/TextHelpers";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";


export interface DownloadEntryListItemProps {

    item: DownloadItemState;

    onSettings?(): void;

}


export const DownloadEntryListItem: FunctionComponent<DownloadEntryListItemProps> = (props: DownloadEntryListItemProps) => {

    const theme = useContext<ThemeModel>(ThemeProviderContext);

    const downloadItem = props.item.downloadItem;
    const state = props.item;

    const getPercentage = (value: number, totalFrame: number) => {
        return value * 100 / totalFrame;
    };

    const progression = state.finishedSegments.map(fs => ({
        start: getPercentage(fs.start, state.totalSize),
        end: getPercentage(fs.end, state.totalSize)
    }));

    const downloaded = 1000;

    const progress = downloaded * 100 / state.totalSize;

    return (
        <View>
            <View style={{
                height: 40,
                display: 'flex',
                flexDirection: 'row'
            }}>
                <View style={{
                    flexGrow: 1,
                }}>
                    <Text style={{
                        color: theme.downloadList.color,
                        ...theme.downloadList.textStyles
                    }}>
                        {downloadItem.displayName}
                    </Text>

                    <Text style={{
                        color: theme.downloadList.subtitleColor,
                        ...theme.downloadList.textStyles
                    }}>
                        {downloadItem.fileName}
                    </Text>

                    <Text style={{
                        color: theme.downloadList.subtitleColor,
                        ...theme.downloadList.textStyles
                    }}>
                        {downloadItem.uri.uri}
                    </Text>
                </View>

                <TouchableHighlight

                    underlayColor={theme.downloadList.settingsButton.iconHighlightColor}

                    onLongPress={() => {
                        if (Platform.OS !== 'web') {
                            if (props.onSettings) {
                                props.onSettings();
                            }
                        }
                    }}
                    onPress={() => {
                        if (Platform.OS === 'web') {
                            if (props.onSettings) {
                                props.onSettings();
                            }
                        }
                    }}

                    style={{
                        alignItems: 'center',
                        alignContent: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <View
                        style={{
                            // width: theme.downloadList.settingsButton.width,
                            // height: theme.downloadList.settingsButton.height,
                            alignItems: 'center',
                            alignContent: 'center',
                            justifyContent: 'center',

                        }}
                    >
                        <FontAwesomeIcon
                            icon={faBars}
                            style={{
                                // width: theme.downloadList.settingsButton.iconWidth,
                                // height: theme.downloadList.settingsButton.iconHeight,
                                fontSize: theme.downloadList.settingsButton.iconFontSize,
                                color: theme.downloadList.settingsButton.iconColor,
                                textAlign: 'center',
                                verticalTextAlign: 'center'
                            }}
                        />
                    </View>
                </TouchableHighlight>
            </View>

            <ProgressBar value={progression}/>

            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <Text
                    style={{
                        color: theme.downloadList.progressColor,
                        width: '50%',
                        textAlign: 'center',
                        textAlignVertical: 'center'
                    }}
                >
                    {TextHelpers.formatSize(downloaded)}/{TextHelpers.formatSize(state.totalSize)} ({Math.floor(progress)}/100%)
                </Text>
                <Text
                    style={{
                        color: theme.downloadList.progressColor,
                        width: '50%',
                        textAlign: 'center',
                        textAlignVertical: 'center'
                    }}
                >
                    {TextHelpers.formatSize(state.estimatedDownloadSpeedPerSecond)} | {TextHelpers.formatTime(state.estimatedTimeRemaining)}
                </Text>
            </View>

            <View
                style={{
                    // height: theme.downloadList.separatorHeight,
                    backgroundColor: theme.downloadList.separatorColor
                }}
            />
        </View>
    );
};
