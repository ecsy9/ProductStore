import { Palette } from 'lucide-react'
import React from 'react'

const ThemeSelector = () => {
  return (
    <div className='dropdown dropdown-end'>
        <button tabIndex={0} className="btn btn-ghost">
        <Palette className="w-6 h-6" />
        </button>

        <div tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        
    </div>
    </div>
  )
}

export default ThemeSelector