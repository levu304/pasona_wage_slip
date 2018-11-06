import React from "react";
import { StatusBar } from "react-native";
import {
  Container,
  Content,
  List,
  Header,
  Left,
  Right,
  Body,
  Title,
  Button,
  Icon,
  Spinner
} from "native-base";
import Styles from "../assets/style/style";
import { connect } from "react-redux";
import { _isEmpty, _yearsPicker, _monthList } from "../modules";

import { fetchTimeSheet } from "../actions/getTimeSheet";
import TimeSheetListItem from "../components/TimeSheetListItem";
import Picker from "react-native-picker";

class TimeSheet extends React.Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      selectedDate: [
        _monthList[new Date().getMonth()],
        new Date().getFullYear().toString()
      ]
    };
    this._showPicker = this._showPicker.bind(this);
    this._selectDate = this._selectDate.bind(this);
  }

  componentDidMount() {
    if (this.props.header) {
      this._init(this.props.header);
    }
  }

  _init(header) {
    let date = new Date();
    this.props
      .dispatch(fetchTimeSheet(date.getFullYear(), date.getMonth() + 1, header))
      .then(() => {
        this.setState(
          {
            timeSheetData: this.props.timeSheetData,
            isLoading: false
          },
          () => {
            Picker.init({
              pickerData: [_monthList, _yearsPicker],
              selectedValue: this.state.selectedDate,
              pickerToolBarBg: [238, 238, 238, 1],
              pickerBg: [238, 238, 238, 1],
              pickerTitleText: "",
              pickerConfirmBtnText: "Select",
              pickerCancelBtnText: "Cancel",
              onPickerConfirm: data => {
                this._selectDate(data);
              }
            });
          }
        );
      });
  }

  _showPicker() {
    Picker.show();
  }

  _selectDate(data) {
    this.setState(
      {
        selectedDate: data,
        isLoading: true
      },
      () => {
        this.props
          .dispatch(
            fetchTimeSheet(
              this.state.selectedDate[1],
              _monthList.indexOf(this.state.selectedDate[0]) + 1,
              this.props.header
            )
          )
          .then(() => {
            this.setState({
              timeSheetData: this.props.timeSheetData,
              isLoading: false
            });
          });
      }
    );
  }

  _setDayOff(dayOffData, day){
    for (let key in dayOffData) {
      if (key.toString() === day.toString()) {
        return dayOffData[key][0];
      }
    }
    return {};
  }

  render() {
    const isLoading = this.state.isLoading;
    const timeSheetData = this.state.timeSheetData;
    if (isLoading) {
      return (
        <Container>
          <Header style={Styles.header} toolbarBtnTextColor="#fff">
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <Icon style={Styles.headerButton} name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title style={Styles.headerTitle}>Time sheet</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <Spinner color="red" />
          </Content>
        </Container>
      );
    } else if (!timeSheetData) {
      return (
        <Container>
          <Header style={Styles.header} toolbarBtnTextColor="#fff">
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <Icon style={Styles.headerButton} name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title style={Styles.headerTitle}>Time sheet</Title>
            </Body>
            <Right>
              <Button transparent onPress={this._showPicker}>
                <Icon style={Styles.headerButton} name="calendar" />
              </Button>
            </Right>
          </Header>
          <Content />
        </Container>
      );
    } else {
      let days = timeSheetData.result[0].map((day, index) => (
        <TimeSheetListItem
          key={index}
          year={timeSheetData.year}
          month={timeSheetData.month}
          dayData={day}
          dayOff={
            this._setDayOff(timeSheetData.result[1], day.nDay)
          }
        />
      ));
      return (
        <Container>
          <Header style={Styles.header} toolbarBtnTextColor="#fff">
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <Icon style={Styles.headerButton} name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title style={Styles.headerTitle}>Time sheet</Title>
            </Body>
            <Right>
              <Button transparent onPress={this._showPicker}>
                <Icon style={Styles.headerButton} name="calendar" />
              </Button>
            </Right>
          </Header>
          <Content>
            <List>{days}</List>
          </Content>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    header: state.loginReducer.header,
    timeSheetData: state.timeSheetReducer.data
  };
};

export default connect(mapStateToProps)(TimeSheet);
