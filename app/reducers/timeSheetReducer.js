const initState = {
  loading: false,
  error: null,
  data: []
};

const getTimeSheetReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_TIME_SHEET_BEGIN":
      return { ...state, loading: true, error: null };

    case "GET_TIME_SHEET_SUCCESS":
      return { ...state, loading: false, data: action.payload.data };

    case "GET_TIME_SHEET_FAILED":
      return { ...state, loading: false, error: action.payload.error };

    default:
      return state;
  }
};

export default getTimeSheetReducer;
