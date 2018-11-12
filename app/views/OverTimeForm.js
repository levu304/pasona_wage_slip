import React from "react";
import { StatusBar, Alert } from "react-native";
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Button,
  Content,
  Icon,
  Title,
  List,
  ListItem,
  Text,
  Footer,
  FooterTab,
  Input
} from "native-base";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import Styles from "../assets/style/style";
import CustomDatePicker from "../components/CustomDatePicker";
import CustomTimePicker from "./../components/CustomTimePicker";
import OTTypePicker from "./../components/OTTypePicker";
import OvertimeForPicker from "./../components/OvertimeForPicker";
import { _isEmpty, _getOTime } from "../modules";
import { createOvertime } from "../actions/createOvertime";
import { fetchTimeSheet } from "../actions/getTimeSheet";
import SpinnerOverLay from "react-native-loading-spinner-overlay";

class OverTimeForm extends React.Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      valueTxtOT: "",
      subject: "",
      otDate: null,
      otStartTime: null,
      otEndTime: null,
      deductTime: "",
      depts: {},
      dept: {
        name: "Select dept",
        processID: "",
        list: []
      },
      otType: "0",
      overtimeFor: "0",
      reason: "",
      canConfirm: false,
      isConfirm: false
    };
    this._handleOTDate = this._handleOTDate.bind(this);
    this._setValueTxtOT = this._setValueTxtOT.bind(this);
    this._handleStartTime = this._handleStartTime.bind(this);
    this._handleEndTime = this._handleEndTime.bind(this);
    this._handleDeductTime = this._handleDeductTime.bind(this);
    this._deptGoBack = this._deptGoBack.bind(this);
    this._handleOTType = this._handleOTType.bind(this);
    this._handleOverTimeFor = this._handleOverTimeFor.bind(this);
    this._onChangeSubject = this._onChangeSubject.bind(this);
    this._onChangeReason = this._onChangeReason.bind(this);
    this._confirm = this._confirm.bind(this);
  }

  componentDidMount() {
    if (!_isEmpty(this.props.depts)) {
      this.setState({
        depts: this.props.depts
      });
    }
  }

  _onChangeSubject(text) {
    this.setState({
      subject: text
    });
  }

  _handleOTDate(date) {
    this.setState(
      {
        otDate: date
      },
      () => {
        const timeSheetData = this.props.timeSheetData;
        const otDate = this.state.otDate;
        let dateTime = otDate.split("/");
        if (timeSheetData.length === 0) {
          this.props
            .dispatch(
              fetchTimeSheet(dateTime[2], dateTime[0], this.props.header)
            )
            .then(() => {
              this._setValueTxtOT(this.props.timeSheetData.result, dateTime[1]);
            });
        } else {
          this._setValueTxtOT(timeSheetData.result, dateTime[1]);
        }
      }
    );
  }

  _setValueTxtOT(data, day) {
    day = day.replace("0", "");
    if (!_isEmpty(data[2]) && data[2].hasOwnProperty(day)) {
      this.setState({
        valueTxtOT: data[2][day][0].valueTxtOT,
        canConfirm: true
      });
    } else {
      this.setState({
        canConfirm: true
      });
    }
  }

  _handleStartTime(time) {
    this.setState({
      otStartTime: time
    });
  }

  _handleEndTime(time) {
    this.setState({
      otEndTime: time
    });
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

  _handleOTType(type) {
    this.setState({ otType: type });
  }

  _handleOverTimeFor(project) {
    this.setState({ overtimeFor: project });
  }

  _handleDeductTime(time) {
    this.setState({
      deductTime: time
    });
  }

  _onChangeReason(text) {
    this.setState({
      reason: text
    });
  }

  _validateForm(
    subject,
    otDate,
    otStartTime,
    otEndTime,
    deductTime,
    dept,
    otType,
    overtimeFor,
    reason
  ) {
    return subject !== "" &&
      otDate !== null &&
      otStartTime !== null &&
      otEndTime !== null &&
      deductTime !== "" &&
      dept.list.length !== 0 &&
      otType !== "0" &&
      overtimeFor !== "0" &&
      reason !== ""
      ? true
      : false;
  }

  _confirm() {
    const {
      valueTxtOT,
      subject,
      otDate,
      otStartTime,
      otEndTime,
      deductTime,
      dept,
      otType,
      overtimeFor,
      reason,
      canConfirm
    } = this.state;
    const { header } = this.props;
    if (
      this._validateForm(
        subject,
        otDate,
        otStartTime,
        otEndTime,
        deductTime,
        dept,
        otType,
        overtimeFor,
        reason
      )
    ) {
      if (canConfirm) {
        this.setState(
          {
            isConfirm: true
          },
          () => {
            let timeOT = _getOTime(otStartTime, otEndTime, deductTime);
            let valueText = "";
            if (valueTxtOT === "") {
              valueText =
                "<span style='font-weight: bold;background:white;color:red'>" +
                timeOT +
                "</span>";
            } else {
              valueText =
                valueTxtOT +
                "|  <span style='font-weight: bold;background:white;color:red'>" +
                timeOT +
                "</span>";
            }
            let listApproval = dept.list.map(dept => dept.empID);

            let otData = {
              Reason: reason,
              Subject: subject,
              ProjectID: overtimeFor,
              TimeF2TimeT: otStartTime + " ~ " + otEndTime,
              ValueText: valueText,
              Value: timeOT,
              ProcessID: dept.processID,
              DatEffect: otDate,
              OTType: otType,
              DeductTime: deductTime,
              LstEmpApproval: listApproval
            };
            this.props.dispatch(createOvertime(header, otData)).then(() => {
              this.setState(
                {
                  isConfirm: false
                },
                () => {
                  if (this.props.error) {
                    console.log(this.props.error);
                    Alert.alert(
                      "Alert",
                      this.props.error,
                      [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                      ],
                      { cancelable: false }
                    );
                  } else {
                    Alert.alert(
                      "",
                      "Register OT is successful!",
                      [{ text: "OK", onPress: this._goBack }],
                      { cancelable: false }
                    );
                  }
                }
              );
            });
          }
        );
      }
    } else {
      Alert.alert(
        "Alert",
        "Please fill all information",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  }

  _goBack(){
    this.props.navigation.goBack();
  }

  render() {
    const dept = this.state.dept;
    const depts = this.state.depts;
    return (
      <Container>
        <SpinnerOverLay
          visible={this.state.isConfirm}
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
            <Title style={Styles.headerTitle}>OverTime Form</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Input
            style={Styles.otInputSubject}
            value={this.state.subject}
            placeholder="Input Subject"
            onChangeText={text => {
              this._onChangeSubject(text);
            }}
          />
          <Input
            style={Styles.otInputSubject}
            value={this.state.reason}
            placeholder="Input reason"
            onChangeText={text => {
              this._onChangeReason(text);
            }}
          />
          <CustomDatePicker
            title="Overtime Day"
            itemTitle="Day"
            selectedDate={this._handleOTDate}
          />
          <CustomTimePicker
            title="Overtime Range"
            startTime={this._handleStartTime}
            endTime={this._handleEndTime}
            deductTime={this._handleDeductTime}
          />
          <List>
            <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
              <Left>
                <Text>Overtime For</Text>
              </Left>
              <Body>
                <OvertimeForPicker select={this._handleOverTimeFor} />
              </Body>
            </ListItem>
            <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
              <Left>
                <Text>Type</Text>
              </Left>
              <Body>
                <OTTypePicker select={this._handleOTType} />
              </Body>
            </ListItem>
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

const mapStateToProps = state => {
  return {
    header: state.loginReducer.header,
    depts: state.getUsersProcessReducer.data,
    timeSheetData: state.timeSheetReducer.data,
    error: state.createOvertimeReducer.error,
    result: state.createOvertimeReducer.result
  };
};

export default withNavigation(connect(mapStateToProps)(OverTimeForm));
