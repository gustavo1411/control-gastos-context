import { categories } from "../data/categories"
import DatePicker from "react-date-picker"
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from 'react';
import { DraftExpense, Value } from "../types";
import { ErrorMessage } from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";





export const ExpenseForm = () => {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date:new Date()
    })

    const [error, setError] = useState('')
    const [previusAmount, setPreviusAmount] = useState(0)
    const {dispatch, state, gastoDisp} = useBudget()

   useEffect(() => {
        if(state.editingId){
            const updateId = state.expenses.filter(expense => expense.id === state.editingId)[0]
            setExpense(updateId)
            setPreviusAmount(updateId.amount) //cuando estamos editando congelamos la cantidad del monto que hay
        }
   }, [state.editingId])
   
    
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> |  React.ChangeEvent<HTMLSelectElement> ) => {
        //SI ES AMOUNT LO CONVIERTE A NUMBER°
      const {name, value} = e.target
      const isAmountField = ['amount'].includes(name)
      setExpense({
        ...expense,
        [name] : isAmountField ? +value : value //EL [NAME] ES LA LLAVE, SI ISAMOUNT OSEA TRUE AL VALUE LO PASAMOS A NUMBER CON EL + ADELEANTE DE VALUE
      })
    }

  const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //Validar
        if(Object.values(expense).includes('')){
            setError('faltan llenar campos')
            return
        }

        //validar que el gasto no se pase del limite del dinero que nos queda
        if((expense.amount - previusAmount) > gastoDisp){  //la cantidad disponible (-) menos el monto previo que es el que esta congelado cuando estamos editando es mayor al monto disponible
            setError('el fondo es insuficiente')
            return
        }
        
        //Agregar o editar un gasto
       if(state.editingId){
            dispatch({type:'edit-expense', payload: {expense: {id: state.editingId, ...expense}}})
       }else{
            dispatch({type: 'add-expense', payload: {expense}})
       }
        
       //reiniciar el state
       setExpense({
        amount: 0,
        expenseName: '',
        category: '',
        date:new Date()
        })
        
       setPreviusAmount(0)
        
            
  }

 
  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <legend className="uppercase text-2xl text-center font-black border-b-4 border-red-900 py-2">
           {state.editingId ? 'Editando Gasto' : 'Nuevo Gasto'}
        </legend>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">Nombre Gasto:</label>
            <input type="text"
                    id='expenseName'
                    name='expenseName'
                    placeholder="añade el nombre del gasto"
                    className="bg-slate-100 py-2"
                    value={expense.expenseName}
                    onChange={handleChange}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-xl">Cantidad:</label>
            <input type="number"
                    id='amount'
                    name='amount'
                    placeholder="añade la cantidad ej. 300"
                    className="bg-slate-100 py-2"
                    value={expense.amount}
                    onChange={handleChange}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-xl">Categoria:</label>
            <select 
                    id="category"
                    className="bg-slate-100 py-2"
                    name='category'
                    value={expense.category}
                    onChange={handleChange}
                   
            >
                <option value="">--- Seleccione ---</option>
                {categories.map(category => (
                    <option value={category.id}
                            key={category.id}
                            >
                        {category.name}
                    </option>
                ))}
            </select>

            <div className="flex flex-col gap-2">
            <label htmlFor="fecha" className="text-xl">Fecha Gasto:</label>
            <DatePicker
                className="bg-slate-200 p-2 rounded-lg border-0"
                value={expense.date}
                onChange={handleChangeDate}
            />
        </div>

            <input type="submit"
                    className="bg-red-900 w-full text-white font-bold uppercase rounded-lg p-2 cursor-pointer"
                    value={state.editingId ? 'Modificar Gasto' : 'Guardar Gasto'}
            />
        </div>
    </form>
  )
}
