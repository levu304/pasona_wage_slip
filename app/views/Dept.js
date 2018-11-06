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
  List,
  ListItem,
  Text,
  Footer,
  Spinner,
  FooterTab
} from "native-base";
import DeptsPicker from "../components/DeptsPicker";
import DeptList from "../components/DeptList";

class Dept extends React.Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      listViewData: [],
      confirmList: [],
      deptName: "",
      processID: "",
      depts: {}
    };
    this._handleChange = this._handleChange.bind(this);
    this._handleList = this._handleList.bind(this);
    this._confirm = this._confirm.bind(this);
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
      depts: this.props.navigation.getParam("depts")
    });
  }

  _handleChange(name, processID, value) {
    this.setState({ deptName: name, listViewData: value, confirmList: value, processID: processID });
  }

  _handleList(list) {
    this.setState({
      confirmList: list
    });
  }

  _confirm() {
    this.props.navigation.state.params.deptGoBack(
      this.state.deptName,
      this.state.processID,
      this.state.confirmList
    );
    this.props.navigation.goBack();
  }

  render() {
    const { isLoading, listViewData, depts } = this.state;
    if (isLoading) {
      return (
        <Container>
          <Header style={Styles.header}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}
              >
                <Icon style={Styles.headerButton} name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title style={Styles.headerTitle}>Dept</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <Spinner color="red" />
          </Content>
          <Footer>
            <FooterTab>
              <Button style={Styles.footerButton} full onPress={() => {}}>
                <Text>Confirm</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
    } else if (listViewData.length === 0) {
      return (
        <Container>
          <Header style={Styles.header} toolbarBtnTextColor="#fff">
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}
              >
                <Icon style={Styles.headerButton} name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title style={Styles.headerTitle}>Dept</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <List>
              <ListItem>
                <Left>
                  <Text>Approved by</Text>
                </Left>
                <Body>
                  <DeptsPicker data={depts} onSelectDept={this._handleChange} />
                </Body>
              </ListItem>
              <ListItem itemDivider>
                <Text>Dept list (Swipe left to remove)</Text>
              </ListItem>
            </List>
          </Content>
          <Footer>
            <FooterTab>
              <Button
                style={Styles.footerButton}
                full
                onPress={() => this.props.navigation.goBack()}
              >
                <Text>Confirm</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
    } else {
      return (
        <Container>
          <Header style={Styles.header} toolbarBtnTextColor="#fff">
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}
              >
                <Icon style={Styles.headerButton} name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title style={Styles.headerTitle}>Dept</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <List>
              <ListItem>
                <Left>
                  <Text>Approved by</Text>
                </Left>
                <Body>
                  <DeptsPicker data={depts} onSelectDept={this._handleChange} />
                </Body>
              </ListItem>
              <ListItem itemDivider>
                <Text>Dept list (Swipe left to remove)</Text>
              </ListItem>
            </List>
            <DeptList data={listViewData} listChange={this._handleList} />
          </Content>
          <Footer>
            <FooterTab>
              <Button style={Styles.footerButton} full onPress={this._confirm}>
                <Text>Confirm</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
    }
  }
}

export default withNavigation(Dept);
