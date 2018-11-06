export const fetchTimeSheetBegin = () => ({
  type: "GET_TIME_SHEET_BEGIN"
});

export const fetchTimeSheetSuccess = (year, month, result) => {
  let data = {
    year: year,
    month: month,
    result: result
  };
  return {
    type: "GET_TIME_SHEET_SUCCESS",
    payload: { data }
  }
};

export const fetchTimeSheetFailure = error => ({
  type: "GET_TIME_SHEET_FAILED",
  payload: { error }
});

export const fetchTimeSheet = (year, month, header) => {
  let ym =
    year.toString() +
    (month < 10 ? "0" : "") +
    month.toString(); 
  return dispatch => {
    dispatch(fetchTimeSheetBegin());
    return fetch("http://183.91.31.126:8888/wageslip_HCM/api/TimeSheet/" + ym, {
      method: "GET",
      headers: {
        Authorization: header
      }
    })
      .then(res => res.json())
      .then(result => {
        dispatch(fetchTimeSheetSuccess(year, month, result));
      }, error => {
        console.log(error);
        dispatch(fetchTimeSheetFailure(error));
      });
  };
};
