const types = {
    createCustomer: "customer/createCustomer",
    updateName: "customer/updateName",
}

const initialState = {
    fullName: 'Testing',
    nationalID: '4563',
    createdAt: ''
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action
    switch(type){
        case types.createCustomer:
            return {
                ...state,
                fullName: payload.fullName,
                nationalID: payload.nationalID,
                createdAt: payload.createdAt
            }
        case types.updateName:
            return {
                ...state,
                fullName: payload
            }
        default:
            return state
    }
}

function createCustomer(fullName, nationalID){
    return {
        type: types.createCustomer,
        payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString()
        }
    }
}

function updateName(fullName){
    return {
        type: types.updateName,
        payLoad: fullName
    }
}

export default reducer
export { createCustomer, updateName }