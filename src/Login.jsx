import { useState, useEffect } from 'react';

function Login({ onClose, onSignUp }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Hey! Don't forget your email ";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Hmm... that email doesn't look quite right ";
    }
    if (!formData.password) {
      newErrors.password = "Oops! You missed your password ";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simuler une connexion
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Logging in...', formData);
    } catch (error) {
      setErrors({ submit: "Something went wrong. Let's try that again! " });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-black/80 via-purple-900/20 to-black/80 backdrop-blur-md 
      flex items-center justify-center z-[1001] pt-[5ch]"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 rounded-3xl p-8 w-[450px] 
        shadow-[0_0_25px_rgba(37,_99,_235,_0.3)] relative backdrop-blur-xl
        transform transition-all duration-500 border border-blue-500/20
        ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 
          bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 
          border border-blue-300/30 shadow-[0_0_15px_rgba(37,_99,_235,_0.3)]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>

        <div className="relative mt-8 mb-6">
          <h2 className="text-2xl font-dena text-center bg-gradient-to-r from-blue-400 to-indigo-400 
            text-transparent bg-clip-text font-bold">
            Welcome Back! 
          </h2>
          <p className="text-center text-blue-300/50 text-sm mt-2">
            We're so excited to see you again
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="group">
            <label className="text-sm font-dena text-blue-300/80 mb-2 flex items-center">
              <span>Email</span>
              {errors.email && (
                <span className="ml-2 text-pink-400 text-xs animate-bounce">
                  {errors.email}
                </span>
              )}
            </label>
            <input
              type="email"
              className={`w-full px-4 py-3 bg-slate-900/90 border ${
                errors.email ? 'border-pink-400/50' : 'border-blue-500/20'
              } rounded-xl
                focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all
                hover:border-blue-400/30 text-white placeholder-blue-300/20 font-light`}
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => {
                setFormData({...formData, email: e.target.value});
                if (errors.email) setErrors({...errors, email: ''});
              }}
            />
          </div>

          <div className="group">
            <label className="text-sm font-dena text-blue-300/80 mb-2 flex items-center">
              <span>Password</span>
              {errors.password && (
                <span className="ml-2 text-pink-400 text-xs animate-bounce">
                  {errors.password}
                </span>
              )}
            </label>
            <input
              type="password"
              className={`w-full px-4 py-3 bg-slate-900/90 border ${
                errors.password ? 'border-pink-400/50' : 'border-blue-500/20'
              } rounded-xl
                focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all
                hover:border-blue-400/30 text-white placeholder-blue-300/20 font-light`}
              placeholder="Your secret password"
              value={formData.password}
              onChange={(e) => {
                setFormData({...formData, password: e.target.value});
                if (errors.password) setErrors({...errors, password: ''});
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer group">
              <input 
                type="checkbox" 
                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out
                  border-blue-500/20 bg-slate-900/90 rounded group-hover:border-blue-400/50"
              />
              <span className="ml-2 text-sm text-blue-300/50 group-hover:text-blue-300/70 transition-colors">
                Remember me
              </span>
            </label>
            <button 
              type="button" 
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors hover:underline"
            >
              Forgot Password? 
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl
              hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all
              duration-200 font-dena text-lg shadow-[0_0_15px_rgba(37,_99,_235,_0.3)] hover:shadow-[0_0_25px_rgba(37,_99,_235,_0.5)]
              border border-blue-400/20 relative ${isLoading ? 'opacity-80' : ''}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connecting...
              </span>
            ) : (
              "Let's Go! "
            )}
          </button>
          
          {errors.submit && (
            <p className="text-pink-400 text-sm text-center animate-bounce mt-2">
              {errors.submit}
            </p>
          )}
        </form>

        <div className="mt-6 text-center text-sm text-blue-300/50">
          First time here?{' '}
          <button 
            onClick={onSignUp}
            className="text-blue-400 hover:text-blue-300 hover:underline transition-colors font-semibold"
          >
            Create an Account 
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;