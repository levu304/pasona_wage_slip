const initState = {
  loading: false,
  error: null,
  data: {}
};

const getProjectsReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_PROJECTS_BEGIN":
      return { ...state, loading: true, error: null };

    case "GET_PROJECTS_SUCCESS":
      return { ...state, loading: false, data: action.payload.data };

    case "GET_PROJECTS_FAILED":
      return { ...state, loading: false, error: action.payload.error };

    default:
      return state;
  }
};

export default getProjectsReducer;
