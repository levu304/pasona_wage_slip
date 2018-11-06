import React from "react";
import { View, Separator, ListItem, Left, Body, Text } from "native-base";
import Styles from "../assets/style/style";

import {_formatMoney} from "../modules";

const Subsidy = ({ gas, lunch, ot }) => (
  <View>
    <Separator bordered>
      <Text style={Styles.textBold}>Subsidy</Text>
    </Separator>
    <ListItem>
      <Left>
        <Text>Gas</Text>
      </Left>
      <Body>
        {gas !== 0 ? (
          <Text style={Styles.textRight}>
            <Text style={Styles.blueText}>{_formatMoney(gas)} </Text>
            <Text>VND</Text>
          </Text>
        ) : (
          <Text />
        )}
      </Body>
    </ListItem>
    <ListItem>
      <Left>
        <Text>Lunch</Text>
      </Left>
      <Body>
        {lunch !== 0 ? <Text style={Styles.textRight}><Text style={Styles.blueText}>{_formatMoney(lunch)} </Text><Text>VND</Text></Text> : <Text />}
      </Body>
    </ListItem>
    <ListItem last>
      <Left>
        <Text>OT</Text>
      </Left>
      <Body>
        {ot !== 0 ? <Text style={Styles.textRight}><Text style={Styles.blueText}>{_formatMoney(ot)} </Text><Text>VND</Text></Text> : <Text />}
      </Body>
    </ListItem>
  </View>
);

export default Subsidy;
