import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './../../../public/css/dashboard.css';
import './../../../public/css/dashboard.rtl.css';
import './../../../public/assets/dist/css/bootstrap.min.css';

const Content = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    phone: '',
    access: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    phone: '',
    access: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevValues) => ({ ...prevValues, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    let isValid = true;

    // Reset previous error messages
    setErrors({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: '',
      phone: '',
      access: '',
    });

    // Validate each field
    if (!inputs.name.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Please enter a username' }));
      isValid = false;
    }

    if (!inputs.email.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Please enter an email address' }));
      isValid = false;
    } else {
      // Check if the email is in a valid format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputs.email)) {
        setErrors((prevErrors) => ({ ...prevErrors, email: 'Please enter a valid email address' }));
        isValid = false;
      }
    }

    if (!inputs.password.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Please enter a password' }));
      isValid = false;
    } else if (inputs.password.length < 8) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password must be at least 8 characters' }));
      isValid = false;
    }

    if (!inputs.confirmPassword.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: 'Please confirm the password' }));
      isValid = false;
    }

    if (inputs.password !== inputs.confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: 'Password and confirm password do not match' }));
      isValid = false;
    }

    if (!inputs.age.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, age: 'Please enter your age' }));
      isValid = false;
    }

    if (!inputs.phone.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, phone: 'Please enter a phone number' }));
      isValid = false;
    }

    if (!inputs.access.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, access: 'Please select an access role' }));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log('Form submitted with data:', inputs);

    try {
      const response = await axios.post(`${BASE_API_URL}api/user/save`, inputs);
      console.log('Server response:', response.data);

      if (response.data.status === 1) {
        alert('Record created successfully!');
        navigate('/user');
      } else {
        setErrorMessage('Failed to create record.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Error submitting form. Please try again.');
    }
  };

  return (
    <>
      <form encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Username
          </label>
          <input
            type="text"
            className={`form-control mb-3 ${errors.name ? 'is-invalid' : ''}`}
            id="name"
            name="name"
            placeholder="Username"
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`form-control mb-3 ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control mb-3 ${errors.password ? 'is-invalid' : ''}`}
            id="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className={`form-control mb-3 ${errors.confirmPassword ? 'is-invalid' : ''}`}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
          />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="text"
            className={`form-control mb-3 ${errors.age ? 'is-invalid' : ''}`}
            id="age"
            name="age"
            placeholder="Age"
            onChange={handleChange}
          />
          {errors.age && <div className="invalid-feedback">{errors.age}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className={`form-control mb-3 ${errors.phone ? 'is-invalid' : ''}`}
            id="phone"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="access" className="form-label">
            Access Role
          </label>
          <select
            className={`form-select mb-3 ${errors.access ? 'is-invalid' : ''}`}
            id="access"
            name="access"
            onChange={handleChange}
            value={inputs.access}
          >
            <option value="" disabled>Select Access Role</option>
            <option value="Manager">Manager</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          {errors.access && <div className="invalid-feedback">{errors.access}</div>}
        </div>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <button type="button" className="btn btn-success mb-3" onClick={handleSubmit}>
          Save
        </button>
      </form>
    </>
  );
};

export default Content;
