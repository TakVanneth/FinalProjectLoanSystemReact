import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import App from "../layouts/App";
import Menu from "../global/Menu";

import './../../../public/css/dashboard.css';
import './../../../public/css/dashboard.rtl.css';
import './../../../public/assets/dist/css/bootstrap.min.css';

// Define the Add component
const AddBorrower = () => {

    // Get the navigate function for programmatic navigation
    const navigate = useNavigate();

    // State to manage form inputs
    const [inputs, setInputs] = useState({
        CurrentLoan: "none",
        NextPaymentSchedule: "N/A",
      });

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
            const response = await axios.post(`${BASE_API_URL}Borrower.php/save`, inputs);
            console.log("Server response:", response.data);

            // Check if the record was created successfully
            if (response.data.status === 1) {
                alert("Record created successfully!");
                navigate('/Borrower'); // Navigate to the '/Borrower' page
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
                            <h1 className="h2">Add Borrower</h1>
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
                            <div className="mb-3">
                                <label htmlFor="Name" className="form-label">
                                Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Name"
                                    name="Name"
                                    placeholder="Name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Address" className="form-label">
                                Address
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Address"
                                    name="Address"
                                    placeholder="Address"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Contact" className="form-label">
                                Contact
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Contact"
                                    name="Contact"
                                    placeholder="Contact"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Email"
                                    name="Email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="TaxID" className="form-label">
                                    Tax ID
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="TaxID"
                                    name="TaxID"
                                    placeholder="TaxID"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="CurrentLoan" className="form-label">
                                    Current Loan
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="CurrentLoan"
                                    name="EmaCurrentLoanil"
                                    placeholder="CurrentLoan"
                                    onChange={handleChange}
                                    value={inputs.CurrentLoan}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="NextPaymentSchedule" className="form-label">
                                    Next Payment Schedule
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="NextPaymentSchedule"
                                    name="NextPaymentSchedule"
                                    placeholder="NextPaymentSchedule"
                                    onChange={handleChange}
                                    value={inputs.NextPaymentSchedule}
                                />
                            </div>
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
export default AddBorrower;