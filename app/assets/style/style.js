import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get('window');

const Styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#fc151d',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 0
  },
  offlineText: { 
    color: '#fff'
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  header: {
    backgroundColor: "#fc151d"
  },
  headerTitle:{
    color: "#fff"
  },
  headerButton:{
    color: "#fff"
  },
  viewContent: {
    flex: 1,
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  contentZIndex: {
    zIndex: -1
  },
  padTop100: {
    paddingTop: 100
  },
  logo: {
    width: 100,
    height: 100
  },
  input: {
    marginTop: 5,
    marginBottom: 5
  },
  redButton: {
    backgroundColor: "#fc151d"
  },
  blackButton: {
    backgroundColor: "#393937"
  },
  loginButton: {
    marginTop: 20,
    marginBottom: 20
  },
  menuButton: {
    marginTop: 5,
    marginBottom: 5
  },
  fixedBottomView: {
    position: "absolute",
    bottom: 50,
    left: 5,
    right: 5,
    flex: 1
  },
  blueText: {
    color: "blue"
  },
  redText: {
    color: "red"
  },
  textBold: {
    fontWeight: "bold"
  },
  textRight: {
    textAlign: "right"
  },
  footerButton: {
    backgroundColor: "#393937",
    color: "white"
  },
  otInputSubject:{
    marginLeft: 16,
    marginRight:16,
    borderBottomWidth: 0.25,
    borderBottomColor: "#c9c9c9"
  },
  otInputReason: {
    marginLeft: 16,
    marginRight:16,
    borderBottomWidth: 0.25,
    borderBottomColor: "#c9c9c9"
  },
  textArea: {
    margin: 16,
    marginTop: 16,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0.25,
    borderLeftWidth: 0,
    borderBottomColor: "#c9c9c9"
  }
});

export default Styles;
