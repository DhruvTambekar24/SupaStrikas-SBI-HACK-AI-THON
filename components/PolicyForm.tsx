import React, { useState, FormEvent } from 'react';

export interface PolicyFormPayload {
  customer_id: string;
  insurance_type: string;
  customer_age: number;
  employment_status: string;
  marital_status: string;
  dependents: number;
  health_status: string;
  existing_coverage: string;          // API expects "existing_coverage"
  text_data: string;                  // API expects "text_data" for lifestyle & goals
  numerical_data: {
    income: number;
    existingPremium: number;
  };
  additional_financial_goals: string; // API expects "additional_financial_goals"
  behavioral_data: {
    recentInteractions: string;       // API expects this property
  };
}

interface PolicyFormProps {
  onSubmit: (payload: PolicyFormPayload) => void;
}

const PolicyForm: React.FC<PolicyFormProps> = ({ onSubmit }) => {
  const [customerId, setCustomerId] = useState('');
  const [insuranceType, setInsuranceType] = useState('life');
  const [customerAge, setCustomerAge] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('employed');
  const [maritalStatus, setMaritalStatus] = useState('single');
  const [dependents, setDependents] = useState('');
  const [healthStatus, setHealthStatus] = useState('good');
  const [currentCoverage, setCurrentCoverage] = useState('');
  const [personalGoals, setPersonalGoals] = useState('');
  const [income, setIncome] = useState('');
  const [existingPremium, setExistingPremium] = useState('');
  const [additionalObjectives, setAdditionalObjectives] = useState('');
  const [recentEngagement, setRecentEngagement] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload: PolicyFormPayload = {
      customer_id: customerId,
      insurance_type: insuranceType,
      customer_age: parseInt(customerAge, 10),
      employment_status: employmentStatus,
      marital_status: maritalStatus,
      dependents: parseInt(dependents, 10),
      health_status: healthStatus,
      existing_coverage: currentCoverage, // mapping from currentCoverage state
      text_data: personalGoals,           // mapping from personalGoals state
      numerical_data: {
        income: parseFloat(income),
        existingPremium: parseFloat(existingPremium),
      },
      additional_financial_goals: additionalObjectives, // mapping from additionalObjectives state
      behavioral_data: {
        recentInteractions: recentEngagement,           // mapping from recentEngagement state
      },
    };
    onSubmit(payload);
  };

  return (
    <div className="policy-form">
      <form onSubmit={handleSubmit}>
        {/* Customer ID */}
        <div className="mb-3">
          <label htmlFor="customerId" className="form-label">Customer ID</label>
          <input
            type="text"
            className="form-control"
            id="customerId"
            placeholder="e.g., CUST001"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          />
        </div>

        {/* Insurance Type */}
        <div className="mb-3">
          <label htmlFor="insuranceType" className="form-label">Insurance Type</label>
          <select
            className="form-select"
            id="insuranceType"
            value={insuranceType}
            onChange={(e) => setInsuranceType(e.target.value)}
            required
          >
            <option value="life">Life</option>
            <option value="health">Health</option>
            <option value="auto">Auto</option>
            <option value="home">Home</option>
          </select>
        </div>

        {/* Customer Age */}
        <div className="mb-3">
          <label htmlFor="customerAge" className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            id="customerAge"
            placeholder="e.g., 35"
            value={customerAge}
            onChange={(e) => setCustomerAge(e.target.value)}
            required
          />
        </div>

        {/* Employment Status */}
        <div className="mb-3">
          <label htmlFor="employmentStatus" className="form-label">Employment</label>
          <select
            className="form-select"
            id="employmentStatus"
            value={employmentStatus}
            onChange={(e) => setEmploymentStatus(e.target.value)}
            required
          >
            <option value="employed">Employed</option>
            <option value="self-employed">Self-Employed</option>
            <option value="unemployed">Unemployed</option>
            <option value="retired">Retired</option>
          </select>
        </div>

        {/* Marital Status */}
        <div className="mb-3">
          <label htmlFor="maritalStatus" className="form-label">Marital Status</label>
          <select
            className="form-select"
            id="maritalStatus"
            value={maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value)}
            required
          >
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>

        {/* Dependents */}
        <div className="mb-3">
          <label htmlFor="dependents" className="form-label">Dependents</label>
          <input
            type="number"
            className="form-control"
            id="dependents"
            placeholder="e.g., 2"
            value={dependents}
            onChange={(e) => setDependents(e.target.value)}
            required
          />
        </div>

        {/* Health Status */}
        <div className="mb-3">
          <label htmlFor="healthStatus" className="form-label">Health</label>
          <select
            className="form-select"
            id="healthStatus"
            value={healthStatus}
            onChange={(e) => setHealthStatus(e.target.value)}
            required
          >
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="average">Average</option>
            <option value="poor">Poor</option>
          </select>
        </div>

        {/* Current Coverage */}
        <div className="mb-3">
          <label htmlFor="currentCoverage" className="form-label">Current Coverage</label>
          <textarea
            className="form-control"
            id="currentCoverage"
            rows={2}
            placeholder="e.g., Term life with $250k"
            value={currentCoverage}
            onChange={(e) => setCurrentCoverage(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Lifestyle & Goals */}
        <div className="mb-3">
          <label htmlFor="personalGoals" className="form-label">Lifestyle & Goals</label>
          <textarea
            className="form-control"
            id="personalGoals"
            rows={2}
            placeholder="e.g., Active; secure retirement planning"
            value={personalGoals}
            onChange={(e) => setPersonalGoals(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Financial Data */}
        <div className="mb-3">
          <label className="form-label">Financial Data</label>
          <div className="row">
            <div className="col-md-6 mb-2">
              <input
                type="number"
                className="form-control"
                id="income"
                placeholder="Income (e.g., 60000)"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 mb-2">
              <input
                type="number"
                className="form-control"
                id="existingPremium"
                placeholder="Premium (e.g., 120)"
                value={existingPremium}
                onChange={(e) => setExistingPremium(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Additional Objectives */}
        <div className="mb-3">
          <label htmlFor="additionalObjectives" className="form-label">Additional Goals</label>
          <textarea
            className="form-control"
            id="additionalObjectives"
            rows={2}
            placeholder="e.g., Build retirement fund"
            value={additionalObjectives}
            onChange={(e) => setAdditionalObjectives(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Recent Engagement */}
        <div className="mb-3">
          <label htmlFor="recentEngagement" className="form-label">Recent Engagement</label>
          <textarea
            className="form-control"
            id="recentEngagement"
            rows={2}
            placeholder="e.g., Compared policies online"
            value={recentEngagement}
            onChange={(e) => setRecentEngagement(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Get Recommendation
        </button>
      </form>
      <style jsx>{`
        .policy-form {
          background-color: rgba(255, 255, 255, 0.95);
          border-radius: 12px;
          padding: 20px;
          color: #333;
          animation: fadeInUp 0.8s ease-in-out;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .policy-form .form-label {
          font-weight: 600;
          margin-bottom: 5px;
        }
        .policy-form .form-control,
        .policy-form .form-select {
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
};

export default PolicyForm;
