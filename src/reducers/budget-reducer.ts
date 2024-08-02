import { Category, DraftExpense } from "../types"
import { Expense } from '../types/index';
import { v4 as uuidv4 } from 'uuid'

export type BudgetActions =
    {type: 'add-budget', paylodad: {budget: number}} |
    {type: 'mostrar-modal'} |
    {type: 'close-modal'} |
    {type: 'add-expense', payload: {expense: DraftExpense}} |
    {type: 'delete-expense', payload: {id: Expense['id']}} |
    {type: 'get-expense', payload: {id: Expense['id']}}  |  //una vez que arrastramos para editar necesitamos identificar cual es por eso llenamos editingId 
    {type: 'edit-expense', payload: {expense: Expense}} | //de ahi lo colocamos al state, abrimos el modal y filtrar el gasto para editar
    {type: 'reset-app'} |
    {type: 'search-category', payload: {id: Category['id']}}
        


export type BudgetState = {
    budget: number
    modal: boolean,
    expenses: Expense[],
    editingId: Expense['id'],
    currentCategory: Category['id']
   
}

const initialBudget = () : number => {
    const updateBudget = localStorage.getItem('budget')
    return updateBudget ? +updateBudget : 0
}

const initialExpense = () : Expense[] => {
    const updateExpense = localStorage.getItem('expenses')
    return updateExpense ? JSON.parse(updateExpense) : []
}


export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: initialExpense(),
    editingId: '',
    currentCategory: ''
}

const createExpense = (draftExpense: DraftExpense) : Expense => {
    return{
        ...draftExpense,
        id: uuidv4()
    }
}

export const budgetReducer = (state: BudgetState = initialState, action: BudgetActions) => {

    if(action.type === 'add-budget'){


        return{
            ...state,
            budget: action.paylodad.budget
        }
    }

    if(action.type === 'mostrar-modal'){


        return{
            ...state,
            modal: true
        }
    }

    if(action.type === 'close-modal'){


        return{
            ...state,
            modal: false,
            editingId: ''
           
        }
    }

    if(action.type === 'add-expense'){

        const expense = createExpense(action.payload.expense)
        return{
            ...state,
            expenses: [...state.expenses, expense],
            modal: false
        }
    }

    if(action.type === 'delete-expense'){

        const updateExpense = state.expenses.filter(expense => expense.id !== action.payload.id)


        return{
            ...state,
            expenses: updateExpense
        }
    }

    if(action.type === 'get-expense'){

        return{
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }

    if(action.type === 'edit-expense'){


        return{
            ...state,
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
            modal:false,
            editingId: ''
        }
    }

    if(action.type === 'reset-app'){

        return{
            ...state,
            budget: 0,
            expenses: [],
            editingId: ''
        }
    }

    if(action.type === 'search-category'){

        return{
            ...state,
            currentCategory: action.payload.id
        }
    }

    return state
}