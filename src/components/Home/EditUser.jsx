import { useEffect, useState } from "react";
import axios from "axios";
import './../../../public/css/dashboard.css'
import './../../../public/css/dashboard.rtl.css'
import './../../../public/assets/dist/css/bootstrap.min.css'
import App from "../layouts/App";
import Menu from "../global/Menu";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
    const navigate = useNavigate(); 

    const [inputs, setInputs] = useState({});

    const { id } = useParams();

    useEffect(() => {
        getUser();
    }, [id]);

    function getUser() {
    axios.get(`${BASE_API_URL}user/${id}`).then(function(response){
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
            const response = await axios.put(`${BASE_API_URL}${id}/edit`, inputs);
            console.log("Server response:", response.data);
    
            if (response.data.status === 1) {

                alert("Record created successfully!");

                // window.location.reload(true);
                navigate('/user');

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
                        <h1 className="h2">Edit user</h1>
                        <div className="btn-toolbar mb-2 mb-md-0">
                            <div className="btn-group me-2">
                            <a href="/user"
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                            >
                                Cancel
                            </a>
                            <button
                                type="submit"
                                className="btn btn-sm btn-outline-secondary"  onClick={handleSubmit}
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
                    <label htmlFor="name" className="form-label">
                        Email
                    </label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                name="name"
                                placeholder="Username"
                                value={inputs.name || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                name="email"
                                placeholder="Email"
                                value={inputs.email || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age">Age:</label>
                            <input
                                type="text"
                                id="age"
                                className="form-control"
                                name="age"
                                placeholder="Age"
                                value={inputs.age || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone">Phone:</label>
                            <input
                                type="text"
                                id="phone"
                                className="form-control"
                                name="phone"
                                placeholder="Phone"
                                value={inputs.phone || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="access">Access Role:</label>
                            <input
                                type="text"
                                id="access"
                                className="form-control"
                                name="access"
                                placeholder="Access Role"
                                value={inputs.access || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </form>
                </main>
            </Menu>
        </App>
        </>
    );
};

export default EditUser;
