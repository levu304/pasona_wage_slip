import React from "react";
import { StatusBar } from "react-native";
import {
  Container,
  Header,
  Content,
  Left,
  Body,
  Right,
  Title,
  Subtitle,
  Button,
  Icon,
  Spinner,
  List
} from "native-base";
import Styles from "../assets/style/style";
import { connect } from "react-redux";
import {_monthList, _isEmpty} from "../modules";

import BasicSalary from "../components/BasicSalary";
import Allowances from "../components/Allowances";
import Subsidy from "../components/Subsidy";
import Deduction from "../components/Deduction";
import Insurances from "../components/Insurances";
import Articles from "../components/Articles";
import NetSalary from "../components/NetSalary";

class SalaryDetail extends React.Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      salaryDetail: {}
    };
  }

  _netSalary(salaryDetail){
    let sub1 = salaryDetail.Basic;
    let sub2 = salaryDetail.Title + salaryDetail.Japanese + salaryDetail.Adjusment;
    let sub3 = salaryDetail.Gas + salaryDetail.Lunch + salaryDetail.OTTotal - (salaryDetail.DedcuGas_luch + salaryDetail.DedcuOTher) + salaryDetail.AjTaxbale;
    let sub4 = salaryDetail.Social + salaryDetail.Health + salaryDetail.UnEmp + salaryDetail.Trade + salaryDetail.PIT;

    return sub1 + sub2 + sub3 - sub4 + salaryDetail.AjNoneTax;

  }

  componentDidMount() {
    if (this.props.navigation) {
      let year = this.props.navigation.getParam("year");
      let month = this.props.navigation.getParam("month");
      month < 10 ? (month = "0" + month) : "";
      let header = this.props.header;
      fetch(
        "http://183.91.31.126:8888/wageslip_HCM/api/Emp/GetinfoEmp?YM=" +
          year +
          month,
        {
          method: "GET",
          headers: {
            Authorization: header
          },
          contentType: "application/x-www-form-urlencoded; charset=utf-8"
        }
      )
        .then(res => res.json())
        .then(
          result => {
            this.setState({
              salaryDetail: result
            });
          },
          error => {
            console.log(error);
          }
        );
    }
  }

  render() {
    if (!_isEmpty(this.state.salaryDetail)) {
      let year = this.props.navigation.getParam("year");
      let month = this.props.navigation.getParam("month");
      let net = this._netSalary(this.state.salaryDetail);
      return <Container>
          <Header style={Styles.header} toolbarBtnTextColor="#fff">
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <Left>
              <Button transparent onPress={() => this.props.navigation.navigate("Salary")}>
                <Icon style={Styles.headerButton} name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title style={Styles.headerTitle}>Salary Detail</Title>
              <Subtitle style={Styles.headerTitle}>
                {_monthList[parseInt(month) - 1]}, {year}
              </Subtitle>
            </Body>
            <Right />
          </Header>
          <Content>
            <List>
              <BasicSalary basic={this.state.salaryDetail.Basic} />
              <Allowances title={this.state.salaryDetail.Title} japanese={this.state.salaryDetail.Japanese} adjusment={this.state.salaryDetail.Adjusment} />
              <Subsidy gas={this.state.salaryDetail.Gas} lunch={this.state.salaryDetail.Lunch} ot={this.state.salaryDetail.OTTotal} />
              <Deduction gas_lunch={this.state.salaryDetail.DedcuGas_luch} other={this.state.salaryDetail.DedcuOTher} ajTaxbale={this.state.salaryDetail.AjTaxbale} />
              <Insurances social={this.state.salaryDetail.Social} health={this.state.salaryDetail.Health} unEmpIns={this.state.salaryDetail.UnEmp} trade={this.state.salaryDetail.Trade} pit={this.state.salaryDetail.PIT} />
              <Articles ot={this.state.salaryDetail.OT} otNight={this.state.salaryDetail.OTNight} hot={this.state.salaryDetail.HOT} hotNight={this.state.salaryDetail.HOTNight} nHolidayOt={this.state.salaryDetail.NHOT} nHolidayOtNight={this.state.salaryDetail.NHOTNight} late={this.state.salaryDetail.LateHours} goOut={this.state.salaryDetail.GoOutHours} early={this.state.salaryDetail.EarlyHours} paid={this.state.salaryDetail.Paid} unPaid={this.state.salaryDetail.UnPaid} nonTax={this.state.salaryDetail.AjNoneTax} />
              <NetSalary net={net} paidRemainder={this.state.salaryDetail.PaidRemainder} />
            </List>
          </Content>
        </Container>;
    } else {
      return (
        <Container>
          <Header style={Styles.header} toolbarBtnTextColor="#fff">
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.pop()}
              >
                <Icon style={Styles.headerButton} name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title style={Styles.headerTitle}>Salary Detail</Title>
              <Subtitle />
            </Body>
            <Right />
          </Header>
          <Content>
            <Spinner color="red" />
          </Content>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    header: state.loginReducer.header
  };
};

export default connect(mapStateToProps)(SalaryDetail);
