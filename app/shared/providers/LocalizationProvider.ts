import React from "react";

export interface LocalizationModel {

    download: string;
    downloadAll: string;

    pause: string;
    cancel: string;

}

export class EnglishLocalization implements LocalizationModel {

    download = 'Download';
    downloadAll = 'Download All';

    pause = 'Pause';
    cancel = 'Cancel';

}

export const DefaultLocalization = new EnglishLocalization();

export const LocalizationProviderContext = React.createContext<LocalizationModel>(DefaultLocalization);

export const LocalizationProvider = LocalizationProviderContext.Provider;
export const LocalizationConsumer = LocalizationProviderContext.Consumer;