import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../global/Menu";
import App from "../layouts/App";

const EditLoan = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [inputs, setInputs] = useState({
    id: '',
    Name: '',
    Contact: '',
    Address: '',
    Reference: '',
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
    LoanType: '',
  });

  const [loanTypes, setLoanTypes] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (id) {
      fetchData();
    }
    fetchLoanTypes();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}loandetails.php/${id}`);
      setInputs(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchLoanTypes = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}Loantype.php`);
      setLoanTypes(response.data);
    } catch (error) {
      console.error("Error fetching loan types:", error);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prevValues) => ({ ...prevValues, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));

    if (['Amount', 'InterestRate', 'PlanDuration'].includes(name)) {
      recalculateLoan();
    }
  };

  const recalculateLoan = () => {
    const loanAmount = parseFloat(inputs.Amount);
    const rate = parseFloat(inputs.InterestRate) / 100 / 12;
    const term = parseInt(inputs.PlanDuration, 10);

    if (!isNaN(loanAmount) && !isNaN(rate) && !isNaN(term) && term > 0) {
      const monthlyPayment = (loanAmount * rate) / (1 - Math.pow(1 + rate, -term));
      setInputs((prevData) => ({
        ...prevData,
        MonthlyPayableAmount: monthlyPayment.toFixed(2),
        TotalPayableAmount: (monthlyPayment * term).toFixed(2),
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Example validation: Ensure Name is not empty
    if (!inputs.Name.trim()) {
      errors.Name = 'Name is required';
    }
    if (!inputs.Contact.trim()) {
      errors.Contact = 'Contact is required';
    }
    // Add more validation rules for other fields...

    // Add validation rules for LoanType, DateReleased, and LoanDate
    if (!inputs.LoanType) {
      errors.LoanType = 'LoanType is required';
    }
    if (!inputs.DateReleased) {
      errors.DateReleased = 'DateReleased is required';
    }
    if (!inputs.LoanDate) {
      errors.LoanDate = 'LoanDate is required';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      console.error("Form has validation errors.");
      return;
    }

    try {
      const response = await axios.put(`${BASE_API_URL}loandetails.php/${id}/edit`, inputs);

      if (response.data.status === 1) {
        alert("Record updated successfully!");
        navigate('/loandetails');
      } else {
        console.error("Failed to update record.");
      }
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  return (
    <App>
      <Menu>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-1">
          <form>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-4 pb-3 border-bottom">
            <h1 className="h2">Edit Loan Application</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group me-2">
                <a
                  href="/LoanDetails"
                  className="btn btn-sm btn-outline-secondary"
                >
                  Cancel
                </a>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={handleSubmit}
                >
                  Update
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
            {Object.keys(inputs).map((fieldName) => (
              <div key={fieldName} className="mb-3">
                <label
                    htmlFor={fieldName}
                    className={`form-label ${fieldName === 'LoanType' || fieldName === 'id' ? 'hidden' : ''}`}
                    style={{ display: fieldName === 'LoanType' || fieldName === 'id' ? 'none' : 'block' }}
                >
                    {fieldName}
                </label>
                {fieldName === "DateReleased" || fieldName === "LoanDate" ? (
                  <input
                    type="date"
                    className={`form-control ${formErrors[fieldName] ? 'is-invalid' : ''}`}
                    id={fieldName}
                    name={fieldName}
                    value={inputs[fieldName]}
                    onChange={handleChange}
                  />
                ) : (
                  <input
                    type="text"
                    className={`form-control ${formErrors[fieldName] ? 'is-invalid' : ''}`}
                    id={fieldName}
                    name={fieldName}
                    placeholder={fieldName}
                    value={inputs[fieldName]}
                    onChange={handleChange}
                    readOnly={fieldName === 'MonthlyPayableAmount' || fieldName === 'TotalPayableAmount' || fieldName === 'id'}
                    hidden={fieldName === 'LoanType' || fieldName === 'id'} 
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
                value={inputs.LoanType}
                onChange={handleChange}
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
            {/* <button type="submit" className="btn btn-primary">
              Update
            </button> */}
          </form>
        </main>
      </Menu>
    </App>
  );
};

export default EditLoan;
