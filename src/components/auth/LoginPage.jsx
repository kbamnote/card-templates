import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, profileRead, studentProfileRead } from '../../utils/Api';
import Cookies from 'js-cookie';
import logo from '../../assets/br-logo.png'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Function to decode JWT token (using built-in JavaScript functions)
  const decodeJWT = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login({ email, password });
      
      if (response.data.success) {
        // Store token and role in cookies
        Cookies.set('card-token', response.data.data.token, { expires: 7 });
        const userRole = response.data.data.user.role;
        Cookies.set('card-role', userRole, { expires: 7 });
        
        // For students, redirect directly to student onboarding or student landing page
        if (userRole === 'student') {
          try {
            // Check if student profile exists
            const profileResponse = await studentProfileRead();
            if (profileResponse.data.success) {
              const profile = profileResponse.data.data;
              
              // Check if essential fields are filled for students
              const isCompleted = profile.fullName && profile.email;
              if (isCompleted) {
                // Student has completed onboarding, redirect to student landing page
                navigate('/student');
              } else {
                // Student needs to complete onboarding
                navigate('/student-onboarding');
              }
            } else {
              // No profile data, redirect to student onboarding
              navigate('/student-onboarding');
            }
          } catch (profileErr) {
            // If it's a 404 error (profile not found), redirect to student onboarding
            if (profileErr.response && profileErr.response.status === 404) {
              navigate('/student-onboarding');
            } else {
              // For other errors, redirect to student onboarding as well
              navigate('/student-onboarding');
            }
          }
          return;
        }
        
        // For clients, check if they have completed onboarding
        try {
          const profileResponse = await profileRead();
          if (profileResponse.data.success) {
            const profile = profileResponse.data.data;
            
            // Check if essential fields are filled for clients
            const isCompleted = profile.name && profile.profession;
            if (isCompleted) {
              // User has completed onboarding, redirect to landing page
              navigate('/');
            } else {
              // User needs to complete onboarding
              navigate('/onboarding');
            }
          } else {
            // No profile data, redirect to onboarding
            navigate('/onboarding');
          }
        } catch (profileErr) {
          // If it's a 404 error (profile not found), redirect to onboarding
          if (profileErr.response && profileErr.response.status === 404) {
            navigate('/onboarding');
          } else {
            // For other errors, redirect to onboarding as well
            navigate('/onboarding');
          }
        }
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-zinc-900 p-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-black flex items-center justify-center">
            <img src={logo} alt="Logo" className="h-10 w-10" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-400">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Sign in to your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-zinc-900 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-300">{error}</h3>
                </div>
              </div>
            </div>
          )}
          <div className="rounded-md space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-100 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition duration-300"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-100 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition duration-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-300 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-green-600 hover:text-green-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition duration-300 transform hover:scale-[1.02]"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;