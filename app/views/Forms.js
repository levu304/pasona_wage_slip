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
import { fetchUsersProcess } from "../actions/getAllUserByProcess";
import { connect } from "react-redux";

class Forms extends React.Component {
  static navigationOptions = { header: null };

  constructor(props){
    super(props);
    this.state = {
      depts: {}
    }
  }

  componentDidMount() {
    if (this.props.header) {
      this._getAllUserByProcess(this.props.header);
    }
  }

  _getAllUserByProcess(header) {
    this.props.dispatch(fetchUsersProcess(header)).then(() => {
      this.setState({
        depts: this.props.depts,
        isLoading: false
      });
    });
  }

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
        <Content padder>
          <Button
            block
            onPress={() => {
              navigate("LeaveForm");
            }}
            style={[Styles.blackButton, Styles.menuButton]}
          >
            <Text>Application for leave</Text>
          </Button>
          <Button
            block
            onPress={() => {
              navigate("OverTimeForm");
            }}
            style={[Styles.blackButton, Styles.menuButton]}
          >
            <Text>Application for Overtime</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    header: state.loginReducer.header,
    depts: state.getUsersProcessReducer.data
  };
};


export default withNavigation(connect(mapStateToProps)(Forms));
