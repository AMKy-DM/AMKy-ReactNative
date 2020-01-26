import {ResourceDescriptor} from "./ResourceDescriptor";

export interface DownloadItem {

    uniqueIdentifier: string;

    displayName: string;

    fileName: string;

    uri: ResourceDescriptor;


}