const INITIAL_STATE = {};

export default function meetup(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@meetup/SELECT':
      return { ...state, ...action.payload.meetup };
    case '@meetup/RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
}
