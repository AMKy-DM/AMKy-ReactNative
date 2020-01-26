import React, {FunctionComponent} from "react";
import {View, Text, GestureResponderEvent, TouchableWithoutFeedback} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

export interface IconWithBadgeProps {

    name: string;
    badgeCount?: number;
    colSpan: number;

    icon: any;

}

export const NavigationIconWithBadge : FunctionComponent<IconWithBadgeProps> = (props: IconWithBadgeProps) => {

    const { name, badgeCount } = props;
    return (
        <View style={{
            width: (100 / props.colSpan) + '%', height: 24, margin: 5 }}>
            <FontAwesomeIcon name={name} size={20} color={'white'} icon={props.icon} />
            {typeof badgeCount === 'number' && badgeCount > 0 && (
                <View
                    style={{
                        // If you're using react-native < 0.57 overflow outside of parent
                        // will not work on Android, see https://git.io/fhLJ8
                        position: 'absolute',
                        right: -10,
                        top: -5,
                        backgroundColor: 'red',
                        borderRadius: 10,
                        width: 20,
                        height: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                        {badgeCount}
                    </Text>
                </View>
            )}
        </View>
    );
};
