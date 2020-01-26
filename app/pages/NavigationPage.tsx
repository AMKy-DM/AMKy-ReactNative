import React from "react";
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {DownloadsPage} from "./downloads/DownloadsPage";
import {SettingsPage} from "./settings/SettingsPage";
import {config} from "@fortawesome/fontawesome-svg-core";
import {NavigationIconWithBadge} from "../shared/components/NavigationIconWithBadge";
import {
    faCodeBranch,
    faCog,
    faDownload,
    faPlus,
    faPlusSquare,
    faServer,
    faSync
} from "@fortawesome/free-solid-svg-icons";
import {SyncPage} from "./sync/SyncPage";
import {ClustersPage} from "./clusters/ClustersPage";
import {NewDownloadPage} from "./downloads/NewDownloadPage";



const TabNavigator = createBottomTabNavigator(
    {
        "New Download": NewDownloadPage,
        Downloads: DownloadsPage,
        Clusters: ClustersPage,
        Sync: SyncPage,
        Settings: SettingsPage,
    }, {
        tabBarOptions: {
            labelStyle: {
            },
            style: {
                borderTopWidth: 2,
                borderTopColor: '#000',
                backgroundColor: '#111',
                height: '60px',
                paddingTop: '5px',
                paddingBottom: '5px',
            }
        },
        defaultNavigationOptions: (navigationConfig) => ({
            tabBarIcon: (config) => {
                const routeName = navigationConfig.navigation.state.routeName;

                switch (routeName) {
                    case 'New Download': {
                        return (

                            <NavigationIconWithBadge
                                name='New Download'
                                icon={faPlusSquare}
                            />
                        )
                    }
                    case 'Downloads': {
                        return (

                            <NavigationIconWithBadge
                                name={routeName}
                                icon={faDownload}
                                badgeCount={10}
                            />
                        )
                    }
                    case 'Clusters': {
                        return (

                            <NavigationIconWithBadge
                                name={routeName}
                                icon={faServer}
                            />
                        )
                    }
                    case 'Sync': {
                        return (

                            <NavigationIconWithBadge
                                name={routeName}
                                icon={faSync}
                            />
                        )
                    }
                    case 'Settings': {
                        return (

                            <NavigationIconWithBadge
                                name={routeName}
                                icon={faCog}
                            />
                        )
                    }
                }
            },
        })
    }
);

export default createAppContainer(TabNavigator);