import { Expense } from "../types"
import {
      SwipeableList,
      LeadingActions,
      SwipeableListItem,
      TrailingActions,
      SwipeAction
} from 'react-swipeable-list'
import { formatDate } from '../helpers/index';
import { AmountDisplay } from "./AmountDisplay";
import { useMemo } from 'react';
import { categories } from "../data/categories";
import 'react-swipeable-list/dist/styles.css'
import { useBudget } from "../hooks/useBudget";

type ExpenseDetailProps ={
    expense: Expense
}

export const ExpenseDetail = ({expense}: ExpenseDetailProps) => {
  //en el state solamente estamos guardando el id, pero necesitamos el nombre y el icono
  //con el filter nos traemos todo el obj que hay en categories cuando coincide el id con el expense.category
  const infoCategory = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])

  const {dispatch} = useBudget()
  
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => dispatch({type: 'get-expense', payload:{id: expense.id}})}>
        Editar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
        <SwipeAction onClick={()=>dispatch({type:'delete-expense', payload:{id: expense.id}}) } destructive={true}>
          Eliminar
        </SwipeAction>
    </TrailingActions>
  )


  return (
    <SwipeableList>
      <SwipeableListItem
              maxSwipe={30}
              leadingActions={leadingActions()}
              trailingActions={trailingActions()}
              >
            <div className="bg-white w-full shadow-lg p-5 border-b-4 border-gray-200 flex gap-5 items-center">
                <div>

                </div>
                    <img
                      src={`/icono_${infoCategory.icon}.svg`}
                      className="w-20"
                    />
                <div className="flex-1 space-y-2">
                <p className="text-sm font-bold uppercase text-slate-500">{infoCategory.name}</p>
                <p className="">{expense.expenseName}</p>
                <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
                </div>

                <AmountDisplay amount={expense.amount}/>


            </div>
     </SwipeableListItem>
    </SwipeableList>
  )
}
