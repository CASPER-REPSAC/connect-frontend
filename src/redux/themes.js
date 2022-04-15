const SET_THEME = "thems/SET_THEME";

export const getTheme = () => async (dispatch, getState) => {
  let theme = window.localStorage.getItem("theme");
  if (theme === "undefined") {
    dispatch({ type: SET_THEME, theme: "base" });
  } else {
    theme = JSON.parse(theme);
    dispatch({ type: SET_THEME, theme });
  }
};

export const setTheme = (theme) => (dispatch, getState) => {
  dispatch({ type: SET_THEME, theme });
  window.localStorage.setItem("theme", JSON.stringify(getState().themes.theme));
};

const initialState = {
  theme: "base",
};

const themes = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return { ...state, theme: action.theme };
    default:
      return state;
  }
};

export default themes;
