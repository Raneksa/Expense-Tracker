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
          Track and manage your expenses effortlessly. <br /> Get insights, set budgets, and take control of your finances today.
          <div className="flex justify-center w-full mt-6">
            <button 
              className="px-6 py-2 bg-blue-600 text-white rounded-md font-dena 
              hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </button>
          </div>
        </p>
      </div>
    </>
  )
}

export default App
