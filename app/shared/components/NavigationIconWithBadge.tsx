import React, {FunctionComponent, useContext} from "react";
import {View, Text, GestureResponderEvent, TouchableWithoutFeedback} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {ThemeModel, ThemeProviderContext} from "../../../app/shared/providers/ThemeProvider";

export interface IconWithBadgeProps {

    name: string;
    badgeCount?: number;
    colSpan: number;

    icon: any;

}

export const NavigationIconWithBadge : FunctionComponent<IconWithBadgeProps> = (props: IconWithBadgeProps) => {

    const theme = useContext<ThemeModel>(ThemeProviderContext);

    const { name, badgeCount } = props;

    const badgeCountStr = typeof badgeCount === 'number' && badgeCount > 0
        ? (badgeCount > 99 ? `99+` : badgeCount)
        : undefined;

    return (
        <View style={{
            width: (100 / props.colSpan) + '%', height: theme.navBar.iconHeight, margin: theme.navBar.iconMargin }}>

            <FontAwesomeIcon name={name} size={theme.navBar.iconFontSize} color={theme.navBar.badgeColor} icon={props.icon} />

            {typeof badgeCountStr !== 'undefined' && (
                <View
                    style={{
                        // If you're using react-native < 0.57 overflow outside of parent
                        // will not work on Android, see https://git.io/fhLJ8
                        position: 'absolute',
                        right: theme.navBar.badgeRight,
                        top: theme.navBar.badgeTop,
                        backgroundColor: theme.navBar.badgeBackColor,
                        borderRadius: theme.navBar.badgeRadius,
                        width: theme.navBar.badgeWidth,
                        height: theme.navBar.badgeHeight,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 8, fontWeight: 'bold' }}>
                        {badgeCount}
                    </Text>
                </View>
            )}
        </View>
    );
};
