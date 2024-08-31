import { InputHTMLAttributes } from 'react'
import { Search } from 'lucide-react';
import PropTypes from 'prop-types'

export interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function SearchBar ({id, placeholder="Search", onClick, ...props}:SearchBarProps) {
    return (
      
      <div className='w-full m-1 h-[44px]'>
        <div className="relative">
          <div className="absolute flex items-center p-3 pointer-events-none text-black">
            <Search color='#aaaaaa'/>
          </div>
          <input
            type="search"
            id={id || "default-search"}
            className="block w-full p-4 h-[50px] ps-10 text-zinc-500 border border-zinc-800 rounded-full bg-zinc-800 focus:ring-blue-500 focus:border-blue-500"
            placeholder={placeholder}
            {...props}
          />
        </div>
      </div>

    )
}

// PropTypes for automatic Storybook settings.
SearchBar.propTypes = {
  label: PropTypes.string,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  borderColor: PropTypes.string,
  minWidth: PropTypes.string,
  scale: PropTypes.number,
  onClick: PropTypes.func,
}