import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { verifyOTP, resendOTP } from '../../../utils/Api';
import logo from '../../../assets/br-logo.png';

const VerifyOTPPage = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get email from location state
  const { email } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    // Validate email exists
    if (!email) {
      setError('Email not found. Please go back and enter your email.');
      setLoading(false);
      return;
    }

    try {
      const response = await verifyOTP({ email, otp });
      
      if (response.data.success) {
        setMessage(response.data.message);
        // Redirect to reset password page after a short delay
        setTimeout(() => {
          navigate('/reset-password', { state: { email, otp } });
        }, 2000);
      } else {
        setError(response.data.message || 'Failed to verify OTP');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while verifying OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setMessage('');
    setError('');
    
    if (!email) {
      setError('Email not found. Please go back and enter your email.');
      setLoading(false);
      return;
    }

    try {
      await resendOTP({ email });
      setMessage('OTP has been resent to your email address.');
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
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
            Verify OTP
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Enter the 6-digit OTP sent to your email address: <strong>{email || 'your email'}</strong>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {(message || error) && (
            <div className={`rounded-md p-4 ${message ? 'bg-zinc-800' : 'bg-zinc-800'}`}>
              <div className="flex">
                {message ? (
                  <>
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-300">{message}</h3>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-300">{error}</h3>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          <div className="rounded-md space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                OTP
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                maxLength="6"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-100 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm text-center text-2xl tracking-widest transition duration-300"
                placeholder="0 0 0 0 0 0"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-gray-600 text-sm font-medium rounded-lg text-gray-300 bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition duration-300"
            >
              Resend OTP
            </button>
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
                  Verifying...
                </span>
              ) : (
                <span>Verify OTP</span>
              )}
            </button>
          </div>
        </form>
        <div className="text-center text-sm text-gray-300">
          Didn't receive the email? Check your spam folder or{' '}
          <button 
            onClick={handleResendOTP} 
            disabled={loading}
            className="font-medium text-green-600 hover:text-green-500 disabled:opacity-50"
          >
            resend OTP
          </button>
        </div>
        <div className="text-center text-sm text-gray-300">
          <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
            Back to Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTPPage;