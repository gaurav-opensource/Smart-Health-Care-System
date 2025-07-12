import React from 'react';
import { Link } from 'react-router-dom';
import homeImg from './assert/Homejs.png';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[250vh]">
      <main className="flex-grow w-full">
        {/* Hero Section */}
        <section
          className="relative h-[140vh] bg-cover bg-center w-full"
      style={{ backgroundImage: `url(${homeImg})`,
                backgroundPosition: 'center',
     }}
        >
          <div className="absolute inset-0 flex items-center  mt-4">
            <div className=" text-white px-6 py-10 bg-opacity-75 rounded-lg">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                Healthcare focused <br/>on you
              </h1>
              <p className="text-xl md:text-2xl mb-8 drop-shadow-lg ">
                 Care When You Need It
              </p>
              <Link
                to="/signup"
                className="inline-block bg-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
              How We Can Help
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-gray-50 rounded-lg shadow-md text-center">
                <svg
                  className="h-12 w-12 text-purple-600 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Primary Care
                </h3>
                <p className="text-gray-600">
                  Book appointments for in-person or online consultations with top doctors.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg shadow-md text-center">
                <svg
                  className="h-12 w-12 text-purple-600 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Specialist Consultations
                </h3>
                <p className="text-gray-600">
                  Access advanced diagnostic services with quick results.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg shadow-md text-center">
                <svg
                  className="h-12 w-12 text-purple-600 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Health Records
                </h3>
                <p className="text-gray-600">
                  Manage your medical history and prescriptions securely.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Doctor Section */}
<section className="py-16 bg-white border-t border-gray-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-4xl font-bold text-gray-800 mb-6">
      Are You a Doctor?
    </h2>
    <p className="text-xl text-gray-600 mb-8">
      Join our growing network of trusted healthcare professionals. Reach more patients and deliver care efficiently.
    </p>
    <Link
      to="/signup"
      className="inline-block bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-700 transition-colors"
    >
      Join as a Doctor
    </Link>
  </div>
</section>


        {/* Why Choose Us Section */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-3xl font-bold text-purple-600 mb-2">24/7</h3>
                <p className="text-gray-600">
                  Access care anytime with our round-the-clock services.
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-purple-600 mb-2">1M+</h3>
                <p className="text-gray-600">
                  Trusted by over 1 million patients worldwide.
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-purple-600 mb-2">500+</h3>
                <p className="text-gray-600">
                  Partnered with over 500 top healthcare providers.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}