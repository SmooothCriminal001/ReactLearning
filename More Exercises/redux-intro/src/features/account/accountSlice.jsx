const types = {
    deposit: 'account/deposit',
    withdraw: 'account/withdraw',
    requestLoan: 'account/requestLoan',
    payLoan: 'account/payLoan',
    convertCurrency: 'account/convertCurrency'
}

const usd_currency = 'USD'

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    convertingCurrency: false
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action
    switch(type){
        case types.deposit:
            return {
                ...state,
                balance: state.balance + payload,
                convertingCurrency: false
            }
        case types.withdraw:
            return {
                ...state,
                balance: (state.balance - payload) <= 0 ? 0 : (state.balance - payload)
            }
        case types.requestLoan:
            if(state.loan > 0) return state
            return {
                ...state,
                loan: payload.amount,
                loanPurpose: payload.purpose,
                balance: state.balance + payload.amount
            }
        case types.payLoan:
            return {
                ...state, 
                loan: 0, 
                loanPurpose: "", 
                balance: state.balance - state.loan
            }
        case types.convertCurrency:
            return {
                ...state,
                convertingCurrency: true
            }
        default:
            return initialState
    }
}

function deposit(amount, currency){

    if(currency === usd_currency) return { type: types.deposit, payload: amount}

    return async function(dispatch, getState){

        dispatch( { type: types.convertCurrency })

        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
        const data = await response.json()
        const amountInUSD = data.rates.USD

        dispatch(deposit(amountInUSD, usd_currency))
    }
}

function withdraw(amount){
    return { type: types.withdraw, payload: amount}
}

function requestLoan(amount, purpose){
    return { 
        type: types.requestLoan, 
        payload: {
            amount,
            purpose
        } 
    }
}

function payLoan(){
    return { type: types.payLoan }
}

export default reducer
export { deposit, withdraw, requestLoan, payLoan }