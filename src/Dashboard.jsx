import React, { useState } from 'react'
import App from './components/layouts/App';
import Menu from './components/global/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUsers } from '@fortawesome/free-solid-svg-icons';
function Dashboard() {
  const isNoUser = !localStorage.getItem("user");
  if (isNoUser) {
    window.location.href = "/";
    return null;
  }
  return (
    <App>
      <Menu>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-1">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Dashboard</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                Share
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                Export
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

        <div className="container mt-4">
        <div className="row">
          <div className="col-lg-3 col-sm-6">
              <div className="card gradient-1">
                  <div className="card-body">
                      <h4 className="card-title text-white">Payment Tooday</h4>
                      <div className="d-inline-block">
                          <h5 className="text-white">4565</h5>
                          <hr />
                          <p className="text-white mb-0">Payment Tooday </p>
                      </div>
                      <span className="float-right display-5 opacity-5"><FontAwesomeIcon icon={faCalendar} /></span>
                  </div>
              </div>
          </div>
          <div className="col-lg-3 col-sm-6">
              <div className="card gradient-2">
                  <div className="card-body">
                      <h4 className="card-title text-white">Borrowers</h4>
                      <div className="d-inline-block">
                          <h5 className="text-white">8541</h5>
                          <hr />
                          <p className="text-white mb-0">Jan - March 2019</p>
                      </div>
                      <span className="float-right display-5 opacity-5">
                      <i className="fa fa-users"></i>
                      </span>
                  </div>
              </div>
          </div>
          <div className="col-lg-3 col-sm-6">
              <div className="card gradient-3">
                  <div className="card-body">
                      <h4 className="card-title text-white">New Customers</h4>
                      <div className="d-inline-block">
                          <h5 className="text-white">4565</h5>
                          <hr />
                          <p className="text-white mb-0">Jan - March 2019</p>
                      </div>
                      <span className="float-right display-5 opacity-5"><i className="fa fa-users"></i></span>
                  </div>
              </div>
          </div>
          <div className="col-lg-3 col-sm-6">
              <div className="card gradient-4">
                  <div className="card-body">
                      <h4 className="card-title text-white">New Customers</h4>
                      <div className="d-inline-block">
                          <h5 className="text-white">99999</h5>
                          <hr />
                          <p className="text-white mb-0">Jan - March 2019</p>
                      </div>
                      <span className="float-right display-5 opacity-5"><i className="fa fa-users"></i></span>
                  </div>
              </div>
          </div>
      </div>
      </div>

        <h2>Section title</h2>
        <div className="table-responsive">
          <table className="table table-striped table-lg caption-top">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Header</th>
                <th scope="col">Header</th>
                <th scope="col">Header</th>
                <th scope="col">Header</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1,001</td>
                <td>random</td>
                <td>data</td>
                <td>placeholder</td>
                <td>text</td>
              </tr>
              <tr>
                <td>1,002</td>
                <td>placeholder</td>
                <td>irrelevant</td>
                <td>visual</td>
                <td>layout</td>
              </tr>
              <tr>
                <td>1,003</td>
                <td>data</td>
                <td>rich</td>
                <td>dashboard</td>
                <td>tabular</td>
              </tr>
              <tr>
                <td>1,003</td>
                <td>information</td>
                <td>placeholder</td>
                <td>illustrative</td>
                <td>data</td>
              </tr>
              <tr>
                <td>1,004</td>
                <td>text</td>
                <td>random</td>
                <td>layout</td>
                <td>dashboard</td>
              </tr>
              <tr>
                <td>1,005</td>
                <td>dashboard</td>
                <td>irrelevant</td>
                <td>text</td>
                <td>placeholder</td>
              </tr>
              <tr>
                <td>1,006</td>
                <td>dashboard</td>
                <td>illustrative</td>
                <td>rich</td>
                <td>data</td>
              </tr>
              <tr>
                <td>1,007</td>
                <td>placeholder</td>
                <td>tabular</td>
                <td>information</td>
                <td>irrelevant</td>
              </tr>
              <tr>
                <td>1,008</td>
                <td>random</td>
                <td>data</td>
                <td>placeholder</td>
                <td>text</td>
              </tr>
              <tr>
                <td>1,009</td>
                <td>placeholder</td>
                <td>irrelevant</td>
                <td>visual</td>
                <td>layout</td>
              </tr>
              <tr>
                <td>1,010</td>
                <td>data</td>
                <td>rich</td>
                <td>dashboard</td>
                <td>tabular</td>
              </tr>
              <tr>
                <td>1,011</td>
                <td>information</td>
                <td>placeholder</td>
                <td>illustrative</td>
                <td>data</td>
              </tr>
              <tr>
                <td>1,012</td>
                <td>text</td>
                <td>placeholder</td>
                <td>layout</td>
                <td>dashboard</td>
              </tr>
              <tr>
                <td>1,013</td>
                <td>dashboard</td>
                <td>irrelevant</td>
                <td>text</td>
                <td>visual</td>
              </tr>
              <tr>
                <td>1,014</td>
                <td>dashboard</td>
                <td>illustrative</td>
                <td>rich</td>
                <td>data</td>
              </tr>
              <tr>
                <td>1,015</td>
                <td>random</td>
                <td>tabular</td>
                <td>information</td>
                <td>text</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      </Menu>
    </App>
  )
}

export default Dashboard;
