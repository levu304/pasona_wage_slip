const initState = {
  loading: false,
  error: null,
  data: {}
};

const getSalaryByYearReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_SALARY_BY_YEAR_BEGIN":
      return { ...state, loading: true, error: null };

    case "GET_SALARY_BY_YEAR_SUCCESS":
      return { ...state, loading: false, data: action.payload.data };

    case "GET_SALARY_BY_YEAR_FAILED":
      return { ...state, loading: false, error: action.payload.error };

    default:
      return state;
  }
};

export default getSalaryByYearReducer;
