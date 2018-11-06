import React from "react";
import { Picker, Form, Icon } from "native-base";

class DeptsPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: undefined };
  }
  onValueChange(value) {
    if (value !== "key0") {
      this.setState(
        {
          selected: value
        },
        () => {
          const depts = this.props.data;
          let temp = [];
          let processID = "";
          for (let key in depts) {
            if (depts[key].Name === value) {
              processID = key;
              temp = depts[key].lstEmpPro;
              break;
            }
          }
          this.props.onSelectDept(this.state.selected, processID, temp);
        }
      );
    }
  }
  render() {
    const depts = this.props.data;
    let items = [];
    items.push(<Picker.Item key={"key0"} label="Select dept" value="key0" />);
    for (let key in depts) {
      if (depts.hasOwnProperty(key)) {
        items.push(
          <Picker.Item
            key={key}
            label={depts[key].Name}
            value={depts[key].Name}
          />
        );
      }
    }
    return (
      <Form>
        <Picker
          mode="dialog"
          iosIcon={<Icon name="ios-arrow-down-outline" />}
          placeholder="Select dept"
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          style={{ width: undefined }}
          selectedValue={this.state.selected}
          onValueChange={this.onValueChange.bind(this)}
        >
          {items}
        </Picker>
      </Form>
    );
  }
}

export default DeptsPicker;
