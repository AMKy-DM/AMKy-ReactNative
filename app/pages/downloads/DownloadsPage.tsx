import React, {Component} from "react";
import {View, Text, TextInput} from "react-native";
import {ApplicationState} from "../../shared/state/ApplicationState";
import {DownloadEntryList} from "../../shared/components/DownloadEntryList";
import {AppStateProviderContext} from "../../shared/providers/AppStateProvider";

export class DownloadsPage extends Component {

    static contextType = AppStateProviderContext;

    render() {
        return (
            <DownloadEntryList
                downloadItems={this.context.downloadItems}>

            </DownloadEntryList>
        );
    }

}