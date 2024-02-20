// LoanDetailsTable.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function formatDecimal(Decimal) {
    const formattedDecimal = Number(Decimal).toFixed(2);
    const [integerPart, decimalPart] = formattedDecimal.split('.');
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return `${formattedIntegerPart}.${decimalPart}`;
  }
  function formatDate(dateString) {
    // weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  }
  
const Content = () => {
  // State variables
  const [loanDetails, setLoanDetails] = useState([]);
  const [filteredLoanDetails, setFilteredLoanDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayCount, setDisplayCount] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Fetch data from the API on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Update filtered loan details when loan details or search term change
  useEffect(() => {
    filterLoanDetails();
  }, [loanDetails, searchTerm]);
  // Fetch data from the API
  const fetchData = async () => {
    try {
    const response = await axios.get(`${BASE_API_URL}loandetails.php`);
      setLoanDetails(response.data);
      console.log("response data : ", response.data);
    } catch (error) {
      console.error("Error fetching loan details records:", error.message);
    }
  };

  // Filter the loan details records based on the search term
//   const filterLoanDetails = () => {
//     const searchTermLowerCase = searchTerm.toLowerCase();
//     const filtered = loanDetails.filter((record) =>
//       Object.values(record).some((value) =>
//         value.toString().toLowerCase().includes(searchTermLowerCase)
//       )
//     );
//     setFilteredLoanDetails(filtered);
//   };
const filterLoanDetails = () => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filtered = loanDetails.map((record) => ({
      ...record,
      loanStatus: record.DateReleased && new Date(record.DateReleased) <= new Date() ? 'Released' : 'Pending',
    })).filter((record) =>
      Object.values(record).some((value) =>
        value.toString().toLowerCase().includes(searchTermLowerCase)
      )
    );
    setFilteredLoanDetails(filtered);
  };
  
  // Handle the deletion of a loan details record
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this loan details info?");

    if (isConfirmed) {
      try {
        const response = await axios.delete(`${BASE_API_URL}loandetails.php/${id}/delete`);
        console.log(response.data);

        // Update the list of loan details after successful deletion
        if (response.data.status === 1) {
        //   alert("Record deleted successfully!");
          fetchData();
          navigate('/LoanDetails');
          window.location.reload();
        } else {
          console.error("Failed to delete record.");
        }
      } catch (error) {
        console.error("Error deleting loan details:", error.message);
      }
    }
  };

  // Handle the change in the number of displayed entries
  const handleDisplayCountChange = (event) => {
    setDisplayCount(parseInt(event.target.value));
    setCurrentPage(1);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredLoanDetails.length / displayCount);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate start and end index for displayed records
  const startIndex = (currentPage - 1) * displayCount;
  const endIndex = Math.min(startIndex + displayCount, filteredLoanDetails.length);

  return (
    <>
      {/* Your table and UI components */}
      <table className="table table-bordered fs-6">
        {/* Table headers */}
        <thead>
          {/* Search and display count row */}
          <tr>
            {/* Show entries dropdown */}
            <th scope="col" colSpan={6} style={{ height: '8vh' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span>Show</span>
                  <select
                    className="mx-3 px-2 form-select"
                    name="row"
                    onChange={handleDisplayCountChange}
                    value={displayCount}
                    style={{ width: '100px' }}
                  >
                    {[2, 3, 5, 10, 20, 30, 50].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                  <span>entries</span>
                </div>
                {/* Search input */}
                <div style={{ display: 'flex', alignItems: 'center', width: '300px' }}>
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
            <th scope="col">Loan Details</th>
            <th scope="col">Next Payment Details</th>
            <th scope="col" className="text-center">Status</th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {/* Rendered table rows */}
          {filteredLoanDetails.slice(startIndex, endIndex).map((record, index) => (
            <tr key={index} className="align-middle" style={{ lineHeight: '1.7' }}>
              <td>{startIndex + index + 1}</td>
              <td>
                <div>Name : <strong>{record.Name}</strong></div>
                <div>Contact # : <strong>{record.Contact}</strong></div>
                <div>Address : <strong>{record.Address}</strong></div>
              </td>
              <td className="pt-4 pb-4">
                <div>Reference : <strong>{record.Reference}</strong></div>
                <div>LoanType : <strong>{record.LoanType}</strong></div>
                <div>
                    PlanDuration : <strong>{record.PlanDuration} month's [{record.InterestRate % 1 === 0 ? Math.floor(record.InterestRate) : record.InterestRate}%, {record.Installments}]</strong>
                    </div>
                <div>Amount : <strong>{record.Amount % 1 === 0 ? Math.floor(record.Amount) : record.Amount}</strong></div>
                <div>
                    Total Payable Amount : <strong>{formatDecimal(record.TotalPayableAmount)}</strong>
                </div>
                <div>
                Monthly Payable Amount : <strong>{formatDecimal(record.MonthlyPayableAmount)}</strong>
                </div>

                <div>Overdue Payable Amount : <strong>{record.OverduePayableAmount}</strong></div>
                <div>
                    DateReleased : <strong>{formatDate(record.DateReleased)}</strong>
                </div>
              </td>
              <td>
                <div>Date : <strong>{formatDate(record.LoanDate)}</strong></div>
                <div>Monthly Amount : <strong>{formatDecimal(record.MonthlyAmount)}</strong></div>
                <div>Penalty : <strong>{record.Penalty % 1 === 0 ? Math.floor(record.Penalty) : record.Penalty}</strong></div>
                <div>Payable Amount : <strong>{record.PayableAmount}</strong></div>
              </td>
              <td className="text-center px-5">
                <div
                    className={`rounded fs-6 ${
                    record.loanStatus === 'Released'
                        ? 'bg-primary text-white'
                        : record.loanStatus === 'Pending'
                        ? 'bg-warning'
                        : 'text-white'
                    }`}
                >
                    {record.loanStatus}
                </div>
                </td>

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
                Showing {startIndex + 1} to {endIndex} of {filteredLoanDetails.length} entries
              </span>
              {/* Pagination buttons */}
              <div style={{ float: 'right', marginRight: '30px' }}>
                <div className="row">
                  <div>
                    {/* Previous button */}
                    <button
                      type="button"
                      className="btn mr-5 border-0"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    {/* Page numbers */}
                    {pageNumbers.map((value) => (
                      <label
                        key={value}
                        className={`btn mr-5 ${value === currentPage ? 'active' : ''}`}
                        onClick={() => handlePageChange(value)}
                      >
                        {value}
                      </label>
                    ))}
                    {/* Next button */}
                    <button
                      type="button"
                      className="btn mr-5 border-0"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
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
