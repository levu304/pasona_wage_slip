import React from "react";
import { Picker, Icon } from "native-base";

class TotalTimeOffPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: "3", isDisable: this.props.disable };
    this.onValueChange = this.onValueChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isDisable !== nextProps.disable) {
      this.setState({ isDisable: nextProps.disable });
    }
  }

  onValueChange(value) {
    this.setState({
      selected: value
    }, () => {
      this.props.select(this.state.selected);
    });
  }

  render() {
    const { isDisable, selected } = this.state;
    return (
        <Picker
          style={{paddingLeft:12}}
          note
          mode="dialog"
          enabled={!isDisable}
          iosIcon={<Icon name="ios-arrow-down-outline" />}
          selectedValue={selected}
          onValueChange={this.onValueChange}
        >
          <Picker.Item label="Full day" value="3" />
          <Picker.Item label="AM" value="1" />
          <Picker.Item label="PM" value="2" />
        </Picker>
    );
  }
}

export default TotalTimeOffPicker;
