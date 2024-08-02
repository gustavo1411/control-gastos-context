import { useBudget } from "../hooks/useBudget"
import { AmountDisplay } from "./AmountDisplay"
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'




export const BudgetTrucker = () => {
    
    const { state, amountGastado, gastoDisp, dispatch } = useBudget()

    const percentage = +((amountGastado / state.budget) * 100).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center ">
            <CircularProgressbar
              value={percentage}
              styles={buildStyles({
                pathColor:'#DC2626',
                trailColor: '#F5F5F5',
                textSize: 8,
                textColor: '#DC2626'
              })}
              text={`${percentage} % Gastado`}
            />
        </div>

        <div className="flex flex-col justify-center items-center gap-8"> 
          <button className="bg-red-800 text-white rounded-lg font-bold uppercase p-2 w-full"
                  onClick={()=> dispatch({type:'reset-app'})}
                  >
              Resetear App
          </button>

        <AmountDisplay
          label="Presupuesto"
          amount={state.budget}
        />

        <AmountDisplay
          label="Disponible"
          amount={gastoDisp}
        />

        <AmountDisplay
          label="Gastado"
          amount={amountGastado}
        />

        </div>
    </div>
  )
}
