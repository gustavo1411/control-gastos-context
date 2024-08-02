import { useBudget } from '../hooks/useBudget';
import { useMemo } from 'react';
import { ExpenseDetail } from './ExpenseDetail';


export const ExpenseList = () => {
    //en este componente si tenemos un gasto en el state mostramos la lista con los gastos sino un msj de que no hay gastos

   const {state} =  useBudget()
   //para no iterar sobre el state creamos la variable expensesFiltered. verificamos si hay una cat. seleccionada
   //si hay una categoria filtramos los gastos que tengan esa categoria
   const expensesFiltered = state.currentCategory ? state.expenses.filter(expen => expen.category === state.currentCategory) : state.expenses
   
   const isStateBudget = useMemo(() => expensesFiltered.length === 0, [expensesFiltered]) //amtes leia el lengt de state.expenses.length


  return (

    <div className='mt-10 bg-white shadow-lg rounded-lg p-10'>
        {isStateBudget ? <p className='text-gray-800 font-bold text-center'>No hay gastos </p> 
        : (
            <>
            <p className='text-gray-700 font-bold'>Listado de Gastos</p>
            {expensesFiltered.map(expense => ( //antes se iteraba sobre state.expense.map
                <ExpenseDetail
                    key={expense.id}
                    expense={expense}
                />
            ))}
            </>
        )}
    </div>
  )
}
