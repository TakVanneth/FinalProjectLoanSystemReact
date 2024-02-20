import { useEffect, useState } from "react";
import axios from "axios";
import './../../../public/css/dashboard.css'
import './../../../public/css/dashboard.rtl.css'
import './../../../public/assets/dist/css/bootstrap.min.css'
import App from "../layouts/App";
import Menu from "../global/Menu";
import { useNavigate, useParams } from "react-router-dom";

const EditBorrower = () => {
    const navigate = useNavigate(); 

    const [inputs, setInputs] = useState({});

    const { id } = useParams();

    useEffect(() => {
        getPayment();
    }, [id]);

    function getPayment() {
    axios.get(`${BASE_API_URL}Borrower.php/${id}`).then(function(response){
    console.log(response.data);
    setInputs(response.data);
        });
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Form submitted with data:", inputs);
    
        try {
            const response = await axios.put(`${BASE_API_URL}Borrower.php/${inputs.id}/edit`, inputs);
            console.log("Server response:", response.data);
    
            if (response.data.status === 1) {

                alert("Record created successfully!");

                navigate('/Borrower');

            } else {

                console.error("Failed to create record.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    
    return (
        <>
        <App>
            <Menu>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-1">
                    <form>
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Edit Borrower info</h1>
                        <div className="btn-toolbar mb-2 mb-md-0">
                            <div className="btn-group me-2">
                            <a href="/Borrower"
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                            >
                                Cancel
                            </a>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                onClick={handleSubmit}
                            >
                                updates
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
                                value={inputs.Name || ""}
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
                                value={inputs.Address || ""}
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
                                value={inputs.Contact || ""}
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
                                value={inputs.Email || ""}
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
                                value={inputs.TaxID || ""}
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
                                value={inputs.CurrentLoan || ""}
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
                                value={inputs.NextPaymentSchedule || ""}
                            />
                        </div>
                    </form>
                </main>
            </Menu>
        </App>
        </>
    );
};

export default EditBorrower;
