import React from "react";
import { View, Separator, ListItem, Left, Body, Text } from "native-base";
import Styles from "../assets/style/style";

const Articles = ({
  ot,
  otNight,
  hot,
  hotNight,
  nHolidayOt,
  nHolidayOtNight,
  late,
  goOut,
  early,
  paid,
  unPaid,
  nonTax
}) => (
  <View>
    <Separator bordered>
      <Text style={Styles.textBold}>Articles</Text>
    </Separator>
    <ListItem>
      <Left>
        <Text>Overtime work</Text>
      </Left>
      <Body>
        {ot !== 0 ? (
          <Text style={Styles.textRight}>
            {ot} {`hour(s)`}
          </Text>
        ) : (
          <Text />
        )}
      </Body>
    </ListItem>
    <ListItem>
      <Left>
        <Text>Overtime work night</Text>
      </Left>
      <Body>
        {otNight !== 0 ? (
          <Text style={Styles.textRight}>
            {otNight} {`hour(s)`}
          </Text>
        ) : (
          <Text />
        )}
      </Body>
    </ListItem>
    <ListItem>
      <Left>
        <Text>Holiday work</Text>
      </Left>
      <Body>
        {hot !== 0 ? (
          <Text style={Styles.textRight}>
            {hot} {`hour(s)`}
          </Text>
        ) : (
          <Text />
        )}
      </Body>
    </ListItem>
    <ListItem>
      <Left>
        <Text>Holiday work night</Text>
      </Left>
      <Body>
        {hotNight !== 0 ? (
          <Text style={Styles.textRight}>
            {hotNight} {`hour(s)`}
          </Text>
        ) : (
          <Text />
        )}
      </Body>
    </ListItem>
    <ListItem>
      <Left>
        <Text>Natinal Holiday work</Text>
      </Left>
      <Body>
        {nHolidayOt !== 0 ? (
          <Text style={Styles.textRight}>
            {nHolidayOt} {`hour(s)`}
          </Text>
        ) : (
          <Text />
        )}
      </Body>
    </ListItem>
    <ListItem>
      <Left>
        <Text>Natinal Holiday work night</Text>
      </Left>
      <Body>
        {nHolidayOtNight !== 0 ? (
          <Text style={Styles.textRight}>
            {nHolidayOtNight} {`hour(s)`}
          </Text>
        ) : (
          <Text />
        )}
      </Body>
    </ListItem>
    <ListItem>
      <Left>
        <Text>Late hours</Text>
      </Left>
      <Body>
        {late !== 0 ? (
          <Text style={Styles.textRight}>
            {late} {`hour(s)`}
          </Text>
        ) : (
          <Text />
        )}
      </Body>
    </ListItem>
    <ListItem>
      <Left>
        <Text>Go out hours</Text>
      </Left>
      <Body>
        {goOut !== 0 ? (
          <Text style={Styles.textRight}>
            {goOut} {`hour(s)`}
          </Text>
        ) : (
          <Text />
        )}
      </Body>
    </ListItem>
    <ListItem>
      <Left>
        <Text>Early hours</Text>
      </Left>
      <Body>
        {early !== 0 ? (
          <Text style={Styles.textRight}>
            {early} {`hour(s)`}
          </Text>
        ) : (
          <Text />
        )}
      </Body>
    </ListItem>
    <ListItem>
      <Left>
        <Text>Holiday Paid</Text>
      </Left>
      <Body>
        {paid !== 0 ? (
          <Text style={Styles.textRight}>
            {paid} {`day(s)`}
          </Text>
        ) : (
          <Text />
        )}
      </Body>
    </ListItem>
    <ListItem>
      <Left>
        <Text>Holiday Un-Paid</Text>
      </Left>
      <Body>
        {unPaid !== 0 ? (
          <Text style={Styles.textRight}>
            {unPaid} {`day(s)`}
          </Text>
        ) : (
          <Text />
        )}
      </Body>
    </ListItem>
    <ListItem>
      <Left>
        <Text>Adjustment Non-Taxable</Text>
      </Left>
      <Body>
        {nonTax !== 0 ? (
          <Text style={Styles.textRight}>
            {nonTax}
          </Text>
        ) : (
          <Text />
        )}
      </Body>
    </ListItem>
  </View>
);

export default Articles;
