import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import App from "../layouts/App";
import Menu from "../global/Menu";

import './../../../public/css/dashboard.css';
import './../../../public/css/dashboard.rtl.css';
import './../../../public/assets/dist/css/bootstrap.min.css';

// Define the AddLoan component
const AddLoan = () => {
  // Get the navigate function for programmatic navigation
  const navigate = useNavigate();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    Name: '',
    Contact: '',
    Address: '',
    Reference: '',
    // LoanType: '',
    PlanDuration: '',
    InterestRate: '',
    Installments: '',
    Amount: '',
    TotalPayableAmount: '',
    MonthlyPayableAmount: '',
    OverduePayableAmount: '',
    DateReleased: '',
    LoanDate: '',
    MonthlyAmount: '',
    Penalty: '',
    PayableAmount: '',
  });

  // State to manage loan types fetched from the API
  const [loanTypes, setLoanTypes] = useState([]);

  // State to manage form validation errors
  const [formErrors, setFormErrors] = useState({});

  // Fetch loan types from the API on component mount
  useEffect(() => {
    const fetchLoanTypes = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}loanType.php`);
        setLoanTypes(response.data);
      } catch (error) {
        console.error("Error fetching loan types:", error);
      }
    };

    fetchLoanTypes();
  }, []); // Empty dependency array ensures that this effect runs only once on mount

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // Clear validation error when user types
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    if (['Amount', 'InterestRate', 'PlanDuration'].includes(name)) {
        recalculateLoan();
      }
  };
  const recalculateLoan = () => {
    const loanAmount = parseFloat(formData.Amount);
    const rate = parseFloat(formData.InterestRate) / 100 / 12;
    const term = parseInt(formData.PlanDuration, 10);

    if (!isNaN(loanAmount) && !isNaN(rate) && !isNaN(term) && term > 0) {
      const monthlyPayment = (loanAmount * rate) / (1 - Math.pow(1 + rate, -term));
      setFormData((prevData) => ({
        ...prevData,
        MonthlyPayableAmount: monthlyPayment.toFixed(2),
        TotalPayableAmount: (monthlyPayment * term).toFixed(2),
      }));
    }
};
  // Validate form inputs
  const validateForm = () => {
    const errors = {};

    // Example validation: Ensure Name is not empty
    if (!formData.Name.trim()) {
      errors.Name = 'Name is required';
    }
    if (!formData.Contact.trim()) {
      errors.Contact = 'Contact is required';
    }
    if (!formData.Address.trim()) {
      errors.Address = 'Address is required';
    }
    if (!formData.Reference.trim()) {
      errors.Reference = 'Reference is required';
    }
    if (!formData.PlanDuration.trim()) {
      errors.PlanDuration = 'PlanDuration is required';
    }
    if (!formData.InterestRate.trim()) {
        errors.InterestRate = 'InterestRate is required';
      }
    if (!formData.Installments.trim()) {
        errors.Installments = 'Installments is required';
    }
    if (!formData.Amount.trim()) {
        errors.Amount = 'Amount is required';
    }
    if (!formData.TotalPayableAmount.trim()) {
        errors.TotalPayableAmount = 'TotalPayableAmount is required';
    }
    if (!formData.MonthlyPayableAmount.trim()) {
        errors.MonthlyPayableAmount = 'MonthlyPayableAmount is required';
    }
    if (!formData.OverduePayableAmount.trim()) {
        errors.OverduePayableAmount = 'OverduePayableAmount is required';
    }
    if (!formData.Penalty.trim()) {
        errors.Penalty = 'Penalty is required';
    }
    if (!formData.PayableAmount.trim()) {
        errors.PayableAmount = 'PayableAmount is required';
    }
    if (!formData.DateReleased.trim()) {
        errors.DateReleased = 'DateReleased is required';
    }
    if (!formData.LoanDate.trim()) {
        errors.LoanDate = 'LoanDate is required';
    }
    if (!formData.MonthlyAmount.trim()) {
        errors.MonthlyAmount = 'MonthlyAmount is required';
    }

    // Set form errors
    setFormErrors(errors);

    // Return true if no errors, indicating the form is valid
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form before submitting
    if (!validateForm()) {
      console.error("Form has validation errors.");
      return;
    }

    console.log("Form submitted with data:", formData);

    try {
      // Make a POST request to the server API
      const response = await axios.post(`${BASE_API_URL}loandetails.php/save`, formData);
      console.log("Server response:", response.data);

      // Check if the record was created successfully
      if (response.data.status === 1) {
        alert("Record created successfully!");
        navigate('/Loandetails'); // Navigate to the '/Loandetails' page
      } else {
        console.error("Failed to create record.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // JSX rendering
  return (
    <>
      <App>
        <Menu>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-1">
            <form>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-4 pb-3 border-bottom">
                <h1 className="h2">Add New Loan Application</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                  <div className="btn-group me-2">
                    <a
                      href="/Loandetails"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Cancel
                    </a>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={handleSubmit}
                    >
                      Insert
                    </button>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1"
                  >
                    <svg className="bi">
                      <use xlinkHref="#calendar3" />
                    </svg>
                    This week
                  </button>
                </div>
              </div>

              {/* ... your form inputs ... */}
              {Object.keys(formData).map((fieldName) => (
                <div key={fieldName} className="mb-3">
                  <label htmlFor={fieldName} className="form-label">
                    {fieldName}
                  </label>
                  {fieldName === "DateReleased" || fieldName === "LoanDate" ? (
                    <input
                      type="date"
                      className={`form-control ${formErrors[fieldName] ? 'is-invalid' : ''}`}
                      id={fieldName}
                      name={fieldName}
                      value={formData[fieldName]}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <input
                      type="text"
                      className={`form-control ${formErrors[fieldName] ? 'is-invalid' : ''}`}
                      id={fieldName}
                      name={fieldName}
                      placeholder={fieldName}
                      value={formData[fieldName]}
                      onChange={handleInputChange}
                      readOnly={fieldName === 'MonthlyPayableAmount' || fieldName === 'TotalPayableAmount'}

                    />
                  )}
                  {formErrors[fieldName] && (
                    <div className="invalid-feedback">{formErrors[fieldName]}</div>
                  )}
                </div>
              ))}

              <div className="mb-3">
                <label htmlFor="LoanType" className="form-label">
                  Loan Type
                </label>
                <select
                  className={`form-select ${formErrors.LoanType ? 'is-invalid' : ''}`}
                  id="LoanType"
                  name="LoanType"
                  value={formData.LoanType}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>Select a Loan Type</option>
                  {loanTypes.map((type) => (
                    <option key={type.id} value={type.LoanType}>
                      {type.LoanType}
                    </option>
                  ))}
                </select>
                {formErrors.LoanType && (
                  <div className="invalid-feedback">{formErrors.LoanType}</div>
                )}
              </div>
            </form>
          </main>
        </Menu>
      </App>
    </>
  );
};

export default AddLoan;
