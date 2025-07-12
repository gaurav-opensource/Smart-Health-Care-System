import React, { useState } from 'react';
import axios from 'axios';

const UploadTestReport = ({ appointmentId }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      return setMessage('Please select a file first.');
    }

    const formData = new FormData();
    formData.append('test', file); // 👈 Make sure backend expects 'test'

    try {
      const res = await axios.post(
        `http://localhost:5000/api/appointments/${appointmentId}/test`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMessage('✅ Test report uploaded successfully!');
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to upload test report.');
    }
  };

  return (
    <div className="upload-test-report p-4 border mt-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Upload Test Report</h3>
      <form onSubmit={handleUpload} className="space-y-2">
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png"
          className="block"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default UploadTestReport;
