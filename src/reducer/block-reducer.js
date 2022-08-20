import { act } from "react-dom/test-utils";

const initState = {
  value: 'default'
};


const blockReducer = (state = initState, action) => {
  switch (action.type) {
    case 'block':
      return Object.assign({}, state, action);
    default:
      return state;
  };

};

module.exports = {
  blockReducer
};