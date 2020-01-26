import {DownloadItemState} from "../../shared/state/DownloadItemState";
import {RangeModel} from "../../shared/models/RangeModel";
import * as RNFS from "react-native-fs";

type ChunkDownloadContext = {

    result: ReadableStreamReadResult<Uint8Array>;

};


export class HttpDownloader {


    static downloadItem(item: DownloadItemState, range: RangeModel): Promise<void> {
        return new Promise((resolve, reject) => {

            const method = 'GET';

            fetch(item.downloadItem.uri.uri, {

                method: method,
                mode: "cors",

                headers: {
                    Range: `bytes=${range.start}-${range.end}`,
                    "If-Range": item.eTagSnapshot || item.modifiedSinceSnapshot,
                    "If-Match": item.eTagSnapshot,
                    "If-Unmodified-Since": item.modifiedSinceSnapshot
                }

            }).then(value => {

                const reader = value.body.getReader();

                reader.read().then(value => {

                    return HttpDownloader.chunkDownloaded(item, {
                        result: value,
                    });

                }).catch(reason => {



                });

                resolve();
            }).catch(reason => {

                reject(reason);

            })

        });
    }

    static chunkDownloaded(item: DownloadItemState, context: ChunkDownloadContext): Promise<void> {

        return Promise.resolve();

    }

}