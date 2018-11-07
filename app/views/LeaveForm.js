import React from "react";
import { StatusBar, Alert } from "react-native";
import { withNavigation } from "react-navigation";
import Styles from "../assets/style/style";
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Body,
  Title,
  Button,
  Icon,
  Spinner,
  List,
  ListItem,
  Text,
  Textarea,
  Footer,
  FooterTab,
  DatePicker
} from "native-base";
import { postAbsent } from "../actions/createAbsent";
import { connect } from "react-redux";
import TotalTimeOffPicker from "../components/TotalTimeOffPicker";
import LeaveTypePicker from "../components/LeaveTypePicker";
import moment from "moment";
import SpinnerOverLay from "react-native-loading-spinner-overlay";
import { _dateDifference, _exportDays, _isEmpty } from "../modules";

class LeaveForm extends React.Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isPostAbsent: false,
      depts: {},
      dept: {
        name: "Select dept",
        processID: "",
        list: []
      },
      date: {
        fromDate: "",
        toDate: ""
      },
      totalType: {
        disable: true,
        value: "3"
      },
      leaveType: "0",
      reason: ""
    };
    this._deptGoBack = this._deptGoBack.bind(this);
    this._setFromDate = this._setFromDate.bind(this);
    this._setToDate = this._setToDate.bind(this);
    this._handleTotalTime = this._handleTotalTime.bind(this);
    this._handleLeaveType = this._handleLeaveType.bind(this);
    this._onChangeReason = this._onChangeReason.bind(this);
    this._confirm = this._confirm.bind(this);
    this._goBack = this._goBack.bind(this);
  }

  componentDidMount() {
    if(!_isEmpty(this.props.depts)){
      this.setState({
        depts: this.props.depts,
        isLoading: false
      });
    }
  }

  _deptGoBack(deptName, processID, deptList) {
    this.setState({
      dept: {
        name: deptName,
        processID: processID,
        list: deptList
      }
    });
  }

  _setFromDate(date) {
    date = moment(date).format("MM/DD/YYYY");
    const toDate = this.state.date.toDate;
    if (toDate === date) {
      this.setState({
        totalType: {
          value: "3",
          disable: false
        },
        date: {
          fromDate: date,
          toDate: toDate
        }
      });
    } else {
      this.setState({
        totalType: {
          value: "3",
          disable: true
        },
        date: {
          fromDate: date,
          toDate: toDate
        }
      });
    }
  }

  _setToDate(date) {
    date = moment(date).format("MM/DD/YYYY");
    const fromDate = this.state.date.fromDate;
    if (date === fromDate) {
      this.setState({
        totalType: {
          disable: false,
          value: "3"
        },
        date: {
          fromDate: fromDate,
          toDate: date
        }
      });
    } else {
      this.setState({
        totalType: {
          disable: true,
          value: "3"
        },
        date: {
          fromDate: fromDate,
          toDate: date
        }
      });
    }
  }

  _handleTotalTime(type) {
    this.setState({
      totalType: {
        disable: false,
        value: type
      }
    });
  }

  _handleLeaveType(type) {
    this.setState({ leaveType: type });
  }

  _onChangeReason(text) {
    this.setState({ reason: text });
  }

  _confirm() {
    const { dept, totalType, leaveType, reason, date } = this.state;
    let fromDate = Date.parse(date.fromDate);
    let toDate = Date.parse(date.toDate);
    if (fromDate > toDate) {
      Alert.alert(
        "Alert",
        "To Date must be larger than From Date",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } else {
      if (
        dept.list.length === 0 ||
        leaveType === "0" ||
        reason === "" ||
        date.fromDate === "" ||
        date.toDate === ""
      ) {
        Alert.alert(
          "Alert",
          "Please fill all information",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      } else {
        this.setState(
          {
            isPostAbsent: true
          },
          this._postLeaveForm(date, totalType, leaveType, dept, reason)
        );
      }
    }
  }

  _postLeaveForm(date, totalType, leaveType, dept, reason) {
    const header = this.props.header;
    let valueText = "";
    date.fromDate === date.toDate
      ? (valueText = date.fromDate)
      : (valueText = date.fromDate + " ~ " + date.toDate);
    let listApproval = dept.list.map(dept => dept.empID);
    let absentData = {
      ValueText: valueText,
      Reason: reason,
      CountDays: _dateDifference(date.fromDate, date.toDate).toFixed(1),
      Value: _exportDays(date.fromDate, date.toDate),
      ProcessID: dept.processID,
      DatEffect: moment(date.fromDate).format("MM/DD/YYYY"),
      LeaveType: leaveType,
      PartDays: totalType.value,
      LstEmpApproval: listApproval
    };

    this.props.dispatch(postAbsent(header, absentData)).then(() => {
      this.setState(
        {
          isPostAbsent: false
        },
        () => {
          if (this.props.error) {
            console.log(this.props.error);
            Alert.alert(
              "Alert",
              this.props.error,
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
            );
          } else {
            console.log(this.props.result);
            Alert.alert(
              "",
              "Register Absent is successful !",
              [{ text: "OK", onPress: this._goBack }],
              { cancelable: false }
            );
          }
        }
      );
    });
  }

  _goBack() {
    this.props.navigation.goBack();
  }

  render() {
    const { isLoading, depts, dept, totalType } = this.state;

    if (isLoading) {
      return (
        <Container>
          <Header style={Styles.header} toolbarBtnTextColor="#fff">
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <Left>
              <Button transparent onPress={() => this.props.navigation.pop()}>
                <Icon style={Styles.headerButton} name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title style={Styles.headerTitle}>Leave form</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <Spinner color="red" />
          </Content>
        </Container>
      );
    } else {
      return (
        <Container>
          <SpinnerOverLay
            visible={this.state.isPostAbsent}
            textContent={"Loading..."}
            textStyle={Styles.spinnerTextStyle}
          />
          <Header style={Styles.header} toolbarBtnTextColor="#fff">
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <Left>
              <Button transparent onPress={() => this.props.navigation.pop()}>
                <Icon style={Styles.headerButton} name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title style={Styles.headerTitle}>Leave form</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <List>
              <ListItem style={{ paddingTop: 5, paddingBottom: 5 }}>
                <Left>
                  <Text>From Date</Text>
                </Left>
                <Body>
                  <DatePicker
                    style={{ paddingLeft: 0 }}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Select date"
                    textStyle={{ color: "blue" }}
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={this._setFromDate}
                  />
                </Body>
              </ListItem>
              <ListItem style={{ paddingTop: 5, paddingBottom: 5 }}>
                <Left>
                  <Text>To Date (Optional)</Text>
                </Left>
                <Body>
                  <DatePicker
                    style={{ paddingLeft: 0 }}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Select date"
                    textStyle={{ color: "blue" }}
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={this._setToDate}
                  />
                </Body>
              </ListItem>
            </List>
            <List>
              <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
                <Left>
                  <Text>Total of time off</Text>
                </Left>
                <Body>
                  <TotalTimeOffPicker
                    disable={totalType.disable}
                    select={this._handleTotalTime}
                  />
                </Body>
              </ListItem>
            </List>
            <List>
              <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
                <Left>
                  <Text>Type</Text>
                </Left>
                <Body>
                  <LeaveTypePicker select={this._handleLeaveType} />
                </Body>
              </ListItem>
            </List>
            <List>
              <ListItem
                onPress={() => {
                  this.props.navigation.navigate("Dept", {
                    depts: depts,
                    deptGoBack: this._deptGoBack
                  });
                }}
              >
                <Left>
                  <Text>Dept</Text>
                </Left>
                <Body>
                  <Text>{dept.name}</Text>
                </Body>
              </ListItem>
            </List>
            <Textarea
              rowSpan={5}
              bordered
              placeholder="Input reason"
              style={Styles.textArea}
              onChangeText={text => {
                this._onChangeReason(text);
              }}
            />
          </Content>
          <Footer>
            <FooterTab>
              <Button style={Styles.footerButton} full onPress={this._confirm}>
                <Text>Confirm</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    header: state.loginReducer.header,
    error: state.postAbsentReducer.error,
    result: state.postAbsentReducer.result,
    depts: state.getUsersProcessReducer.data
  };
};

export default withNavigation(connect(mapStateToProps)(LeaveForm));
