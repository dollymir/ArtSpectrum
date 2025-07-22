import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  async function handleLogout() {
    await axios.post('http://localhost:8000/logout').then((response) => {
      window.location.reload(false);
    })
  }
  return (
    <>
      <div>
        {/* partial:partials/_sidebar.html */}
        <nav className="sidebar sidebar-offcanvas " id="sidebar">
          <ul className="nav" style={{ position: "fixed", zIndex: "1" }}>
            <li className="nav-item nav-profile border-bottom">
              <a href="/#" className="nav-link flex-column">
                <div className="nav-profile-image">
                  <img src="/images/faces/face27.jpg" alt="profile" />
                  {/*change to offline or busy as needed*/}
                </div>
                <div className="nav-profile-text d-flex ml-0 mb-3 flex-column">
                  <span className="font-weight-semibold mb-1 mt-2 text-center">
                    Admin
                  </span>
                </div>
              </a>
            </li>
            <li className="pt-2 pb-1">
              <span className="nav-item-head">Dashboard</span>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="mdi mdi-home menu-icon" />
                <span className="menu-title">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/artist.html">
                <i className="mdi mdi-contacts menu-icon" />
                <span className="menu-title">Artist</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user.html">
                <i className="mdi mdi-account-multiple menu-icon" />
                <span className="menu-title">Users</span>
              </Link>

            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="collapse"
                href="#ui-basic1"
                aria-expanded="false"
                aria-controls="ui-basic"
              >
                <i className="mdi mdi-calendar-multiple-check menu-icon" />
                <span className="menu-title">Event</span>
                <i className="menu-arrow" />
              </a>
              <div className="collapse" id="ui-basic1">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <Link className="nav-link" to="/upcomingevent.html">
                      Upcoming Event
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/oldevent.html">
                      Old Event
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            {/* <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="collapse"
                href="#ui-basic"
                aria-expanded="false"
                aria-controls="ui-basic"
              >
                <i className="mdi mdi-library-music menu-icon" />
                <span className="menu-title">Booking</span>
                <i className="menu-arrow" />
              </a>
              <div className="collapse" id="ui-basic">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <Link className="nav-link" to="/oldbokking.html">
                      Old Booking
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/newbooking.html">
                      New Booking
                    </Link>
                  </li>
                </ul>
              </div>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/newbooking.html">
                <i className="mdi mdi-library-music menu-icon" />
                <span className="menu-title">Booking</span>
              </Link>
            </li><li className="nav-item">
              <Link className="nav-link" to="/payment.html">
                <i className="mdi mdi-currency-inr menu-icon" />
                <span className="menu-title">Payment</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/complain.html">
                <i className="mdi mdi-tooltip-edit menu-icon" />
                <span className="menu-title">Complain</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/feedback.html">
                <i className="mdi mdi-clipboard-text menu-icon" />
                <span className="menu-title">Feedback</span>
              </Link>
            </li>
            <li className="nav-item" onClick={handleLogout}>
              <a className="nav-link" href="/">
                <i className="mdi mdi-login menu-icon" />
                <span className="menu-title">Logout</span>
              </a>
            </li>
          </ul>
        </nav>
        {/* partial */}
        <div className="container-fluid page-body-wrapper">
          {/* partial:partials/_settings-panel.html */}
          <div id="settings-trigger">
            <i className="mdi mdi-settings" />
          </div>
          <div id="theme-settings" className="settings-panel">
            <i className="settings-close mdi mdi-close" />
            <p className="settings-heading">SIDEBAR SKINS</p>
            <div
              className="sidebar-bg-options selected"
              id="sidebar-default-theme"
            >
              <div className="img-ss rounded-circle bg-light border mr-3" />
              Default
            </div>
            <div className="sidebar-bg-options" id="sidebar-dark-theme">
              <div className="img-ss rounded-circle bg-dark border mr-3" />
              Dark
            </div>
            <p className="settings-heading mt-2">HEADER SKINS</p>
            <div className="color-tiles mx-0 px-4">
              <div className="tiles default primary" />
              <div className="tiles success" />
              <div className="tiles warning" />
              <div className="tiles danger" />
              <div className="tiles info" />
              <div className="tiles dark" />
              <div className="tiles light" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
