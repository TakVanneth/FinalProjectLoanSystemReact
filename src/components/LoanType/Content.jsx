import React, { useEffect, useState } from "react";
import axios from "axios";

const Content = () => {
  const [loanTypes, setLoanTypes] = useState([]);
  const [inputs, setInputs] = useState({ LoanType: "", Description: "" });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingLoanId, setEditingLoanId] = useState(null);

  useEffect(() => {
    getLoanTypes();
  }, []);

  const getLoanTypes = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/LoanType.php`);
      setLoanTypes(response.data);
    } catch (error) {
      console.error("Error fetching loan types:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleEdit = (id) => {
    setIsEditMode(true);
    setEditingLoanId(id);

    const selectedLoan = loanTypes.find((loan) => loan.id === id);
    setInputs({
      LoanType: selectedLoan.LoanType,
      Description: selectedLoan.Description,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let response;

      if (isEditMode) {
        // Update existing loan type in the database
        response = await axios.put(
          `${BASE_API_URL}LoanType.php/${editingLoanId}/edit`,
          { ...inputs, id: editingLoanId }  // Include the loan type id in the request payload
        );
      } else {
        // Add new loan type
        response = await axios.post(`${BASE_API_URL}LoanType.php/save`, inputs);
      }

      console.log("Server response:", response.data);

      if (response.data.status === 1) {
        // alert(isEditMode ? "Record updated successfully!" : "Record created successfully!");
        setIsEditMode(false);
        setEditingLoanId(null);
        setInputs({ LoanType: "", Description: "" });
        getLoanTypes(); // Refresh the loan types after update or add
      } else {
        console.error(isEditMode ? "Failed to update record." : "Failed to create record.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setEditingLoanId(null);
    setInputs({ LoanType: "", Description: "" });
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this Loan Type?");

    if (isConfirmed) {
      try {
        const response = await axios.delete(`${BASE_API_URL}LoanType.php/${id}/delete`);
        console.log(response.data);

        if (response.data.status === 1) {
          console.error("Failed to delete record.");
        } else {
          console.log("Record deleted successfully!");
          getLoanTypes();
        }
      } catch (error) {
        console.error("Error deleting record:", error);
      }
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-6 col-md-6">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>
                  <h3>{isEditMode ? "Edit" : "Add"} Loan Type</h3>
                  <label htmlFor="LoanType" className="form-label">
                    Loan Type
                  </label>
                  <textarea
                    type="text"
                    id="LoanType"
                    name="LoanType"
                    className="form-control"
                    placeholder="Loan Type"
                    value={inputs.LoanType}
                    onChange={handleChange}
                  ></textarea>
                  <div id="LoanType" className="form-text">
                    Enter loan name
                  </div>

                  <label htmlFor="Description" className="form-label">
                    Description
                  </label>
                  <textarea
                    type="text"
                    id="Description"
                    name="Description"
                    className="form-control"
                    placeholder="Description"
                    value={inputs.Description}
                    onChange={handleChange}
                  ></textarea>
                  <div id="Description" className="form-text">
                    Enter loan name Description
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="button"
                    className="btn btn-success"
                    value={isEditMode ? "Update" : "Submit"}
                    onClick={handleSubmit}
                  />
                  <input
                    type="button"
                    className="btn btn-secondary mx-5"
                    value="Cancel"
                    onClick={handleCancel}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-6 col-md-6">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Type Name</th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loanTypes.map((loan, index) => (
                <tr key={index} className="align-middle">
                  <th scope="row">{index + 1}</th>
                  <td className="pt-3 pb-3">
                    <div>Type Name: <strong>{loan.LoanType}</strong></div>
                    <div>Description: <strong>{loan.Description}</strong></div>
                  </td>
                  <td className="text-center">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => handleEdit(loan.id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger mx-2"
                      onClick={() => handleDelete(loan.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Content;
