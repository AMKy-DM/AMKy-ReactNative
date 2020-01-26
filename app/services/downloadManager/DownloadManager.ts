import {DownloadItemState} from "../../shared/state/DownloadItemState";
import {DownloadJob} from "./DownloadJob";

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

type JobContext = {

    downloadManager: DownloadManager;
    job: DownloadJob;

};

export class DownloadManager {

    private static downloadJobs: DownloadJob[] = [];

    addItem(downloadItem: DownloadItemState): DownloadJob {

        const jobContext = {

            downloadManager: this,
            job: undefined

        } as JobContext;

        const jobStartDelegate = this.jobStart.bind(jobContext);
        const jobStopDelegate = this.jobStop.bind(jobContext);
        const jobPauseDelegate = this.jobPause.bind(jobContext);

        const job = {

            state: downloadItem,

            start: jobStartDelegate,
            stop: jobStopDelegate,
            pause: jobPauseDelegate,

        } as DownloadJob;

        jobContext.job = job;

        job.start();

        DownloadManager.downloadJobs[downloadItem.downloadItem.uniqueIdentifier] = job;

        return job;
    }

    removeItem(uniqueIdentifier: string): void {

        const job = DownloadManager.downloadJobs[uniqueIdentifier] as DownloadJob;

        if (typeof job !== 'undefined') {

            job.stop();

        }

        delete DownloadManager.downloadJobs[uniqueIdentifier];
    }

    getJobs(): DownloadJob[] {

        return DownloadManager.downloadJobs;
    }


    jobStart(this: JobContext) {
        const state = this.job.state;


    }

    jobPause(this: JobContext) {
        const state = this.job.state;

    }

    jobStop(this: JobContext) {
        const state = this.job.state;

    }


    makeId(length) {
        let result = '';

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return result;
    }
}