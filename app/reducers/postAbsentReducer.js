const initState = {
    loading: false,
    error: null,
    result: ""
  };
  
  const createAbsentReducer = (state = initState, action) => {
    switch (action.type) {
      case "CREATE_ABSENT_BEGIN":
        return { ...state, loading: true, error: null };
  
      case "CREATE_ABSENT_SUCCESS":
        return {
          ...state,
          loading: false,
          result: action.payload.result
        };
  
      case "CREATE_ABSENT_FAILED":
        return { ...state, loading: false, error: action.payload.error };
  
      default:
        return state;
    }
  };
  
  export default createAbsentReducer;
  