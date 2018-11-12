export const createOvertimeBegin = () => ({ type: "CREATE_OT_BEGIN" });

export const createOvertimeSuccess = result => ({
  type: "CREATE_OT_SUCCESS",
  payload: { result }
});

export const createOvertimeFailure = error => ({
  type: "CREATE_OT_FAILED",
  payload: { error }
});

export const createOvertime = (header, otData) => {
  return dispatch => {
    dispatch(createOvertimeBegin());
    return fetch("http://183.91.31.126:8888/wageslip_HCM/api/Approval/CreateOT/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: header
      },
      body: JSON.stringify(otData)
    })
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
        },
        error => {
          console.log(error);
          dispatch(createOvertimeFailure(error));
        }
      );
  };
};
