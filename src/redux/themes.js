const SET_THEME = "thems/SET_THEME";
const SET_THEMES = "thems/SET_THEMES";
const SET_POINT_COLOR = "thems/SET_POINT_COLOR";

const initialState = {
  theme: "base",
  pointColor: "point-orange",
};

export const getTheme = () => async (dispatch, getState) => {
  let themes = window.localStorage.getItem("themes");
  if (themes === "undefined" || !themes) {
    dispatch({ type: SET_THEMES, themes: initialState });
  } else {
    themes = JSON.parse(themes);
    dispatch({ type: SET_THEMES, themes });
  }
};

export const setTheme = (themes) => (dispatch, getState) => {
  dispatch({ type: SET_THEME, themes });
  window.localStorage.setItem("themes", JSON.stringify(getState().themes));
};

export const setPointColor = (color) => (dispatch, getState) => {
  dispatch({ type: SET_POINT_COLOR, color });
  window.localStorage.setItem("themes", JSON.stringify(getState().themes));
};

const themes = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return { ...state, theme: action.themes };
    case SET_POINT_COLOR:
      return { ...state, pointColor: action.color };
    case SET_THEMES:
      return action.themes;
    default:
      return state;
  }
};

export default themes;
