import { useMemo, useEffect } from 'react';
import { BudgeForm } from "./components/BudgeForm"
import { useBudget } from "./hooks/useBudget"
import { BudgetTrucker } from "./components/BudgetTrucker"
import ExpenseModal from "./components/ExpenseModal"
import { ExpenseList } from "./components/ExpenseList"
import { FilterByCategory } from './components/FilterByCategory';



function App() {

    const {state} = useBudget()

    const isValidTrucker = useMemo(()=> state.budget > 0  ,[state.budget])

  useEffect(() => {
      localStorage.setItem('budget', state.budget.toString())
      localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])
  
  
    
  return (
    <>
      <header className="bg-red-900 py-8 max-h-72">
        <h1 className="uppercase text-3xl text-white text-center font-black">Planificador de Gastos</h1>

      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">

          {isValidTrucker ? <BudgetTrucker/>  : <BudgeForm/> }
          
      </div>

      {isValidTrucker && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategory/>
          <ExpenseList/>
          <ExpenseModal/>
        </main>
      )}
    </>
  )
}

export default App
