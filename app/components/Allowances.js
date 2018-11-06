import React from "react";
import { View, Separator, ListItem, Left, Body, Text } from "native-base";
import Styles from '../assets/style/style';

import {_formatMoney} from "../modules";

const Allowances = ({ title, japanese, adjusment }) => (
  <View>
    <Separator bordered>
      <Text style={Styles.textBold}>Allowances</Text>
    </Separator>
    <ListItem>
      <Left>
        <Text>Title</Text>
      </Left>
      <Body>
        {title !== 0 ? (
          <Text style={Styles.textRight}>
            <Text style={Styles.blueText}>{_formatMoney(title)} </Text>
            <Text>VND</Text>
          </Text>
        ) : (
          <Text />
        )}
      </Body>
    </ListItem>
    <ListItem>
      <Left>
        <Text>Jappanese</Text>
      </Left>
      <Body>
        {japanese !== 0 ? (
          <Text style={Styles.textRight}><Text style={Styles.blueText}>{_formatMoney(japanese)} </Text><Text>VND</Text></Text>
        ) : (
          <Text />
        )}
      </Body>
    </ListItem>
    <ListItem last>
      <Left>
        <Text>Adjustment</Text>
      </Left>
      <Body>
        {adjusment !== 0 ? (
          <Text style={Styles.textRight}>
          <Text style={Styles.blueText}>{_formatMoney(adjusment)} </Text>
          <Text>VND</Text>
          </Text>
        ) : (
          <Text />
        )}
      </Body>
    </ListItem>
  </View>
);

export default Allowances;
