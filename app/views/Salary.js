import { StatusBar } from "react-native";
import React from "react";
import {
  Container,
  Content,
  List,
  Text,
  Header,
  Separator,
  Left,
  Right,
  Body,
  Title,
  Button,
  Icon,
  Spinner,
  ActionSheet
} from "native-base";
import Styles from "../assets/style/style";
import { connect } from "react-redux";
import { _isEmpty, _yearsPicker } from "../modules";

import { fetchSalaryByYear } from "../actions/getSalaryByYear";
import SalaryByYearListItem from "../components/SalaryByYearListItem";

class Salary extends React.Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      salaryData: {},
      yearPickerConfig: {}
    };
    this._handlePicker = this._handlePicker.bind(this);
  }

  componentDidMount() {
    if (this.props.header) {
      this._init(this.props.header);
    }
  }

  _init(header) {
    let year = new Date().getFullYear();
    this.props.dispatch(fetchSalaryByYear(year, header)).then(() => {
      this.setState({
        salaryData: this.props.salaryData,
        yearPickerConfig: this._configYearPicker(),
        isLoading: false
      });
    });
  }

  _configYearPicker() {
    let buttons = _yearsPicker.concat("Cancel");
    let cancel = buttons.length - 1;
    return {
      buttons: buttons,
      cancel: cancel
    };
  }

  _handlePicker(index) {
    if (index !== this.state.yearPickerConfig.cancel) {
      this.setState(
        {
          selectedYear: this.state.yearPickerConfig.buttons[index],
          isLoading: true
        },
        () => {
          this.props
            .dispatch(
              fetchSalaryByYear(this.state.selectedYear, this.props.header)
            )
            .then(() => {
              this.setState({
                salaryData: this.props.salaryData,
                isLoading: false
              });
            });
        }
      );
    }
  }

  render() {
    const isLoading = this.state.isLoading;
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
              <Title style={Styles.headerTitle}>Salary</Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon style={Styles.headerButton} name="calendar" />
              </Button>
            </Right>
          </Header>
          <Content>
            <Spinner color="red" />
          </Content>
        </Container>
      );
    } else if (this.state.salaryData === "Data is not available !") {
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
              <Title style={Styles.headerTitle}>Salary</Title>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: this.state.yearPickerConfig.buttons,
                      cancelButtonIndex: this.state.yearPickerConfig.cancel,
                      title: "Select year"
                    },
                    buttonIndex => {
                      this._handlePicker(buttonIndex);
                    }
                  )
                }
              >
                <Icon style={Styles.headerButton} name="calendar" />
              </Button>
            </Right>
          </Header>
          <Content />
        </Container>
      );
    } else {
      let salaryTotal = this.state.salaryData.SalaryTotal;
      salaryTotal.sort((a, b) => {
        let nameA = a.YM.toUpperCase();
        let nameB = b.YM.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      salaryTotal.reverse();
      let items = salaryTotal.map((salary, index) => {
        let year = salary.YM.slice(0, 4);
        let month = salary.YM.slice(4, 6);
        return (
          <SalaryByYearListItem
            key={index}
            year={year}
            month={month}
            salaryData={salary}
          />
        );
      });
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
              <Title style={Styles.headerTitle}>Salary</Title>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: this.state.yearPickerConfig.buttons,
                      cancelButtonIndex: this.state.yearPickerConfig.cancel,
                      title: "Select year"
                    },
                    buttonIndex => {
                      this._handlePicker(buttonIndex);
                    }
                  )
                }
              >
                <Icon style={Styles.headerButton} name="calendar" />
              </Button>
            </Right>
          </Header>
          <Content>
            <List>
              <Separator bordered>
                <Text>Net Salary</Text>
              </Separator>
              {items}
            </List>
          </Content>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    header: state.loginReducer.header,
    salaryData: state.getSalaryByYearReducer.data
  };
};

export default connect(mapStateToProps)(Salary);
