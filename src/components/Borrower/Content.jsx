import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Content = () => {
  // State variables
  const [borrowers, setBorrowers] = useState([]);
  const [filteredBorrowers, setFilteredBorrowers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayCount, setDisplayCount] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Fetch data from the API on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Update filtered borrowers when borrowers or search term change
  useEffect(() => {
    filterBorrowers();
  }, [borrowers, searchTerm]);

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}Borrower.php`);
      setBorrowers(response.data);
    } catch (error) {
      console.error("Error fetching borrower records:", error.message);
    }
  };

  // Filter the borrower records based on the search term
  const filterBorrowers = () => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filtered = borrowers.filter((record) => (
      Object.values(record).some(value =>
        value.toString().toLowerCase().includes(searchTermLowerCase)
      )
    ));
    setFilteredBorrowers(filtered);
  };

  // Handle the deletion of a borrower record
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this borrower info?");

    if (isConfirmed) {
      try {
        const response = await axios.delete(`${BASE_API_URL}Borrower.php/${id}/delete`);
        console.log(response.data);

        // Update the list of borrowers after successful deletion
        if (response.data.status === 1) {
          alert("Record deleted successfully!");
          fetchData();
          navigate('/Borrower');
        } else {
          console.error("Failed to delete record.");
        }
      } catch (error) {
        console.error("Error deleting borrower:", error.message);
      }
    }
  };

  // Handle the change in the number of displayed entries
  const handleDisplayCountChange = (event) => {
    setDisplayCount(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredBorrowers.length / displayCount);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate start and end index for displayed records
  const startIndex = (currentPage - 1) * displayCount;
  const endIndex = Math.min(startIndex + displayCount, filteredBorrowers.length);

  return (
    <>
      {/* Your table and UI components */}
      <table className="table table-bordered">
        {/* Table headers */}
        <thead>
          {/* Search and display count row */}
          <tr>
            {/* Show entries dropdown */}
            <th scope="col" colSpan={6} style={{ height: '8vh' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span>Show</span>
                  <select className="mx-3 px-2 form-select" name="row" onChange={handleDisplayCountChange} value={displayCount} style={{ width: '100px' }}>
                    {[3, 5, 10, 20, 30, 50].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                  <span>entries</span>
                </div>
                {/* Search input */}
                <div style={{ display: 'flex', alignItems: 'center', width:'300px' }}>
                  <label htmlFor="Search" className="col-sm-3 col-form-label">
                    Search
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      placeholder=""
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="form-control"
                      id="Search"
                    />
                  </div>
                </div>
              </div>
            </th>
          </tr>
          {/* Table headers */}
          <tr>
            <th scope="col">#</th>
            <th scope="col">Borrower</th>
            <th scope="col">Current Loan</th>
            <th scope="col">Next Payment Schedule</th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {/* Rendered table rows */}
          {filteredBorrowers.slice(startIndex, endIndex).map((record, index) => (
            <tr key={index} className="align-middle" style={{lineHeight: '1.7'}}>
              <td>{startIndex + index + 1}</td>
              <td className="pt-4 pb-4">
                <div>Name : <strong>{record.Name}</strong></div>
                <div>Address : <strong>{record.Address}</strong></div>
                <div>Contact # : <strong>{record.Contact}</strong></div>
                <div>Email : <strong>{record.Email}</strong></div>
                <div>Tax ID : <strong>{record.TaxID}</strong></div>
              </td>
              <td>{record.CurrentLoan}</td>
              <td>{record.NextPaymentSchedule}</td>
              <td style={{ textAlign: 'right', width: '200px' }}>
                {/* Edit and Delete buttons */}
                <Link to={`${record.id}/edit`} className="btn btn-success border-0">
                  Edit
                </Link>
                <button onClick={() => handleDelete(record.id)} className="btn btn-danger mx-3 border-0">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        {/* Table footer */}
        <tfoot>
          <tr>
            {/* Pagination and entries info */}
            <th scope="col" colSpan={6} style={{ height: '8vh' }}>
              <span>
                Showing {startIndex + 1} to {endIndex} of {filteredBorrowers.length} entries
              </span>
              {/* Pagination buttons */}
              <div style={{ float: 'right', marginRight: '30px' }}>
                <div className="row">
                  <div>
                    {/* Previous button */}
                    <button type="button" className="btn mr-5 border-0" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                      Previous
                    </button>
                    {/* Page numbers */}
                    {pageNumbers.map((value) => (
                      <label key={value} className={`btn mr-5 ${value === currentPage ? 'active' : ''}`} onClick={() => handlePageChange(value)}>
                        {value}
                      </label>
                    ))}
                    {/* Next button */}
                    <button type="button" className="btn mr-5 border-0" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </th>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default Content;
