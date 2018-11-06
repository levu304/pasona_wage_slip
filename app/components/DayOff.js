import React from "react";
import { ListItem, Left, Body, Text } from "native-base";
import { _isEmpty } from "../modules";

class DayOff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayOff: "0.0"
    };
  }

  componentDidMount() {
    const dayOffData = this.props.dayOff;
    if(!_isEmpty(dayOffData)){
      this.setState({ dayOff: dayOffData.countDays });
    } 
  }

  render() {
    return (
      <ListItem>
        <Left>
          <Text>Day off</Text>
        </Left>
        <Body>
          <Text style={{ textAlign: "right" }}>{this.state.dayOff}</Text>
        </Body>
      </ListItem>
    );
  }
}

export default DayOff;
