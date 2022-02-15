const initialState = {
    days: [0,0,0,0,0,0,0],
    jumps: 0,
    crunch: 0,
    ableToDoPhysicalActivity: 0,
    pushUps: 0,
    crunches: 0,
};

function reducer(state, action) {
    switch (action.type) {
      case 'CHANGE_DAYS': return { ...state, days: action.value, };
      case 'CHANGE_JUMPS': return { ...state, jumps: action.value, };
      case 'CHANGE_CRUNCH': return { ...state, crunch: action.value, };
      case 'CHANGE_ABLE_TO_DO': return { ...state, ableToDoPhysicalActivity: action.value, };
      case 'UPDATE_PUSHUPS': return { ...state, pushUps: action.value, };
      case 'UPDATE_CRUNCHES': return { ...state, crunches: action.value, };
      default: throw new Error();
    }
}

export{
    reducer,
    initialState,
}