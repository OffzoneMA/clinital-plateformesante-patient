import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Log } from "../../App";
import './Navbar.scss'

function Navbar() {
  const [subMenu, setSubMenu] = useState(false);
  const user = useContext(Log);
  const logOut = () => {
    localStorage.removeItem("user");
    window.location = "/login";
    // window.location.reload();
  };
  return (
    <div className="navbar">
      <nav>
        <Link to="/">
          <img
            src="../../icons/logo-white.svg"
            alt="clinital logo"
            height="32px"
          />
        </Link>
        <ul>
          {user?.length===0 ? (
            <>
              <button className="large-btn">
                Vous êtes professionnel de santé ?
              </button>
            </>
          ) : (
            <>
              <Link to="/agenda">
                <button>
                  <img
                    src="../../icons/calendar-outline.svg"
                    alt="calendar"
                    height="18px"
                  />
                </button>
              </Link>
              <Link to="/document">
                <button>
                  <img
                    src="../../icons/documents-outline.svg"
                    alt="documents"
                    height="18px"
                  />
                </button>
              </Link>
              <button>
                <img
                  src="../../icons/notifications-outline.svg"
                  alt="notifications"
                  height="18px"
                />
              </button>
            </>
          )}
          <button>
            <img
              src="../../icons/help-circle-outline.svg"
              alt="help"
              height="18px"
            />
          </button>

          <Link
            to="/login"
            onClick={(e) => {
              if (user.length>0) {
                e.preventDefault();
              }
            }}
          >
            <div className="user" onClick={() => user.length>0 && setSubMenu((x) => !x)}>
              <img
                src="../../icons/person-circle-outline.svg"
                alt="user"
                height="26px"
              />
              <h4>
                {user.length>0 ? (
                  <>
                    {user.email}
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 8 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L4 4L7 1"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                ) : (
                  "Se connecter"
                )}
              </h4>
            </div>
          </Link>
          <div className={`sub-menu ${subMenu ? "" : "closed"}`}>
            <Link to="/monCompte">
              <div className="item">
                <div className="item-img">
                  <img src="../icons/profil.svg" alt="" />
                </div>
                <div className="moncompte">
                  Mon compte
                </div>
              </div>
            </Link>
            <hr />
            <div className="item disconnect" onClick={logOut}>
              <div className="item-img">
                <img src="../../icons/discon.svg" alt="" />
              </div>
              <h4>Se deconnecter</h4>
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
