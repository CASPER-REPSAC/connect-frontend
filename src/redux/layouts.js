const SET_LAYOUT = "layouts/SET_LAYOUT";

export const setLayout = (layout) => {
  return { type: SET_LAYOUT, layout };
};

const initialState = {
  main: {
    first: "running",
    second: "planned",
    third: "Study",
    fourth: "Project",
    fifth: "CTF",
  },
};

function layouts(state = initialState, action) {
  switch (action.type) {
    case SET_LAYOUT:
      return {
        ...state,
        [action.layout.priority]: action.layout.value,
      };
    default:
      return state;
  }
}

export default layouts;
