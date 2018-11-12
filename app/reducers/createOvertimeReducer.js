const initState = {
  loading: false,
  error: null,
  result: ""
};

const createOvertimeReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_OT_BEGIN":
      return { ...state, loading: true, error: null };

    case "CREATE_OT_SUCCESS":
      return {
        ...state,
        loading: false,
        result: action.payload.result
      };

    case "CREATE_OT_FAILED":
      return { ...state, loading: false, error: action.payload.error };

    default:
      return state;
  }
};

export default createOvertimeReducer;
