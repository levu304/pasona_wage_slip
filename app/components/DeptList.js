import React from "react";
import { FlatList } from "react-native";
import { Button, Icon, Text, SwipeRow, View } from "native-base";

export default class DeptList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { listViewData: this.props.data };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setState({ listViewData: nextProps.data });
    }
  }

  _removeItem(key) {
    let listViewData = this.state.listViewData;
    listViewData = listViewData.filter(item => item.name !== key);
    this.setState({ listViewData: listViewData }, () => {
      this.props.listChange(this.state.listViewData);
    });
  }

  render() {
    const listViewData = this.state.listViewData;
    return (
      <FlatList
        data={listViewData}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => item.code !== "008" ? (
          <SwipeRow
            rightOpenValue={-75}
            disableRightSwipe={true}
            body={
              <View style={{ paddingHorizontal: 16 }}>
                <Text>
                  <Text>{item.name} | </Text>
                  <Text>{item.position}</Text>
                </Text>
              </View>
            }
            right={
              <Button danger onPress={() => this._removeItem(item.name)}>
                <Icon active name="trash" />
              </Button>
            }
          />
        ) : (
          <SwipeRow
            disableRightSwipe={true}
            disableLeftSwipe={true}
            body={
              <View style={{ paddingHorizontal: 16 }}>
                <Text>
                  <Text>{item.name} | </Text>
                  <Text>{item.position}</Text>
                </Text>
              </View>
            }
          />
        )}
      />
    );
  }
}
