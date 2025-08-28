import { useState, useEffect } from 'react';

function SignUp({ onClose, onBackToLogin }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) {
      newErrors.fullName = "Please enter your full name";
    }
    if (!formData.email) {
      newErrors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Please enter a password";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Creating account...', formData);
    } catch (error) {
      setErrors({ submit: "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-black/80 via-purple-900/20 to-black/80 backdrop-blur-md 
      flex items-center justify-center z-[1001] pt-[2ch]"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 rounded-3xl p-6 w-[450px] 
        shadow-[0_0_25px_rgba(37,_99,_235,_0.3)] relative backdrop-blur-xl
        transform transition-all duration-500 border border-blue-500/20
        ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 
          bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-3 
          border border-blue-300/30 shadow-[0_0_15px_rgba(37,_99,_235,_0.3)]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>

        <div className="relative mt-6 mb-4">
          <h2 className="text-xl font-dena text-center bg-gradient-to-r from-blue-400 to-indigo-400 
            text-transparent bg-clip-text font-bold">
            Create Account
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="group">
            <label className="text-sm font-dena text-blue-300/80 mb-1 flex items-center">
              <span>Full Name</span>
              {errors.fullName && (
                <span className="ml-2 text-pink-400 text-xs animate-bounce">
                  {errors.fullName}
                </span>
              )}
            </label>
            <input
              type="text"
              className={`w-full px-4 py-2 bg-slate-900/90 border ${
                errors.fullName ? 'border-pink-400/50' : 'border-blue-500/20'
              } rounded-xl
                focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all
                hover:border-blue-400/30 text-white placeholder-blue-300/20 font-light`}
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => {
                setFormData({...formData, fullName: e.target.value});
                if (errors.fullName) setErrors({...errors, fullName: ''});
              }}
            />
          </div>

          <div className="group">
            <label className="text-sm font-dena text-blue-300/80 mb-1 flex items-center">
              <span>Email</span>
              {errors.email && (
                <span className="ml-2 text-pink-400 text-xs animate-bounce">
                  {errors.email}
                </span>
              )}
            </label>
            <input
              type="email"
              className={`w-full px-4 py-2 bg-slate-900/90 border ${
                errors.email ? 'border-pink-400/50' : 'border-blue-500/20'
              } rounded-xl
                focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all
                hover:border-blue-400/30 text-white placeholder-blue-300/20 font-light`}
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => {
                setFormData({...formData, email: e.target.value});
                if (errors.email) setErrors({...errors, email: ''});
              }}
            />
          </div>

          <div className="group">
            <label className="text-sm font-dena text-blue-300/80 mb-1 flex items-center">
              <span>Password</span>
              {errors.password && (
                <span className="ml-2 text-pink-400 text-xs animate-bounce">
                  {errors.password}
                </span>
              )}
            </label>
            <input
              type="password"
              className={`w-full px-4 py-2 bg-slate-900/90 border ${
                errors.password ? 'border-pink-400/50' : 'border-blue-500/20'
              } rounded-xl
                focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all
                hover:border-blue-400/30 text-white placeholder-blue-300/20 font-light`}
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => {
                setFormData({...formData, password: e.target.value});
                if (errors.password) setErrors({...errors, password: ''});
              }}
            />
          </div>

          <div className="group">
            <label className="text-sm font-dena text-blue-300/80 mb-1 flex items-center">
              <span>Confirm Password</span>
              {errors.confirmPassword && (
                <span className="ml-2 text-pink-400 text-xs animate-bounce">
                  {errors.confirmPassword}
                </span>
              )}
            </label>
            <input
              type="password"
              className={`w-full px-4 py-2 bg-slate-900/90 border ${
                errors.confirmPassword ? 'border-pink-400/50' : 'border-blue-500/20'
              } rounded-xl
                focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all
                hover:border-blue-400/30 text-white placeholder-blue-300/20 font-light`}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({...formData, confirmPassword: e.target.value});
                if (errors.confirmPassword) setErrors({...errors, confirmPassword: ''});
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-xl
              hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all
              duration-200 font-dena text-base shadow-[0_0_15px_rgba(37,_99,_235,_0.3)] hover:shadow-[0_0_25px_rgba(37,_99,_235,_0.5)]
              border border-blue-400/20 relative ${isLoading ? 'opacity-80' : ''}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-blue-300/50">
          Already have an account?{' '}
          <button 
            onClick={onBackToLogin}
            className="text-blue-400 hover:text-blue-300 hover:underline transition-colors font-semibold"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;