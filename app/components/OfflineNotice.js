import React, { PureComponent } from "react";
import { View, Text, NetInfo } from "react-native";
import Styles from "./../assets/style/style";

const MiniOfflineSign = () => (
  <View style={Styles.offlineContainer}>
    <Text style={Styles.offlineText}>No Internet Connection</Text>
  </View>
);

class OfflineNotice extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: true
    };
    this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  handleConnectivityChange(isConnected) {
    this.setState({ isConnected: isConnected }, () => {
      const { isConnected } = this.state;
      this.props.connection(isConnected);
    });
  }

  render() {
    const { isConnected } = this.state;
    console.log(isConnected);
    return !isConnected ? <MiniOfflineSign /> : null;
  }
}

export default OfflineNotice;
