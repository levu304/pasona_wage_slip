const initState = {
  loading: false,
  error: null,
  data: {}
};

const getUsersProcessReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_USERS_BY_PROCESS_BEGIN":
      return { ...state, loading: true, error: null };

    case "GET_USERS_BY_PROCESS_SUCCESS":
      return { ...state, loading: false, data: action.payload.data };

    case "GET_USERS_BY_PROCESS_FAILED":
      return { ...state, loading: false, error: action.payload.error };

    default:
      return state;
  }
};

export default getUsersProcessReducer;
