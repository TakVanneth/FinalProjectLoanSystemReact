import { useEffect, useState } from "react";
import axios from "axios";
import './../../../public/css/dashboard.css'
import './../../../public/css/dashboard.rtl.css'
import './../../../public/assets/dist/css/bootstrap.min.css'
import App from "../layouts/App";
import Menu from "../global/Menu";
import { useNavigate, useParams } from "react-router-dom";

const EditPayment = () => {
    const navigate = useNavigate(); 

    const [inputs, setInputs] = useState({});

    const { id } = useParams();

    useEffect(() => {
        getPayment();
    }, [id]);

    function getPayment() {
    axios.get(`${BASE_API_URL}payment.php/${id}`).then(function(response){
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
            const response = await axios.put(`${BASE_API_URL}payment.php/${inputs.PaymentID}/edit`, inputs);
            console.log("Server response:", response.data);
    
            if (response.data.status === 1) {

                alert("Record created successfully!");

                // window.location.reload(true);
                navigate('/payment');

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
                        <h1 className="h2">Edit payment info</h1>
                        <div className="btn-toolbar mb-2 mb-md-0">
                            <div className="btn-group me-2">
                            <a href="/payment"
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
                    <label htmlFor="LoanReferenceNo" className="form-label">
                        Loan Referencem No
                    </label>
                            <input
                                type="text"
                                id="LoanReferenceNo"
                                className="form-control"
                                name="LoanReferenceNo"
                                placeholder="LoanReferenceNo"
                                value={inputs.LoanReferenceNo || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Payee">Payee:</label>
                            <input
                                type="text"
                                id="Payee"
                                className="form-control"
                                name="Payee"
                                placeholder="Payee"
                                value={inputs.Payee || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Amount">Amount:</label>
                            <input
                                type="text"
                                id="Amount"
                                className="form-control"
                                name="Amount"
                                placeholder="Amount"
                                value={inputs.Amount || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Penalty">Penalty:</label>
                            <input
                                type="text"
                                id="Penalty"
                                className="form-control"
                                name="Penalty"
                                placeholder="Penalty"
                                value={inputs.Penalty || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="button" className="btn" onClick={handleSubmit}>Save</button>
                    </form>
                </main>
            </Menu>
        </App>
        </>
    );
};

export default EditPayment;
