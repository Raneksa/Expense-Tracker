import { useState, useEffect } from 'react'
import './App.css'
import Lottie from 'lottie-react'
import animationData from './assets/Ai-powered marketing tools abstract.json'

function App() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <>
      <div className='Nav-container'>
        <nav>
          <i>Expense Trackers</i>
          <div className='button'>
            <button>Log in</button>
            <button>Submit</button>
          </div>
        </nav>
      </div>
      
      <h1 style={{
        color: 'white',
        textAlign: 'center',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1s ease-in-out'
      }}>
        Expense Trackers
      </h1>  

      <div className='text'>
        <div style={{
          width: '30%',
          opacity: isVisible ? 1 : 0,
          transform: `translateX(${isVisible ? '0' : '-50px'})`,
          transition: 'opacity 1s ease-in-out, transform 1s ease-in-out'
        }}>
          <Lottie 
            animationData={animationData}
            loop={true}
            autoPlay={true} 
            style={{marginLeft:'14ch', marginTop:"12ch"}}
          />
        </div>
        <p style={{
          opacity: isVisible ? 1 : 0,
          transform: `translateX(${isVisible ? '0' : '50px'})`,
          transition: 'opacity 1s ease-in-out, transform 1s ease-in-out'
        }}>
          Welcome to your personal expense dashboard. Track your spending, categorize your expenses, and gain real-time insights into where your money goes. <br />
          Stay organized, set monthly budgets, and make smarter financial decisions <br /> with ease. Your financial health starts here.
        </p>
      </div>
    </>
  )
}

export default App
