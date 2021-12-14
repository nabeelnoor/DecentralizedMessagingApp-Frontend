const privReducer = (state="", action) => {
    switch (action.type) {
        case 'MYSTORE':
            return action.temp;
        case 'MYDISPLAY':
            return state;
        default:
            return state;
    }
}

export default privReducer;