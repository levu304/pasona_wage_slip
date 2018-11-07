import React from "react";
import { List, ListItem, Text, Left, Body, Input, Form } from "native-base";
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";

export default class CustomTimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: "Select time",
      endTime: "Select time",
      isStartVisible: false,
      isEndVisible: false,
      deductTime: ""
    };
    this._hideStartPicker = this._hideStartPicker.bind(this);
    this._showStartPicker = this._showStartPicker.bind(this);
    this._hideEndPicker = this._hideEndPicker.bind(this);
    this._showEndPicker = this._showEndPicker.bind(this);
    this._handleEndPicked = this._handleEndPicked.bind(this);
    this._handleStartPicked = this._handleStartPicked.bind(this);
    this._onChangeDeductTime = this._onChangeDeductTime.bind(this);
  }

  _hideStartPicker = () => this.setState({ isStartVisible: false });

  _showStartPicker = () => this.setState({ isStartVisible: true });

  _hideEndPicker = () => this.setState({ isEndVisible: false });

  _showEndPicker = () => this.setState({ isEndVisible: true });

  _handleEndPicked(time) {
    time = moment(time).format("hh:mm");
    this.setState(
      {
        endTime: time
      },
      () => {
        const { endTime } = this.state;
        this.props.endTime(endTime);
        this._hideEndPicker();
      }
    );
  }

  _handleStartPicked(time) {
    time = moment(time).format("HH:mm");
    this.setState(
      {
        startTime: time
      },
      () => {
        const { startTime } = this.state;
        this.props.startTime(startTime);
        this._hideStartPicker();
      }
    );
  }

  _onChangeDeductTime(text) {
    this.setState({
      deductTime: text
    });
  }

  render() {
    const title = this.props.title;
    const startTime = this.state.startTime;
    const endTime = this.state.endTime;
    return (
      <List>
        <ListItem onPress={this._showStartPicker}>
          <Left>
            <Text>Start time</Text>
          </Left>
          <Body>
            <Text>{startTime}</Text>
          </Body>
        </ListItem>
        <ListItem onPress={this._showEndPicker}>
          <Left>
            <Text>End Time</Text>
          </Left>
          <Body>
            <Text>{endTime}</Text>
          </Body>
        </ListItem>
        <ListItem style={{paddingTop:0, paddingBottom:0}}>
          <Left>
            <Text>Deduct hours</Text>
          </Left>
          <Body>
              <Input
                style={{paddingLeft:12}}
                value={this.state.deductTime}
                placeholder="Input deduct hours"
                keyboardType = 'numeric'
                onChangeText={text => {this._onChangeDeductTime(text)}}
              />
          </Body>
        </ListItem>
        <DateTimePicker
          mode="time"
          isVisible={this.state.isStartVisible}
          onConfirm={this._handleStartPicked}
          onCancel={this._hideStartPicker}
        />
        <DateTimePicker
          mode="time"
          isVisible={this.state.isEndVisible}
          onConfirm={this._handleEndPicked}
          onCancel={this._hideEndPicker}
        />
      </List>
    );
  }
}
