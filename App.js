import React from "react";
import { createStackNavigator } from "react-navigation";

import { Provider } from "react-redux";
import store from "./app/store";

import Login from "./app/views/Login";
import Home from "./app/views/Home";
import Salary from "./app/views/Salary";
import TimeSheet from "./app/views/TimeSheet";
import SalaryDetail from "./app/views/SalaryDetail";
import LeaveForm from "./app/views/LeaveForm";
import Dept from "./app/views/Dept";
import Forms from "./app/views/Forms";

import { Root } from "native-base";

const RootStack = createStackNavigator(
  {
    Home: Home,
    Login: Login,
    Salary: Salary,
    SalaryDetail: SalaryDetail,
    TimeSheet: TimeSheet,
    LeaveForm: LeaveForm,
    Dept: Dept,
    Forms: Forms
  },
  {
    initialRouteName: "Login",
    headerMode: "screen"
  }
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <RootStack />
        </Root>
      </Provider>
    );
  }
}
