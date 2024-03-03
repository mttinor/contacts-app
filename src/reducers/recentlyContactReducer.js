export const initialState = {
  recentContracts: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_RECENT_CONTRACT":
      return {
        ...state,
        recentContracts: action.payload,
      };
    default:
      return state;
  }
};
