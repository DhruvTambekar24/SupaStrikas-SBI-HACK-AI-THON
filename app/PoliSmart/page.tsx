"use client";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PolicyForm from '../../components/PolicyForm';
import ResultDisplay from '../../components/ResultDisplay';

const Page: React.FC = () => {
  const [recommendation, setRecommendation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleFormSubmit = async (formData: any): Promise<void> => {
    setLoading(true);
    setError('');
    setRecommendation('');

    try {
      const response = await fetch('https://code-runner-fast-api.vercel.app/recommend_policy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setRecommendation(result.recommendation);
    } catch (err) {
      setError('Error fetching policy recommendation. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="container py-5">
        <header className="text-center mb-5">
          <h1 className="display-4 text-white">PoliSmart Dynamic Policy Recommender</h1>
          <p className="lead text-white-50">
            Get a personalized insurance policy recommendation tailored to your unique profile.
          </p>
        </header>
        <div className="row">
          <div className="col-lg-6 mb-4">
            <div className="card p-4 shadow form-card">
              <PolicyForm onSubmit={handleFormSubmit} />
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <div className="card p-4 shadow result-card">
              <ResultDisplay loading={loading} error={error} recommendation={recommendation} />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        /* Overall Background & Container */
        .app-container {
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          min-height: 100vh;
          padding-bottom: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .container {
          max-width: 1100px;
        }
        /* Header Styles */
        header h1 {
          font-weight: bold;
          font-size: 2.75rem;
          margin-bottom: 0.5rem;
        }
        header p {
          font-size: 1.25rem;
        }
        /* Card Styles for Form and Result */
        .card {
          border: none;
          border-radius: 15px;
          background: #ffffff;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }
        .form-card, .result-card {
          animation: fadeIn 1s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        /* Policy Form Specific */
        .form-card .form-label {
          font-weight: 600;
          margin-bottom: 5px;
        }
        .form-card .form-control,
        .form-card .form-select {
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
};

export default Page;
