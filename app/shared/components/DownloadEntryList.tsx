import React, {Component} from "react";
import {View, Text, FlatList, SafeAreaView} from "react-native";
import {DownloadEntryListItem} from "./DownloadEntryListItem";
import {DownloadItemState} from "../state/DownloadItemState";

export interface DownloadEntryListProps {

    downloadItems: DownloadItemState[];

}

export class DownloadEntryList extends Component<DownloadEntryListProps> {

    render() {
        return (
            <SafeAreaView>
                <FlatList
                    data={this.props.downloadItems}
                    renderItem={item => <DownloadEntryListItem key={item.index} item={{
                        ...item.item,
                    }} />}
                    keyExtractor={(item, index) => index + item.downloadItem.uniqueIdentifier}
                    contentContainerStyle={{
                        flexGrow: 1
                    }}
                    style={{
                        flex: 1
                    }}
                >
                </FlatList>
            </SafeAreaView>
        );
    }

}