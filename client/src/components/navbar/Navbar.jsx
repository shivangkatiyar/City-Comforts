import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">city-comforts</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          {/* <span>Fiverr Business</span> */}
          {/* <span>About Us</span>
          <span>Categories</span>
          {!currentUser?.isSeller && <span>Become a Provider</span>} */}
          {currentUser && currentUser.isAdmin ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  
                  <Link className="link" to="/admin/newcat">
                    Add Category
                  </Link>
                  <Link className="link" to="/messages">
                    Unverified Providers
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : currentUser? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/myexp">
                        Expertise
                      </Link>
                      {currentUser.isVerified ? <Link className="link" to="/add">
                        Add New Expertise
                      </Link> : 'User being verified'}
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">Sign in</Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(!currentUser?.isAdmin) && (active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to={currentUser ? "/gigs?cat=electrician" : "/"}>
              Electrician
            </Link>
            <Link className="link menuLink" to={currentUser ? "/gigs?cat=photography" : "/"}>
              Videographer & Photographer
            </Link>
            <Link className="link menuLink" to={currentUser ? "/gigs?cat=plumber" : "/"}>
              Plumber
            </Link>
            <Link className="link menuLink" to={currentUser ? "/gigs?cat=carpenter" : "/"}>
              Carpenter
            </Link>
            <Link className="link menuLink" to={currentUser ? "/gigs?cat=mechanic" : "/"}>
              Mechanic
            </Link>
            <Link className="link menuLink" to={currentUser ? '/gigs?cat=electronics' : "/"}>
              Computer Repair
            </Link>
            <Link className="link menuLink" to={currentUser ? "/gigs?cat=electrician" : "/"}>
              AC Repair
            </Link>
            <Link className="link menuLink" to={currentUser ? "/gigs?cat=painter" : "/"}>
              House Painter
            </Link>
            <Link className="link menuLink" to={currentUser ? "/gigs?cat=builder" : "/"}>
              House Builder
            </Link>
            <Link className="link menuLink" to={currentUser ? "/gigs?cat=architect" : "/"}>
              Architect
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
