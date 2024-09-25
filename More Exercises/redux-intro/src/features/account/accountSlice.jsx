import { createSlice } from "@reduxjs/toolkit"

const types = {
    deposit: 'account/deposit',
    convertCurrency: 'account/convertCurrency'
}

const usd_currency = 'USD'

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    convertingCurrency: false
}

const slice = createSlice({
    name: "account",
    initialState,
    reducers: {
        deposit(state, action){
          state.balance += action.payload
          state.convertingCurrency = false
        },
        withdraw(state, action){
            const reducedAmount = state.balance - action.payload
            state.balance = reducedAmount <= 0 ? 0 : reducedAmount
        },
        requestLoan: {
            prepare(amount, purpose){
                return {
                    payload: {
                        amount, 
                        purpose
                    }
                }
            },
        
            reducer(state, action){
                state.loan = action.payload.amount,
                state.loanPurpose = action.payload.purpose,
                state.balance += action.payload.amount
            }
        },
        payLoan(state){
            state.balance -= state.loan
            state.loan = 0,
            state.loanPurpose = ''
        },
        convertCurrency(state){
            state.convertingCurrency = true
        }
    }
})

export function deposit(amount, currency){

    if(currency === usd_currency) return { type: types.deposit, payload: amount}

    return async function(dispatch, getState){

        dispatch( { type: types.convertCurrency })

        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
        const data = await response.json()
        const amountInUSD = data.rates.USD

        dispatch(deposit(amountInUSD, usd_currency))
    }
}


export default slice.reducer
export const { withdraw, requestLoan, payLoan } = slice.actions
