import {DownloadItemState} from "../../shared/state/DownloadItemState";


export interface DownloadJob {

    state: DownloadItemState;


    start(): void;

    pause(): void;

    stop(): void;

}