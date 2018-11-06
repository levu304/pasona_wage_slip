import React from "react";
import { View, Separator, ListItem, Left, Body, Text } from "native-base";
import Styles from "../assets/style/style";
import {_formatMoney} from "../modules";

const BasicSalary = ({ basic }) => (
  <View>
    <Separator bordered>
      <Text style={Styles.textBold}>Salary</Text>
    </Separator>
    <ListItem last>
      <Left>
        <Text>Basic</Text>
      </Left>
      <Body>
        {basic !== 0 ? <Text style={Styles.textRight}>{_formatMoney(basic)} VND</Text> : <Text />}
      </Body>
    </ListItem>
  </View>
);

export default BasicSalary;
