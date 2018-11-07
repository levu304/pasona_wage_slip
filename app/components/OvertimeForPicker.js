import React from "react";
import { Picker, Icon } from "native-base";
import { connect } from "react-redux";

import { fetchProjects } from "../actions/getAllProject";
import { _isEmpty } from "../modules";

class OvertimeForPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: "0", data: {} };
    this.onValueChange = this.onValueChange.bind(this);
  }

  componentDidMount() {
    if (this.props.header) {
      this.props.dispatch(fetchProjects(this.props.header)).then(() => {
        this.setState({
          data: this.props.data
        });
      });
    }
  }

  onValueChange(value) {
    if (value !== "0") {
      this.setState(
        {
          selected: value
        },
        () => {
          this.props.select(this.state.selected);
        }
      );
    }
  }

  render() {
    const data = this.state.data;
    let items = [];
    if (!_isEmpty(data)) {
        items.push(<Picker.Item label="Select type" value="0" />)
        for(let key in data){
            items.push(<Picker.Item label={data[key]} value={key} />)
        }
    }
    return (
      <Picker
        style={{ paddingLeft: 12 }}
        mode="dialog"
        iosIcon={<Icon name="ios-arrow-down-outline" />}
        style={{ width: undefined }}
        selectedValue={this.state.selected}
        onValueChange={this.onValueChange.bind(this)}
      >
      {items}
      </Picker>
    );
  }
}

const mapStateToProps = state => {
  return {
    header: state.loginReducer.header,
    error: state.getProjectsReducer.error,
    data: state.getProjectsReducer.data
  };
};

export default connect(mapStateToProps)(OvertimeForPicker);
