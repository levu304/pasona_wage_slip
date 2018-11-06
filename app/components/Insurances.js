import React from "react";
import { View, Separator, ListItem, Left, Body, Text } from "native-base";
import Styles from "../assets/style/style";
import {_formatMoney} from "../modules"

const Insurances = ({ social, health, unEmpIns, trade, pit }) => (
  <View>
    <Separator bordered>
      <Text style={Styles.textBold}>Insurances, Trade union fee and Tax</Text>
    </Separator>
    <ListItem>
      <Left>
        <Text>Social insurance</Text>
      </Left>
      <Body>
        {social !== 0 ? <Text style={Styles.textRight}><Text style={Styles.redText}>{_formatMoney(social)} </Text><Text>VND</Text></Text> : <Text />}
      </Body>
    </ListItem>
    <ListItem>
      <Left>
        <Text>Health Insurance</Text>
      </Left>
      <Body>
        {health !== 0 ? <Text style={Styles.textRight}><Text style={Styles.redText}>{_formatMoney(health)} </Text><Text>VND</Text></Text> : <Text />}
      </Body>
    </ListItem>
    <ListItem>
      <Left>
        <Text>Unemployment Insurance</Text>
      </Left>
      <Body>
        {unEmpIns !== 0 ? (
          <Text style={Styles.textRight}><Text style={Styles.redText}>{_formatMoney(unEmpIns)} </Text><Text>VND</Text></Text>
        ) : (
          <Text />
        )}
      </Body>
    </ListItem>
    <ListItem>
      <Left>
        <Text>Trade union fee</Text>
      </Left>
      <Body>
        {trade !== 0 ? <Text style={Styles.textRight}><Text style={Styles.redText}>{_formatMoney(trade)} </Text><Text>VND</Text></Text> : <Text />}
      </Body>
    </ListItem>
    <ListItem last>
      <Left>
        <Text>PIT</Text>
      </Left>
      <Body>
        {pit !== 0 ? <Text style={Styles.textRight}><Text style={Styles.redText}>{_formatMoney(pit)} </Text><Text>VND</Text></Text> : <Text />}
      </Body>
    </ListItem>
  </View>
);

export default Insurances;
