// Import necessary dependencies and styles
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import App from "../layouts/App";
import Menu from "../global/Menu";

import './../../../public/css/dashboard.css';
import './../../../public/css/dashboard.rtl.css';
import './../../../public/assets/dist/css/bootstrap.min.css';

// Define the Add component
const Add = () => {
    // Get the navigate function for programmatic navigation
    const navigate = useNavigate();

    // State to manage form inputs
    const [inputs, setInputs] = useState({});

    // Handle input changes
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs((prevValues) => ({ ...prevValues, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Form submitted with data:", inputs);

        try {
            // Make a POST request to the server API
            const response = await axios.post(`${BASE_API_URL}payment.php/save`, inputs);
            console.log("Server response:", response.data);

            // Check if the record was created successfully
            if (response.data.status === 1) {
                alert("Record created successfully!");
                navigate('/payment'); // Navigate to the '/payment' page
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
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-4 pb-3 border-bottom">
                            <h1 className="h2">Add Payment</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group me-2">
                                    {/* Back button */}
                                    <a href="/payment" type="button" className="btn btn-sm btn-outline-secondary">
                                        Back
                                    </a>
                                    {/* Export button */}
                                    <button type="button" className="btn btn-sm btn-outline-secondary">
                                        Export
                                    </button>
                                </div>
                                {/* Dropdown button */}
                                <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1">
                                    <svg className="bi">
                                        <use xlinkHref="#calendar3" />
                                    </svg>
                                    This week
                                </button>
                            </div>
                        </div>
                        {/* Payment form */}
                        <form>
                            {/* Loan Reference No input */}
                            <div className="mb-3">
                                <label htmlFor="LoanReferenceNo" className="form-label">
                                    Loan Reference No
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="LoanReferenceNo"
                                    name="LoanReferenceNo"
                                    placeholder="LoanReferenceNo"
                                    onChange={handleChange}
                                />
                            </div>
                            {/* Payee input */}
                            <div className="mb-3">
                                <label htmlFor="Payee" className="form-label">
                                    Payee
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Payee"
                                    name="Payee"
                                    placeholder="Payee"
                                    onChange={handleChange}
                                />
                            </div>
                            {/* Amount input */}
                            <div className="mb-3">
                                <label htmlFor="Amount" className="form-label">
                                    Amount
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Amount"
                                    name="Amount"
                                    placeholder="Amount"
                                    onChange={handleChange}
                                />
                            </div>
                            {/* Penalty input */}
                            <div className="mb-3">
                                <label htmlFor="Penalty" className="form-label">
                                    Penalty
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Penalty"
                                    name="Penalty"
                                    placeholder="Penalty"
                                    onChange={handleChange}
                                />
                            </div>
                            {/* Save button */}
                            <button type="button" className="btn btn-success" onClick={handleSubmit}>
                                Save
                            </button>
                        </form>
                    </main>
                </Menu>
            </App>
        </>
    );
};

// Export the Add component as the default export
export default Add;
