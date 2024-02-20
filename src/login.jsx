import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    txtemail: "",
    txtpass: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    pass: "",
    login: "",
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios.get(`${BASE_API_URL}users`)
      .then(response => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    let isValid = true;

    if (!formData.txtemail.trim()) {
      setErrors(prevErrors => ({ ...prevErrors, email: "Please enter your email." }));
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.txtemail)) {
      setErrors(prevErrors => ({ ...prevErrors, email: "Please enter a valid email address." }));
      isValid = false;
    }

    if (!formData.txtpass.trim()) {
      setErrors(prevErrors => ({ ...prevErrors, pass: "Please enter your password." }));
      isValid = false;
    } else if (formData.txtpass.trim().length < 8) {
      setErrors(prevErrors => ({ ...prevErrors, pass: "Password must be at least 8 characters." }));
      isValid = false;
    }

    return isValid;
  };

  const Userlogin = () => {
    if (!validateForm()) {
      return;
    }

    const foundUser = users.find(user => user.email === formData.txtemail && user.password === formData.txtpass);

    if (foundUser) {
      localStorage.setItem('user', formData.txtemail);
      localStorage.setItem('name', foundUser.name);
      localStorage.setItem('access', foundUser.access);
      navigate('/Dashboard');
    } else {
      setErrors(prevErrors => ({ ...prevErrors, login: "Invalid Email or Password!" }));
    }
  };

  return (
    <div className="limiter">
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <link rel="stylesheet" href="./public/css/login.css" />
      <link rel="stylesheet" href="./public/css/util.css" />
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-form-title" style={{ backgroundImage: "url(https://www.beltei.edu.kh/biue/images/homepics/document/beltei_international_university_in_cambodia_building.jpg)" }}>
            <span className="login100-form-title-1">Sign In</span>
            <span className="text-danger">{errors.login}</span>
          </div>
          <form className="login100-form validate-form">
            <div className="wrap-input100 validate-input m-b-26" data-validate="Username is required">
              <span className="label-input100">Email</span>
              <input
                className={`input100 ${errors.email ? 'is-invalid' : ''}`}
                type="email"
                name="txtemail"
                placeholder="Enter email"
                value={formData.txtemail}
                onChange={handleChange}
              />
              <span className="focus-input100" />
              <span className="text-danger" style={{fontSize: '.9rem'}}>{errors.email}</span>
            </div>
            <div className="wrap-input100 validate-input m-b-18" data-validate="Password is required">
              <span className="label-input100">Password</span>
              <input
                className={`input100 ${errors.pass ? 'is-invalid' : ''}`}
                type="password"
                name="txtpass"
                placeholder="Enter password"
                value={formData.txtpass}
                onChange={handleChange}
              />
              <span className="focus-input100" />
              <span className="text-danger" style={{fontSize: '.9rem'}}>{errors.pass}</span>
            </div>
            <div className="flex-sb-m w-full p-b-30">
              <div className="contact100-form-checkbox">
                <input
                  className="input-checkbox100"
                  id="ckb1"
                  type="checkbox"
                  name="remember-me"
                />
                <label className="label-checkbox100" htmlFor="ckb1">
                  Remember me
                </label>
              </div>
              <div>
                <a href="#" className="txt1">
                  Forgot Password?
                </a>
              </div>
            </div>
            <div className="container-login100-form-btn">
              <button className="login100-form-btn" type="button" onClick={Userlogin}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
