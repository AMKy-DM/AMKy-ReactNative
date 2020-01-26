import React, {Component, FunctionComponent, useContext} from "react";
import {GestureResponderEvent, TouchableWithoutFeedback, View} from "react-native";
import {ThemeModel, ThemeProviderContext} from "../providers/ThemeProvider";
import {RangeModel} from "../models/RangeModel";
import {RangeHelpers} from "../helpers/RangeHelpers";
import {RangeCollapsedModel} from "../models/RangeCollapsedModel";

export interface ProgressBarProps {

    value: number | RangeModel[];

    selectable?: boolean;

    onSelection?(range: RangeModel);

}

export interface ProgressBarState {

    value: number | RangeModel[];

}

interface ProgressBarSegmentProps extends RangeCollapsedModel {

    theme: ThemeModel;
    width: number;

    onClick(): void;

}

const ProgressBarSegment: FunctionComponent<ProgressBarSegmentProps> = (props: ProgressBarSegmentProps) => {

    let state = {enabled: true};

    return (
        <TouchableWithoutFeedback
            onPress={e => props.onClick()}
        >
            <View
                key={`range${props.start}-${props.end}`}
                style={{
                    position: 'absolute',
                    left: props.start + '%',
                    width: props.width + '%',
                    backgroundColor: props.isFilled ? props.theme.progressBarColor : props.theme.progressBarBackgroundColor,
                    minHeight: props.theme.progressBarMinHeight
                }}
            />
        </TouchableWithoutFeedback>
    );
};

export class ProgressBar extends Component<ProgressBarProps, ProgressBarState> {

    static contextType = ThemeProviderContext;

    constructor(props: ProgressBarProps) {
        super(props);

        if (typeof props.value === 'number') {

            this.state = {
                value: props.value
            };

        } else {

            const ranges = RangeHelpers.collapse(props.value, 100, true);

            const stateValue = ranges.map((r: RangeCollapsedModel) => {

                const start = Math.floor(r.start);
                const end = Math.ceil(r.end);

                const width = end - start;

                if (width <= 0) {
                    return null;
                }

                return {

                    start,
                    end,
                    isFilled: r.isFilled,

                    theme: this.context

                } as ProgressBarSegmentProps;

            });

            this.state = {
                value: stateValue
            };
        }
    }

    render() {

        const theme = this.context;

        if (typeof this.state.value === 'number') {
            return (
                <View style={{
                    backgroundColor: theme.progressBarBackgroundColor,
                    minHeight: theme.progressBarMinHeight,
                }}>
                    <ProgressBarSegment
                        key={`range${0}-${this.state.value}`}

                        theme={theme}
                        width={this.state.value}
                        isFilled={true}
                        start={0}
                        end={this.state.value}

                        onClick={() => console.log('click')}
                    />
                </View>
            );
        } else if (this.state.value instanceof Array) {

            return (
                <View style={{
                    backgroundColor: theme.progressBarBackgroundColor,
                    minHeight: theme.progressBarMinHeight,
                }}>
                    {
                        this.state.value.map((v: RangeCollapsedModel) => {

                            return (
                                <ProgressBarSegment
                                    key={`range${v.start}-${v.end}`}

                                    theme={theme}
                                    width={v.end - v.start}
                                    isFilled={v.isFilled}
                                    start={v.start}
                                    end={v.end}

                                    onClick={() => console.log('click')}
                                />
                            )
                        })
                    }
                </View>
            );
        } else {
            return (
                <View style={{
                    backgroundColor: theme.progressBarBackgroundColor,
                    minHeight: theme.progressBarMinHeight,
                }}/>
            )
        }
    }
};