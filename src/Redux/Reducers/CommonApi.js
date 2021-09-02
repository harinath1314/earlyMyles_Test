import { Albums, Photos } from "../TextConstants.js";

const initialState = {
  Albums: [],
  Photos: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Albums:
      return {
        ...state,
        Albums: action.payload
      };
    case Photos:
      return {
        ...state,
        Photos: action.payload
      };

    

    default:
      return state;
  }
};
export default reducer;
