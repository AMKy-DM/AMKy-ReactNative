import {DownloadItem} from "../models/DownloadItem";
import {RangeModel} from "../models/RangeModel";


export interface DownloadItemState {

    totalSize: number;

    estimatedDownloadSpeedPerSecond: number;
    estimatedTimeRemaining: number;

    eTagSnapshot: any;
    modifiedSinceSnapshot: any;

    finishedSegments: RangeModel[];

    downloadItem: DownloadItem;

}