import React from "react";
import { View, Separator, ListItem, Left, Body, Text } from "native-base";
import { _isEmpty, _monthList, _timeToHours, _hoursToTime } from "../modules";
import DayOff from "./DayOff";

class TimeSheetListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _workingTime(start, end) {
    let dayOff = this.props.dayOff;
    if (!_isEmpty(dayOff) && dayOff.partDay === "3") {
      return "00:00";
    }
    start = _timeToHours(start);
    end = _timeToHours(end);
    let time = end - start;
    return time < 8 ? _hoursToTime(time) : "08:00";
  }

  _lateTime(start) {
    let dayOff = this.props.dayOff;
    if (!_isEmpty(dayOff) && dayOff.partDay === "1") {
      return "00:00";
    }
    start = _timeToHours(start);
    let end = _timeToHours("08:00");
    let time = end - start;
    return time >= 0 ? "00:00" : _hoursToTime(time);
  }

  _earlyTime(end) {
    let dayOff = this.props.dayOff;
    if (!_isEmpty(dayOff) && dayOff.partDay === "2") {
      return "00:00";
    }
    let start = _timeToHours("17:00");
    end = _timeToHours(end);
    let time = end - start;
    return time >= 0 ? "00:00" : _hoursToTime(time);
  }

  _setOvertimeValue(textValue) {
    let values = textValue.split("|");
    let result = _timeToHours("00:00");

    for (let i = 0; i < values.length; i++) {
      if (values[i].indexOf("green") !== -1) {
        let div = document.createElement("div");
        div.innerHTML = values[i].trim();
        result += _timeToHours(div.firstChild.innerHTML);
      }
    }
    return _hoursToTime(result);
  }

  render() {
    const year = this.props.year;
    const month = this.props.month;
    const day = this.props.dayData;
    const dayOff = this.props.dayOff;
    if (year && month && !_isEmpty(day)) {
      return (
        <View>
          <Separator bordered>
            <Text>
              ({day.nDayofWeek}) {day.nDay}, {_monthList[month - 1]}, {year}
            </Text>
          </Separator>
          <ListItem>
            <Left>
              <Text>First-In Time</Text>
            </Left>
            <Body>
              <Text style={{ textAlign: "right" }}>{day.nTimeStart}</Text>
            </Body>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Last-out Time</Text>
            </Left>
            <Body>
              <Text style={{ textAlign: "right" }}>{day.nTimeEnd}</Text>
            </Body>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Working Time</Text>
            </Left>
            <Body>
              <Text style={{ textAlign: "right" }}>
                {this._workingTime(day.nTimeStart, day.nTimeEnd)}
              </Text>
            </Body>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Late</Text>
            </Left>
            <Body>
              <Text style={{ textAlign: "right" }}>
                {this._lateTime(day.nTimeStart)}
              </Text>
            </Body>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Early</Text>
            </Left>
            <Body>
              <Text style={{ textAlign: "right" }}>
                {this._earlyTime(day.nTimeEnd)}
              </Text>
            </Body>
          </ListItem>
          <DayOff
            day={day.nDay}
            month={_monthList[month - 1]}
            year={year}
            dayOff={dayOff}
          />
          <ListItem>
            <Left>
              <Text>OT</Text>
            </Left>
            <Body>
              <Text style={{ textAlign: "right" }}>
                {this._setOvertimeValue(day.valueTxtOT)}
              </Text>
            </Body>
          </ListItem>
        </View>
      );
    }
  }
}

export default TimeSheetListItem;
