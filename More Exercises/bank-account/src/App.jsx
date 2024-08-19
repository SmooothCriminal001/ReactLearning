import { useReducer } from "react"

const types = {
  openAccount: "openAccount",
  deposit: "deposit",
  withdraw: "withdraw",
  requestLoan: "requestLoan",
  payLoan: "payLoan",
  closeAccount: "closeAccount",
  depositeUpdate: "depositeUpdate",
  withdrawalUpdate: "withdrawalUpdate",
  loanIncrementUpdate: "loanIncrementUpdate"
}

const initialState = {
  accountIsOpen: false,
  loanTaken: false,
  balance: 0,
  loanAmount: 0,
  depositIncrement: 1000,
  withdrawalIncrement: 500,
  loanIncrement: 10000,
  error: null
}

const reducer = (state, { type, payload }) => {
  switch(type) {
      case types.openAccount:
        return {...state, accountIsOpen: true, balance: 500}
      case types.depositeUpdate:
        return {...state, depositIncrement: payload, error: null}
      case types.withdrawalUpdate:
        return {...state, withdrawalIncrement: payload, error: null}
      case types.deposit:
        return {...state, balance: (state.balance + state.depositIncrement)}
      case types.withdraw:
        {
          const balanceAmount = state.balance - state.withdrawalIncrement
          return {
            ...state, 
            balance: balanceAmount >= 0 ? balanceAmount : state.balance, 
            error: balanceAmount < 0 ? "Not enough funds!" : null
          }
        }
      case types.loanIncrementUpdate:
        return {...state, loanIncrement: payload}
      case types.requestLoan:
        {
          if(state.loanTaken) return {...state}
          return {
            ...state,
            loanTaken: true,
            loanAmount: state.loanIncrement,
            balance: state.balance + state.loanIncrement
          }
        }
      case types.payLoan:
        {
          if(!state.loanTaken) return {...state}
          const balanceAmount = state.balance - state.loanAmount
          const loanPaid = balanceAmount >= 0
          return {
            ...state,
            balance: loanPaid ? balanceAmount : state.balance,
            loanTaken: !loanPaid,
            error: !loanPaid ? "Insufficient funds for loan repayment!" : null,
            loanAmount: loanPaid ? 0 : state.loanAmount
          }
        }
      case types.closeAccount:
        {
          if(state.balance > 0 || state.loanAmount > 0) return {...state, error: null}
          return {
            ...state,
            accountIsOpen: false
          }
        }
      default:
        console.log("Unknown action")
  }
}

function App() {
  const [{
    accountIsOpen,
    balance,
    depositIncrement,
    withdrawalIncrement,
    error,
    loanIncrement,
    loanAmount
  }, dispatch] = useReducer(reducer, initialState)

  const buttonStyle = {
    marginLeft: "10px"
  }
  return (
    <div style={{margin: "auto", width:"50%", padding: "10px", textAlign: "center"}}>
      <h1>useReducer Bank Account</h1>

      {error && <p style={{color: "red"}}>{error}</p>}
      <p>Balance: {balance}</p>
      <p>Loan: {loanAmount}</p>
      <p><button disabled={accountIsOpen} onClick={() => dispatch({type: types.openAccount})}>Open account</button></p>
      <p>
        <input type="number" 
          value={depositIncrement} 
          disabled={!accountIsOpen} 
          onChange={(e) => dispatch({type: types.depositeUpdate, payload: Number(e.target.value)})}
        />
        <button 
          disabled={!accountIsOpen} 
          onClick={() => dispatch({type: types.deposit})}
          style={buttonStyle}
        >Deposit</button>
      </p>
      <p>
        <input type="number" 
          value={withdrawalIncrement} 
          disabled={!accountIsOpen} 
          onChange={(e) => dispatch({type: types.withdrawalUpdate, payload: Number(e.target.value)})}
        />
        <button 
          disabled={!accountIsOpen} 
          onClick={() => dispatch({type: types.withdraw})}
          style={buttonStyle}
        >Withdraw</button>
      </p>
      <p>
        <input type="number" 
          value={loanIncrement} 
          disabled={!accountIsOpen} 
          onChange={(e) => dispatch({type: types.loanIncrementUpdate, payload: Number(e.target.value)})}
        />
        <button 
          disabled={!accountIsOpen}
          style={buttonStyle}
          onClick={() => dispatch({type: types.requestLoan})}
        >Request a loan</button>
      </p>
      <p>
        <button 
          disabled={!accountIsOpen}
          onClick={() => dispatch({type: types.payLoan})}
        >Pay loan</button></p>
      <p><button
        disabled={!accountIsOpen}
        onClick={() => dispatch({type: types.closeAccount})}
      >Close account</button></p>
      
    </div>
  )
}

export default App
