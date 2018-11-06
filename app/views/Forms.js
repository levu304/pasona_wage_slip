import React from "react";
import { StatusBar } from "react-native";
import { withNavigation } from "react-navigation";
import Styles from "../assets/style/style";
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Body,
  Title,
  Button,
  Icon,
  Text
} from "native-base";

class Forms extends React.Component {
  static navigationOptions = { header: null };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header style={Styles.header} toolbarBtnTextColor="#fff">
          <StatusBar barStyle="light-content" backgroundColor="#000" />
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={Styles.headerButton} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={Styles.headerTitle}>Application Forms</Title>
          </Body>
          <Right />
        </Header>
        <Content style={Styles.fixedBottomView}>
          <Button
            block
            onPress={() => {
              navigate("LeaveForm");
            }}
            style={[Styles.redButton, Styles.menuButton]}
          >
            <Text>Application for leave</Text>
          </Button>
          <Button
            block
            enabled={false}
            style={[Styles.redButton, Styles.menuButton]}
          >
            <Text>Application for OT (Coming soon)</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default withNavigation(Forms);
