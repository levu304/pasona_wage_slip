import React from "react";
import { Picker, Icon } from "native-base";

class OTTypePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: "0" };
  }

  onValueChange(value) {
    if (value !== "0") {
      this.setState(
        {
          selected: value
        },
        () => {
          this.props.select(this.state.selected);
        }
      );
    }
  }

  render() {
    return (
      <Picker
        style={{ paddingLeft: 12 }}
        mode="dialog"
        iosIcon={<Icon name="ios-arrow-down-outline" />}
        style={{ width: undefined }}
        selectedValue={this.state.selected}
        onValueChange={this.onValueChange.bind(this)}
      >
        <Picker.Item label="Select type" value="0" />
        <Picker.Item label="OT" value="1" />
        <Picker.Item label="OT Night" value="2" />
        <Picker.Item label="HOT" value="3" />
        <Picker.Item label="HOT Night" value="4" />
        <Picker.Item label="NHOT" value="5" />
        <Picker.Item label="NHOT Night" value="6" />
      </Picker>
    );
  }
}

export default OTTypePicker;
