import React from "react";
import { List, ListItem, Text, Left, Body } from "native-base";
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";

export default class CustomDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: "Select date",
      isDateTimePickerVisible: false
    };
    this._handleDatePicked = this._handleDatePicked.bind(this);
    this._hideDateTimePicker = this._hideDateTimePicker.bind(this);
    this._showDateTimePicker = this._showDateTimePicker.bind(this);
  }

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _handleDatePicked(date) {
    date = moment(date).format("MM/DD/YYYY");
    this.setState(
      {
        selectedDate: date
      },
      () => {
        const { selectedDate } = this.state;
        this.props.selectedDate(selectedDate);
        this._hideDateTimePicker();
      }
    );
  }

  render() {
    const title = this.props.title;
    const itemTitle = this.props.itemTitle;
    const selectedDate = this.state.selectedDate;
    return (
      <List>
        <ListItem onPress={this._showDateTimePicker}>
          <Left>
            <Text>{itemTitle}</Text>
          </Left>
          <Body>
            <Text>{selectedDate}</Text>
          </Body>
        </ListItem>
        <DateTimePicker
            mode="date"
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
      </List>
    );
  }
}
