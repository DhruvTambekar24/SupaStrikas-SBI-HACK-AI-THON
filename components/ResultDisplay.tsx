import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ResultDisplayProps {
  loading: boolean;
  error: string;
  recommendation: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ loading, error, recommendation }) => {
  return (
    <div className="result-display">
      {loading && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="ms-2">Generating Recommendation...</span>
        </div>
      )}
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
      {recommendation && (
        <div className="mt-3">
          <ReactMarkdown>{recommendation}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
