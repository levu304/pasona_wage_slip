import { encode as btoa } from "base-64";

export const fetchLoginBegin = () => ({ type: "LOGIN_BEGIN" });

export const fetchLoginSuccess = header => ({
  type: "LOGIN_SUCCESS",
  payload: { header }
});

export const fetchLoginFailure = error => ({
  type: "LOGIN_FAILED",
  payload: { error }
});

export const fetchLogin = (code, email, password) => {
  let header = "Basic " + btoa(code + "|" + password + "|" + email);
  return dispatch => {
    dispatch(fetchLoginBegin());
    return fetch(
      "http://183.91.31.126:8888/wageslip_HCM/api/Emp?id=" +
        code +
        "&email=" +
        email,
      {
        method: "GET",
        headers: {
          Authorization: header
        }
      }
    )
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
          if (result.Message) {
            dispatch(fetchLoginFailure(result.Message));
          } else {
            dispatch(fetchLoginSuccess(header));
          }
        },
        error => {
          console.log(error);
          dispatch(fetchLoginFailure(error));
        }
      );
  };
};
