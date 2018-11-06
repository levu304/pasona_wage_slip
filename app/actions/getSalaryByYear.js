export const fetchSalaryByYearBegin = () => ({
  type: "GET_SALARY_BY_YEAR_BEGIN"
});

export const fetchSalaryByYearSuccess = data => ({
  type: "GET_SALARY_BY_YEAR_SUCCESS",
  payload: { data }
});

export const fetchSalaryByYearFailure = error => ({
  type: "GET_SALARY_BY_YEAR_FAILED",
  payload: { error }
});

export const fetchSalaryByYear = (year, header) => {
  return dispatch => {
    dispatch(fetchSalaryByYearBegin());
    return fetch(
      "http://183.91.31.126:8888/wageslip_HCM/api/Emp/GetinfoEmp?YM=" + year,
      {
        method: "GET",
        headers: {
          Authorization: header
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8"
      }
    )
      .then(res => res.json())
      .then(
        result => {
          dispatch(fetchSalaryByYearSuccess(result));
        },
        error => {
          console.log(error);
          dispatch(fetchSalaryByYearFailure(error));
        }
      );
  };
};
