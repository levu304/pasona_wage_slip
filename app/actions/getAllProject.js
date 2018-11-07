export const fetchProjectsBegin = () => ({
  type: "GET_PROJECTS_BEGIN"
});

export const fetchProjectsSuccess = data => ({
  type: "GET_PROJECTS_SUCCESS",
  payload: { data }
});

export const fetchProjectsFailure = error => ({
  type: "GET_PROJECTS_FAILED",
  payload: { error }
});

export const fetchProjects = header => {
  return dispatch => {
    dispatch(fetchProjectsBegin());
    return fetch("http://183.91.31.126:8888/wageslip_HCM/api/Project/getAllProject", {
      method: "GET",
      headers: {
        Authorization: header
      }
    })
      .then(res => res.json())
      .then(
        result => {
          dispatch(fetchProjectsSuccess(result));
        },
        error => {
          console.log(error);
          dispatch(fetchProjectsFailure(error));
        }
      );
  };
};
