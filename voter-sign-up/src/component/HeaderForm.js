import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function FooterForm() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                {/* Logo aligned left */}
                <a className="navbar-brand" href="https://www.vote-travis.com/">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Texas_flag_map.svg/1228px-Texas_flag_map.svg.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="Texas Flag"
                    />
                </a>

                {/* Hamburger button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar items */}
                <div className="collapse navbar-collapse justify-content-lg-end" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mx-lg-0 text-center">
                        <li className="nav-item active">
                            <a className="nav-link" href="https://www.vote-travis.com/">
                                <p className="font-weight-bold m-0">
                                    New Application
                                </p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://www.votetexas.gov/">
                                Check Your Registration
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default FooterForm;