const initState = {
  header: "",
  loading: false,
  error: null,
  result: {}
};

const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_BEGIN":
      return { ...state, loading: true, error: null };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        header: action.payload.header
      };

    case "LOGIN_FAILED":
      return { ...state, loading: false, error: action.payload.error };

    default:
      return state;
  }
};

export default loginReducer;
