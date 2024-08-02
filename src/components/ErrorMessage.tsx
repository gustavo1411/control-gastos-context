import { ReactNode } from 'react';

type ErrorMessageProps = {
    children: ReactNode
}

export const ErrorMessage = ({children}: ErrorMessageProps) => {


  return (
    <p className="bg-red-600 text-center font-bold text-sm p-2 uppercase text-white">
        {children}
    </p>
  )
}
