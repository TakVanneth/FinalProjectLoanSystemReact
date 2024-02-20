import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentList = () => {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayCount, setDisplayCount] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [data, searchTerm]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}Payment.php`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching Payment records:", error.message);
    }
  };

  const filterData = () => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filtered = data.filter((record) =>
      Object.values(record).some((value) =>
        value.toString().toLowerCase().includes(searchTermLowerCase)
      )
    );
    setFilteredData(filtered);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this payment record?"
    );

    if (isConfirmed) {
      try {
        await axios.delete(`${BASE_API_URL}Payment.php/${id}/delete`);
        alert("Record deleted successfully!");
        fetchData();
        navigate("/Payment");
      } catch (error) {
        console.error("Error deleting payment record:", error.message);
      }
    }
  };

  const handleDisplayCountChange = (event) => {
    setDisplayCount(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / displayCount);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * displayCount;
  const endIndex = Math.min(startIndex + displayCount, filteredData.length);

  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col" colSpan={6} style={{ height: "8vh" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span>Show</span>
                  <select
                    className="mx-3 px-2 form-select"
                    name="row"
                    onChange={handleDisplayCountChange}
                    value={displayCount}
                    style={{ width: "100px" }}
                  >
                    {[5, 10, 20, 30, 50].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                  <span>entries</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", width: "300px" }}>
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
          <tr>
            <th scope="col">#</th>
            <th scope="col">Loan Reference No: </th>
            <th scope="col">Payee</th>
            <th scope="col">Amount</th>
            <th scope="col">Penalty</th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.slice(startIndex, endIndex).map((record, index) => (
            <tr key={index} className="align-middle" style={{ lineHeight: "1.7" }}>
              <td>{startIndex + index + 1}</td>
              <td className="pt-4 pb-4">
              {record.LoanReferenceNo}
              </td>
              <td>{record.Payee}</td>
              <td>{record.Amount}</td>
              <td>{record.Penalty}</td>
              <td style={{ textAlign: "right", width: "200px" }}>
                <Link to={`${record.PaymentID}/edit`} className="btn btn-success border-0">
                  Edit
                </Link>
                <button onClick={() => handleDelete(record.PaymentID)} className="btn btn-danger mx-3 border-0">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="col" colSpan={6} style={{ height: "8vh" }}>
              <span>
                Showing {startIndex + 1} to {endIndex} of {filteredData.length} entries
              </span>
              <div style={{ float: "right", marginRight: "30px" }}>
                <div className="row">
                  <div>
                    <button
                      type="button"
                      className="btn mr-5 border-0"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    {pageNumbers.map((value) => (
                      <label
                        key={value}
                        className={`btn mr-5 ${value === currentPage ? "active" : ""}`}
                        onClick={() => handlePageChange(value)}
                      >
                        {value}
                      </label>
                    ))}
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

export default PaymentList;
