import React from "react";
import { StatusBar } from "react-native";
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
  FooterTab
} from "native-base";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import Styles from "../assets/style/style";
import CustomDatePicker from "../components/CustomDatePicker";
import CustomTimePicker from "./../components/CustomTimePicker";
import OTTypePicker from "./../components/OTTypePicker";
import OvertimeForPicker from './../components/OvertimeForPicker';
import { _isEmpty } from "../modules";


class OverTimeForm extends React.Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      otDate: null,
      otStartTime: null,
      otEndTime: null,
      depts: {},
      dept: {
        name: "Select dept",
        processID: "",
        list: []
      },
      otType: "0",
      overtimeFor: "0"
    };
    this._handleOTDate = this._handleOTDate.bind(this);
    this._handleStartTime = this._handleStartTime.bind(this);
    this._handleEndTime = this._handleEndTime.bind(this);
    this._deptGoBack = this._deptGoBack.bind(this);
    this._handleOTType = this._handleOTType.bind(this);
    this._handleOverTimeFor = this._handleOverTimeFor.bind(this);
  }

  componentDidMount() {
    if (!_isEmpty(this.props.depts)) {
      this.setState({
        depts: this.props.depts
      });
    }
  }

  _handleOTDate(date) {
    this.setState({
      otDate: date
    });
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

  _confirm(){

  }

  render() {
    const dept = this.state.dept;
    const depts = this.state.depts;
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
            <Title style={Styles.headerTitle}>OverTime Form</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <CustomDatePicker
            title="Overtime Day"
            itemTitle="Day"
            selectedDate={this._handleOTDate}
          />
          <CustomTimePicker
            title="Overtime Range"
            startTime={this._handleStartTime}
            endTime={this._handleEndTime}
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
    depts: state.getUsersProcessReducer.data
  };
};

export default withNavigation(connect(mapStateToProps)(OverTimeForm));
