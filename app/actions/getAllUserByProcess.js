export const fetchUsersProcessBegin = () => ({
  type: "GET_USERS_BY_PROCESS_BEGIN"
});

export const fetchUsersProcessSuccess = data => ({
  type: "GET_USERS_BY_PROCESS_SUCCESS",
  payload: { data }
});

export const fetchUsersProcessFailure = error => ({
  type: "GET_USERS_BY_PROCESS_FAILED",
  payload: { error }
});

export const fetchUsersProcess = header => {
  return dispatch => {
    dispatch(fetchUsersProcessBegin());
    return fetch("http://183.91.31.126:8888/wageslip_HCM/api/Process/getAllUserByProcess/", {
      method: "GET",
      headers: {
        Authorization: header
      }
    })
      .then(res => res.json())
      .then(
        result => {
          dispatch(fetchUsersProcessSuccess(result));
        },
        error => {
          console.log(error);
          dispatch(fetchUsersProcessFailure(error));
        }
      );
  };
};
