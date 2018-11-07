import React from "react";
import { Alert, Image } from "react-native";
import Styles from "../assets/style/style";
import {
  Container,
  Content,
  View,
  Input,
  Button,
  Item,
  Text,
  Spinner
} from "native-base";

import { NavigationActions, StackActions } from "react-navigation";
import { connect } from "react-redux";
import { fetchLogin } from "../actions/login";
import OfflineNotice from "./../components/OfflineNotice";

class Login extends React.Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      email: "",
      password: "",
      isLogin: false,
      isConnected: false
    };
    this.Login = this.Login.bind(this);
    this._onChangeCode = this._onChangeCode.bind(this);
    this._onChangeEmail = this._onChangeEmail.bind(this);
    this._onChangePassword = this._onChangePassword.bind(this);
    this._handleConnection = this._handleConnection.bind(this);
  }

  Login() {
    let code = this.state.code;
    let email = this.state.email;
    let password = this.state.password;
    let isConnected = this.state.isConnected;
    if (isConnected) {
      if (code !== "" && email !== "" && password !== "") {
        this.setState(
          {
            isLogin: true
          },
          () => {
            setTimeout(() => {
              this.props
                .dispatch(fetchLogin(code, email, password))
                .then(() => {
                  if (this.props.error) {
                    this.setState(
                      {
                        isLogin: false
                      },
                      () => {
                        Alert.alert(
                          "Alert",
                          this.props.error,
                          [
                            {
                              text: "OK",
                              onPress: () => console.log("OK Pressed")
                            }
                          ],
                          { cancelable: false }
                        );
                      }
                    );
                  } else {
                    const resetAction = StackActions.reset({
                      index: 0,
                      actions: [
                        NavigationActions.navigate({
                          routeName: "Home"
                        })
                      ]
                    });
                    this.props.navigation.dispatch(resetAction);
                  }
                });
            }, 2000);
          }
        );
      } else {
        Alert.alert(
          "Alert",
          "Please input information",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }
    }
  }

  _handleConnection(isConnected) {
    this.setState({
      isConnected: isConnected
    });
  }

  _onChangeCode(code) {
    this.setState({
      code: code
    });
  }

  _onChangeEmail(email) {
    this.setState({
      email: email
    });
  }

  _onChangePassword(password) {
    this.setState({
      password: password
    });
  }

  render() {
    if (this.state.isLogin) {
      return (
        <Container>
          <Content>
            <View style={[Styles.viewContent, Styles.padTop100]}>
              <Image
                source={require("../assets/images/logo.png")}
                style={Styles.logo}
              />
              <Item style={Styles.input}>
                <Input
                  placeholder="Code"
                  onChangeText={text => {
                    this._onChangeCode(text);
                  }}
                />
              </Item>
              <Item style={Styles.input}>
                <Input
                  placeholder="Email"
                  onChangeText={text => {
                    this._onChangeEmail(text);
                  }}
                />
              </Item>
              <Item style={Styles.input}>
                <Input
                  secureTextEntry={true}
                  placeholder="Password"
                  onChangeText={text => {
                    this._onChangePassword(text);
                  }}
                />
              </Item>
              <Spinner color="red" />
            </View>
          </Content>
        </Container>
      );
    } else {
      return (
        <Container>
          <OfflineNotice connection={this._handleConnection} />
          <Content>
            <View style={[Styles.viewContent, Styles.padTop100]}>
              <Image
                source={require("../assets/images/logo.png")}
                style={Styles.logo}
              />
              <Item style={Styles.input}>
                <Input
                  placeholder="Code"
                  onChangeText={text => {
                    this._onChangeCode(text);
                  }}
                />
              </Item>
              <Item style={Styles.input}>
                <Input
                  placeholder="Email"
                  onChangeText={text => {
                    this._onChangeEmail(text);
                  }}
                />
              </Item>
              <Item style={Styles.input}>
                <Input
                  secureTextEntry={true}
                  placeholder="Password"
                  onChangeText={text => {
                    this._onChangePassword(text);
                  }}
                />
              </Item>
              <Button
                style={[Styles.redButton, Styles.loginButton]}
                block
                onPress={this.Login}
              >
                <Text>Login</Text>
              </Button>
            </View>
          </Content>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => {
  return { header: state.loginReducer.header, error: state.loginReducer.error };
};

export default connect(mapStateToProps)(Login);
