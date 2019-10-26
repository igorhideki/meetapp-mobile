export function selectMeetup(meetup) {
  return {
    type: '@meetup/SELECT',
    payload: { meetup },
  };
}

export function clearMeetupSelected(meetup) {
  return {
    type: '@meetup/RESET',
    payload: { meetup },
  };
}
