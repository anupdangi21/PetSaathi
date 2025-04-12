import React, { useState, useRef } from 'react';
import { Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function ResetPass() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [otp, setOtp] = useState(Array(6).fill(''));
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const inputRefs = Array(6).fill().map(() => useRef(null));

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/sendresetotp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            setShowOTP(true);
            Swal.fire('Success!', 'OTP sent to your email', 'success');
        } catch (error) {
            Swal.fire('Error!', error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (newPassword !== confirmPassword) {
            Swal.fire('Error!', 'Passwords do not match', 'error');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    otp: otp.join(''),
                    newPassword
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            Swal.fire('Success!', 'Password reset successful', 'success')
                .then(() => navigate('/login'));
        } catch (error) {
            Swal.fire('Error!', error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleOTPChange = (index, value) => {
        if (/^[0-9]$/.test(value) || value === '') {
            const newOTP = [...otp];
            newOTP[index] = value;
            setOtp(newOTP);

            if (value !== '' && index < 5) {
                inputRefs[index + 1].current.focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <button 
                    onClick={() => navigate(-1)}
                    className="mb-4 flex items-center text-gray-600 hover:text-gray-800"
                >
                    ← Back
                </button>

                <div className="flex flex-col items-center mb-8">
                    <div className="bg-orange-100 p-3 rounded-full mb-4">
                        <Mail className="w-8 h-8 text-orange-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Password Reset</h1>
                    <p className="text-gray-600 text-center mt-2">
                        {showOTP ? 
                        "Enter OTP and new password" : 
                        "Enter your email to receive a verification code"}
                    </p>
                </div>

                {!showOTP ? (
                    <form onSubmit={handleSendOTP} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border focus:ring-orange-500 focus:border-orange-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50"
                        >
                            {loading ? 'Sending...' : 'Send Verification Code'}
                        </button>
                    </form>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-between gap-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={inputRefs[index]}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleOTPChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-12 text-center text-xl border rounded-lg focus:ring-orange-500"
                                />
                            ))}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border focus:ring-orange-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border focus:ring-orange-500"
                                required
                            />
                        </div>

                        <button
                            onClick={handleVerifyOTP}
                            disabled={loading || otp.some(d => !d) || !newPassword || newPassword !== confirmPassword}
                            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50"
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ResetPass;