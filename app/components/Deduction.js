import React from "react";
import { View, Separator, ListItem, Left, Body, Text } from "native-base";
import Styles from "../assets/style/style";

import {_formatMoney} from "../modules";

const Deduction = ({ gas_lunch, other, ajTaxbale }) => (
  <View>
    <Separator bordered>
      <Text style={Styles.textBold}>Deduction</Text>
    </Separator>
    <ListItem>
      <Left>
        <Text>Gas & Lunch</Text>
      </Left>
      <Body>
        {gas_lunch !== 0 ? (
          <Text style={Styles.textRight}><Text style={Styles.redText}>{_formatMoney(gas_lunch)} </Text><Text>VND</Text></Text>
        ) : (
          <Text />
        )}
      </Body>
    </ListItem>
    <ListItem>
      <Left>
        <Text>Other</Text>
      </Left>
      <Body>
        {other !== 0 ? <Text style={Styles.textRight}><Text style={Styles.redText}>{_formatMoney(other)} </Text><Text>VND</Text></Text> : <Text />}
      </Body>
    </ListItem>
    <ListItem last>
      <Left>
        <Text>Adjustment Taxable</Text>
      </Left>
      <Body>
        {ajTaxbale !== 0 ? (
          <Text style={Styles.textRight}><Text style={Styles.redText}>{_formatMoney(ajTaxbale)} </Text><Text>VND</Text></Text>
        ) : (
          <Text />
        )}
      </Body>
    </ListItem>
  </View>
);

export default Deduction;
