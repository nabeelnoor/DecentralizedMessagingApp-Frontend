const privReducer = (state="", action) => {
    switch (action.type) {
        case 'MYSTORE':
            return action.state;
        case 'MYDISPLAY':
            return state;
        default:
            return state;
    }
}

export default privReducer;