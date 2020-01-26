import React, {Component} from "react";
import {GestureResponderEvent, StyleProp, StyleSheet, TouchableWithoutFeedback, View, Text, ViewStyle, Animated} from "react-native";

var ACTION_TIMER = 400;
var COLORS = ['rgb(255,255,255)', 'rgb(111,235,62)'];



export interface ExtendedTouchEventsProps {

    style: StyleProp<ViewStyle>;

    delay: number;

    onHoldDown?();

}

export interface ExtendedTouchEventsState {


    pressAction: Animated.Value;
    textComplete: string;
    buttonWidth: number;
    buttonHeight: number;
    text: string;

}


export class ExtendedTouchEvents extends Component<ExtendedTouchEventsProps, ExtendedTouchEventsState> {

    private _value;

    styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
        button: {
            padding: 10,
            borderWidth: 3,
            borderColor: '#111'
        },
        text: {
            backgroundColor: 'transparent',
            color: '#111'
        },
        bgFill: {
            position: 'absolute',
            top: 0,
            left: 0
        }
    });

    constructor(props: ExtendedTouchEventsProps) {
        super(props);

        this.getButtonWidthLayout = this.getButtonWidthLayout.bind(this);
        this.getProgressStyles = this.getProgressStyles.bind(this);
        this.animationActionComplete = this.animationActionComplete.bind(this);
        this.handlePressIn = this.handlePressIn.bind(this);
        this.handlePressOut = this.handlePressOut.bind(this);

        this.state = {
            buttonWidth: 0,
            buttonHeight: 0,
            pressAction: new Animated.Value(0),
            textComplete: '',
            text: ''
        };
    }

    componentWillMount() {
        this._value = 0;
        this.state.pressAction.addListener((v) => this._value = v.value);
    }

    handlePressIn() {
        Animated.timing(this.state.pressAction, {
            duration: ACTION_TIMER,
            toValue: 1
        }).start(this.animationActionComplete);
    }

    handlePressOut() {
        Animated.timing(this.state.pressAction, {
            duration: this._value * ACTION_TIMER,
            toValue: 0
        }).start();
    }

    animationActionComplete() {

        if (this.props.onHoldDown) {
            this.props.onHoldDown();
        }

    }

    getButtonWidthLayout(e) {
        this.setState({
            buttonWidth: e.nativeEvent.layout.width - 6,
            buttonHeight: e.nativeEvent.layout.height - 6
        });
    }

    getProgressStyles() {
        const width = this.state.pressAction.interpolate({
            inputRange: [0, 1],
            outputRange: [0, this.state.buttonWidth]
        });

        const bgColor = this.state.pressAction.interpolate({
            inputRange: [0, 1],
            outputRange: COLORS
        });

        return {
            width: width,
            height: this.state.buttonHeight,
            backgroundColor: bgColor
        }
    }

    render() {

        return (
            <View style={this.styles.container}>
                <TouchableWithoutFeedback
                    onPressIn={this.handlePressIn}
                    onPressOut={this.handlePressOut}
                >
                    <View style={this.styles.button}  onLayout={this.getButtonWidthLayout}>
                        <Animated.View  style={[this.styles.bgFill, this.getProgressStyles()]} />
                        {this.props.children}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

}