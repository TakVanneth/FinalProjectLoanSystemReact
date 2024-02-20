import React from "react";
import './App.css';
import Dashboard from "./Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./login";
import List from "./components/Home/List";
import Loan from "./components/Loan";
import EditUser from "./components/Home/EditUser";
import Payment from "./components/Payment";
import Borrower from "./components/Borrower";
import LoanType from "./components/LoanType";
import Add from "./components/Payment/add";
import EditPayment from "./components/Payment/EditPayment";
import AddBorrower from "./components/Borrower/Add";
import EditBorrower from "./components/Borrower/Edit";
import AddLoan from "./components/Loan/Add";
import EditLoan from "./components/Loan/Edit";
function App() {
    const userAccess = localStorage.getItem('access');
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                {userAccess === 'Manager' && (
                <React.Fragment>
                    <Route path="/user" element={<List/>} />
                </React.Fragment>
                )}
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Loandetails" element={<Loan />} />
                <Route path="/Loandetails/add" element={<AddLoan/>} />
                <Route path="/Loandetails/:id/edit" element={<EditLoan/>} />
                <Route path="/user/add" element={<Home/>} />
                <Route path="/user/:id/edit" element={<EditUser />} />
                {/* <Route path="/user" element={<List/>} /> */}
                <Route path="/Payment" element={<Payment/>} />
                <Route path="/Payment/:id/edit" element={<EditPayment />} />
                <Route path="/Payment/add" element={<Add/>} />
                <Route path="/Borrower" element={<Borrower/>} />
                <Route path="/Borrower/add" element={<AddBorrower/>} />
                <Route path="/Borrower/:id/edit" element={<EditBorrower/>} />
                <Route path="/Loantype" element={<LoanType/>} />
                <Route path="/Loantype/:id/edit" element={<LoanType />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
