import {DownloadItemState} from "./DownloadItemState";
import {ThemeModel} from "../providers/ThemeProvider";
import {LocalizationModel} from "../providers/LocalizationProvider";

export interface ApplicationState {

    theme: ThemeModel;

    localization: LocalizationModel;

    downloadItems: DownloadItemState[];

}