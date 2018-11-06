import React from "react";
import { Image } from "react-native";
import Styles from "../assets/style/style";
import { Container, View, Button, Text } from "native-base";

export default class Home extends React.Component {
  static navigationOptions = { header: null };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <View style={Styles.viewContent}>
          <Image
            source={require("../assets/images/logo.png")}
            style={[
              Styles.logo,
              {
                marginTop: 40
              }
            ]}
          />
        </View>
        <View style={Styles.fixedBottomView}>
          <Button
            block
            onPress={() => {
              navigate("Salary");
            }}
            style={[Styles.redButton, Styles.menuButton]}
          >
            <Text>View Salary</Text>
          </Button>
          <Button
            block
            onPress={() => {
              navigate("TimeSheet");
            }}
            style={[Styles.redButton, Styles.menuButton]}
          >
            <Text>View time sheet</Text>
          </Button>
          <Button
            block
            onPress={() => {
              navigate("Forms");
            }}
            style={[Styles.redButton, Styles.menuButton]}
          >
            <Text>Application forms</Text>
          </Button>
        </View>
      </Container>
    );
  }
}
