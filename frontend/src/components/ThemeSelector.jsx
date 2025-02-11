import React, { useEffect } from 'react'
import { PaletteIcon } from 'lucide-react'
import { THEMES } from '../constants'
import { useSelector , useDispatch } from 'react-redux'
import { setTheme } from '../slices/themeSlice'

const ThemeSelector = () => {
    const themes = useSelector(data => data.themes)
    const theme = themes.theme

    const dispatch = useDispatch()

  return (
    <div className='dropdown dropdown-end'>
      <button tabIndex={0} className='btn btn-ghost btn-circle'>
        <PaletteIcon className='size-5'/>
      </button>
      <div tabIndex={0} 
       className='dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-56 border border-base-content/10'
      >
        {
            THEMES.map(themeoption => (
                <button
                 key={themeoption.name}
                 className={`w-full px-4 py-3 rounded-xl flex items-center gap-3  transition-colors hover:bg-base-300
                    ${theme === themeoption.name ? "bg-primary/10 text-primary" : "hover:bg-base-content/5"}
                    `}
                 onClick={() => dispatch(setTheme(themeoption.name))}
                >
                    <PaletteIcon className='size-4'/>
                    <span className='text-sm font-medium'>{themeoption.label}</span>

                    {/* theme preview colors */}
                    <div className='ml-auto flex gap-1'>
                        {
                            themeoption.colors.map((color,i) => (
                                <span key={i} className='size-2 rounded-full' style={{backgroundColor: color}}></span>
                            ))
                        }
                    </div>

                </button>
            ))
        }
      </div>
    </div>
  )
}

export default ThemeSelector
