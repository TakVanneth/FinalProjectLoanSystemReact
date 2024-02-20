import App from "../layouts/App";
import Menu from "../global/Menu";
import Content from "./Content";

const LoanType = () => {
    const isNoUser = !localStorage.getItem("user");
    if (isNoUser) {
      window.location.href = "/";
      return null;
    }
    return(
        <>
            <App>
                <Menu>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-1">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-4 pb-3 border-bottom">
                            <h1 className="h2">Loan Type List</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group me-2">
                                <a href="/user"
                                    type="button"
                                    className="btn btn-sm btn-outline-secondary"
                                >
                                    Back
                                </a>
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
                        <Content/>
                    </main>
                </Menu>
            </App>
        </>
    );
}
export default LoanType;