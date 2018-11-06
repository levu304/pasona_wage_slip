export const postAbsentBegin = () => ({ type: "CREATE_ABSENT_BEGIN" });

export const postAbsentSuccess = result => ({
  type: "CREATE_ABSENT_SUCCESS",
  payload: { result }
});

export const postAbsentFailure = error => ({
  type: "CREATE_ABSENT_FAILED",
  payload: { error }
});

export const postAbsent = (header, absentData) => {
  return dispatch => {
    dispatch(postAbsentBegin());
    return fetch("http://183.91.31.126:8888/wageslip_HCM/api/Approval/CreateAbsent/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: header
      },
      body: JSON.stringify(absentData)
    })
      .then(res => res.json())
      .then(
        result => {
          if (result.Message) {
            dispatch(postAbsentFailure(result.Message));
          } else {
            dispatch(postAbsentSuccess(result));
          }
        },
        error => {
          console.log(error);
          dispatch(postAbsentFailure(error));
        }
      );
  };
};
