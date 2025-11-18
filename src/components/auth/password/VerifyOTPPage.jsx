import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOTP, resendOTP } from '../../../utils/Api';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify OTP
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the 6-digit OTP sent to your email address: <strong>{email || 'your email'}</strong>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {(message || error) && (
            <div className={`rounded-md p-4 ${message ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className={`text-sm ${message ? 'text-green-700' : 'text-red-700'}`}>
                {message || error}
              </div>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="otp" className="sr-only">
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-center text-2xl tracking-widest"
                placeholder="0 0 0 0 0 0"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Resend OTP
            </button>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? (
                <span>Verifying...</span>
              ) : (
                <span>Verify OTP</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTPPage;