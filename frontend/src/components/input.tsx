import { InputHTMLAttributes } from 'react'
import { Search } from 'lucide-react';
import PropTypes from 'prop-types'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input ({...props}:InputProps) {
    return (
      
      <div className='w-full m-3 h-[44px] relative m-4 p-0'>
        <input
        className="block w-full p-4 h-[50px] ps-10 text-zinc-300 border border-zinc-300 rounded-sm bg-zinc-950 focus:ring-blue-500 focus:border-blue-500"
        {...props}
        />
      </div>

    )
}
