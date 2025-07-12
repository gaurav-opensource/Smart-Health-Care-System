import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [amount] = useState(100); // Mock amount, adjust as needed
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        '/api/payments/mock',
        { appointmentId, amount },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert(response.data.message);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Payment</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-6 space-y-2">
        <p className="text-lg"><strong>Appointment ID:</strong> {appointmentId}</p>
        <p className="text-lg"><strong>Amount:</strong> ${amount}</p>
      </div>
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 disabled:bg-gray-400 transition duration-200"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
};

export default PaymentPage;