import React, { useEffect, useState } from "react";
import axios from "axios";
import App from "../layouts/App";
import Menu from "../global/Menu";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';
const List = () => {
    const isNoUser = !localStorage.getItem("user");
    if (isNoUser) {
      window.location.href = "/";
      return null;
    }
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
    axios.get(`${BASE_API_URL}users`).then(function(response){
    console.log(response.data);
    setUsers(response.data);
        });
    }

const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
        
    if (isConfirmed) {
        axios.delete(`${BASE_API_URL}user/${id}/delete`)
            .then(function(response){
                console.log(response.data);
                getUsers();
                if (response.data.status === 1) {
                    // alert("Record Deleted successfully!");
                    navigate('/user');
                } else {
                    console.error("Failed to delete record.");
                }
            })
            .catch(error => {
                console.error("Error deleting user:", error);
            });
    }
};

const [isFullScreen, setIsFullScreen] = useState(false);


const handleFullScreenToggle = () => {
    setIsFullScreen(!isFullScreen);
};

return (
    <App>
        <Menu>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-1">
                <div className={`fullscreen-container-user${isFullScreen ? ' fullscreen-user' : ''}`}>
                <form>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-4 pb-3 border-bottom">
                    <h1 className="h2">User List</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group me-2">
                            <a href="user/add" type="button" className="btn btn-sm btn-outline-secondary">
                                create
                            </a>
                            <button type="button" className="btn btn-sm btn-outline-secondary">
                                Export
                            </button>
                        <button type="button" className="btn btn-sm btn-outline-secondary px-3" onClick={handleFullScreenToggle}>
                            <FontAwesomeIcon icon={isFullScreen ? faCompress : faExpand} />
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
                <div className="table-responsive">
                    <table className="table fs-6">
                    <thead>
                        <tr className="align-middle">
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Age</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Access</th>
                            <th scope="col"  className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr key={index} className="align-middle">
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>{user.phone}</td>
                            <td>{user.access}</td>
                            <td  style={{ textAlign: 'right', width: '200px' }}>
                                <Link to={`${user.id}/edit`} className="btn btn-success border-0" >Edit</Link>
                                <button onClick={() => handleDelete(user.id)} className="btn btn-danger mx-3 border-0">Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                </form>
                </div>
            </main>
        </Menu>
    </App>
);
};

export default List;
