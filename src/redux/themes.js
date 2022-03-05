const SET_THEME = "thems/SET_THEME";

export const setTheme = (theme) => {
  return { type: SET_THEME, theme };
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
