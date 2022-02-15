const initialState = {
  downloading: false,
  exercises: false,
  showRounds: true,
  showSelectRestModal: false,
  showRestModal: false,
  showSelectDificultyModal: false,
  showFinalModal: false,
  exercise_loading: false,
  change_exercise: false,
  start_timeStamp: 0,
  difficulty_feedback: 0,
  rest: 30,
  round: 0,
  workout_history: [],
  workout_time_resume: [],
  user: {id: 2531994},
};

function reducer(state, action) {
  switch (action.type) {
    case 'START_DATE':
      return {...state, start_timeStamp: new Date().valueOf()};
    case 'update_difficulty':
      return {...state, difficulty_feedback: action.value};
    case 'downloading':
      return {...state, downloading: !state.downloading};
    case 'showRounds':
      return {...state, showRounds: !state.showRounds};
    case 'CHANGE_EXERCISE':
      return {...state, change_exercise: !state.change_exercise};
    case 'updateExercises':
      return {...state, exercises: !state.exercises};
    case 'UPDATE_REST':
      return {...state, rest: action.value};
    case 'EXERCISE_LOADING':
      return {...state, exercise_loading: action.value};
    case 'SHOW_SELECT_REST_MODAL':
      return {...state, showSelectRestModal: !state.showSelectRestModal};
    case 'SHOW_REST_MODAL':
      return {...state, showRestModal: !state.showRestModal};
    case 'SHOW_DIFICULTY_MODAL':
      return {
        ...state,
        showSelectDificultyModal: !state.showSelectDificultyModal,
      };
    case 'SHOW_FINAL_MODAL':
      return {...state, showFinalModal: !state.showFinalModal};
    case 'CHANGE_ROUND':
      return {...state, round: state.round + 1};
    case 'UPDATE_WORKOUT_HISTORY':
      return {...state, workout_history: action.value};
    case 'UPDATE_WORKOUT_DIFICULTY':
      return {...state, difficulty_feedback: action.value};
    case 'UPDATE_RESUME':
      return {...state, workout_time_resume: action.value};
    case 'UPDATE_USER':
      return {...state, user: action.value};
    default:
      throw new Error();
  }
}

export {reducer, initialState};
