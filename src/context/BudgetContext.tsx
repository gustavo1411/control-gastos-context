import { createContext, ReactNode, useMemo, useReducer } from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: React.Dispatch<BudgetActions>,
    amountGastado: number,
    gastoDisp: number
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({children}: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    
    const amountGastado = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0) , [state.expenses])
    const gastoDisp = state.budget - amountGastado

    return (
        <BudgetContext.Provider value={{
            state,
            dispatch,
            amountGastado,
            gastoDisp
        }}>
            {children}
        </BudgetContext.Provider>
    )
}