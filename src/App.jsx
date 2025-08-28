import { useState } from 'react'
import './App.css'
import '../public/assets/Welcome Animation.json'
import Lottie from 'lottie-react'
import animationData from '../public/assets/Ai-powered marketing tools abstract.json';
function App() {
  return (
    <>
    <div className='Nav-container'>
      <nav>
          <i>Expense Trackers</i>
          <div className='button'>
              <button>
                Log in
              </button>
              <button>
                Submit
              </button>
          </div>
      </nav>
    </div>
        <h1 style={{color:'white',textAlign:'center'}}>
          Expense Trackers
        </h1>  
    <div className='text'>
      <div style={{width:'30%'}}>
        <Lottie animationData={animationData}
          loop={true}
          autoPlay={true} 
          style={{marginLeft:'14ch',marginTop:"12ch"}}
        />
      </div>
        <p>
          Welcome to your personal expense dashboard. Track your spending, categorize your expenses, and gain real-time insights into where your money goes. <br />
          Stay organized, set monthly budgets, and make smarter financial decisions <br /> with ease. Your financial health starts here.
        </p>
        </div>
    </>
  )
}

export default App
