import { useSelector } from 'react-redux'

function ThemeProvider({children}) {
    const {theme} = useSelector((state)=>state.theme)
  return (
    <div className={theme}>
        <div className='bg-bg-primary text-text dark:bg-bg-primary-dark dark:text-text-dark'>
            {children}
        </div>
    </div>
  )
}

export default ThemeProvider