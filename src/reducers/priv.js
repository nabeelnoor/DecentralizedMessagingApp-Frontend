const privReducer = (state, action) => {
    switch (action.type) {
        case 'MYSTORE':
            return action.temp;
        case 'MYDISPLAY':
            return state;
        case 'ClearPrivate':
            return "";
        default:
            return "";
    }
}

export default privReducer;