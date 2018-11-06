import React from "react";
import { Picker, Form, Icon } from "native-base";

class LeaveTypePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: "0" };
  }

  onValueChange(value) {
    if (value !== "0") {
      this.setState({
        selected: value
      }, () => {
        this.props.select(this.state.selected);
      });
    }
  }
  
  render() {
    return (
      <Form>
        <Picker
          mode="dialog"
          iosIcon={<Icon name="ios-arrow-down-outline" />}
          style={{ width: undefined }}
          selectedValue={this.state.selected}
          onValueChange={this.onValueChange.bind(this)}
        >
          <Picker.Item label="Select type" value="0" />
          <Picker.Item label="Paid holiday" value="1" />
          <Picker.Item label="Sickness" value="2" />
          <Picker.Item label="Marriage" value="3" />
          <Picker.Item label="Maternity" value="4" />
          <Picker.Item label="Mourning" value="5" />
          <Picker.Item label="Special leave" value="6" />
          <Picker.Item label="Unpaid leave" value="7" />
        </Picker>
      </Form>
    );
  }
}

export default LeaveTypePicker;
