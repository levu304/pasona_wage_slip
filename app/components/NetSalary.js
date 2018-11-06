import React from "react";
import { View, Separator, ListItem, Left, Body, Text } from "native-base";
import Styles from "../assets/style/style";

import {_formatMoney} from "../modules"

const NetSalary = ({ net, paidRemainder }) => (
  <View>
    <Separator bordered>
      <Text style={Styles.textBold}>Remarks</Text>
    </Separator>
    <ListItem>
      <Left>
        <Text>Paid holiday remainder</Text>
      </Left>
      <Body>
        <Text style={Styles.textRight}>{paidRemainder} day(s)</Text>
      </Body>
    </ListItem>
    <ListItem last>
      <Left>
        <Text>NET</Text>
      </Left>
      <Body>
        {net !== 0 ? <Text style={Styles.textRight}>{_formatMoney(net)} VND</Text> : <Text />}
      </Body>
    </ListItem>
  </View>
);

export default NetSalary;
