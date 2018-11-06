import React from "react";
import { ListItem, Left, Body, Text } from "native-base";
import { withNavigation } from "react-navigation";

import {_formatMoney, _monthList} from "../modules";

class SalaryByYearListItem extends React.Component {

  render() {
    const year = this.props.year;
    const month = parseInt(this.props.month);
    const salaryData = this.props.salaryData;
    return <ListItem onPress={() => {
          this.props.navigation.navigate("SalaryDetail", {
            year: year,
            month: month
          });
        }}>
        <Left>
          <Text>
          {_monthList[month - 1]}, {year}
          </Text>
        </Left>
        <Body>
          <Text style={{ textAlign: "right" }}>
            {_formatMoney(salaryData.NET)} VND
          </Text>
        </Body>
      </ListItem>;
  }
}

export default withNavigation(SalaryByYearListItem);
