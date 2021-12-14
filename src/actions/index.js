export const increment=()=>{
    return {
        type: 'INCREMENT'
    }
}

export const decrement=()=>{
    return {
        type: 'DECREMENT'
    }
}

export const StorePrivate=(temp)=>{
    return {
        type: 'MYSTORE',
        temp,
    }
}

export const DisplayPrivate=()=>{
    return {
        type: 'MYDISPLAY'
    }
}

export const ClearPrivateData=()=>{
    return {
        type: 'ClearPrivate'
    }
}