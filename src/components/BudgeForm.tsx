import { useMemo, useState } from 'react';
import { useBudget } from '../hooks/useBudget';

export const BudgeForm = () => {

    const [budget, setBudget] = useState(0)
     const {dispatch} = useBudget()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       setBudget(e.target.valueAsNumber)
       
    }

    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0
    }, [budget])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({type:'add-budget', paylodad:{ budget}})
        console.log(budget);
    }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className="text-red-900 text-4xl text-center font-bold">
                Definir Presupuesto
            </label>
            <input type="number" className="w-full bg-white border border-gray-200 py-2"
                id='budget'
                placeholder="define tu presupuesto"
                name="budget"
                value={budget}
                onChange={handleChange}
            />
        </div>

        <input type="submit" 
                value='definir presupuesto'
               className="w-full bg-red-600 hover:bg-red-700 cursor-pointer text-white py-2 font-black uppercase disabled:opacity-30"
            disabled={isValid}
        />

    </form>
  )
}
