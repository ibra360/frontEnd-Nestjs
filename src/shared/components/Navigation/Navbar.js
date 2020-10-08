import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth-context";
import { Link, NavLink } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler } from "reactstrap";

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [verf, setVerf] = useState("");

  const auth = useContext(AuthContext);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    let v = localStorage.getItem("auth");
    setVerf(v);
  }, [localStorage.getItem("auth")]);

  const Logout = () => {
    setVerf(false);
    localStorage.setItem("auth", false);
    localStorage.removeItem("user");
  };

  // localStorage.setItem("auth", false);
  return (
    <div>
      {console.log("verf", verf)}
      <Navbar color="dark" dark expand="md">
        <Link to="/" class="navbar-brand" color="white">
          Product App
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <ul class="navbar-nav ml-auto">
            <Link to="/" exact>
              <li class="nav-link" c>
                All Products
              </li>
            </Link>

            {localStorage.getItem("auth") == "true" ? (
              <NavLink to="/add" exact>
                <li class="nav-link">Add Product</li>
              </NavLink>
            ) : null}

            {verf == "true" ? (
              <Link onClick={Logout} exact>
                <li class="nav-link">Logout</li>
              </Link>
            ) : null}

            {/* {verf == "false" ? ( */}
              <NavLink to="/auth" exact>
                <li class="nav-link">Authenticate</li>
              </NavLink>
            {/* ) : null} */}
          </ul>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Example;

// import React, { useState, useContext } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { AuthContext } from "../../context/auth-context";

// const Navbar = () => {
//   const auth = useContext(AuthContext);
//   const [isOpen, setIsOpen] = useState(false);

//   const toggle = () => setIsOpen(!isOpen);
//   return (
//     <React.Fragment>
//       <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
//         <Link to="/" class="navbar-brand" color="white">
//           CRUD APP
//         </Link>
//         <button
//           onClick={toggle}
//           class="navbar-toggler"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span class="navbar-toggler-icon" onClick={toggle}></span>
//         </button>

//         <div class="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul class="navbar-nav ml-auto">
// <NavLink to="/" exact>
//   <li class="nav-link" c>
//     All Users
//   </li>
// </NavLink>
//             {auth.isLoggedIn && (
//               <NavLink to={`/${auth.userId}/ads`}>
//                 <li class="nav-link">My Ads</li>
//               </NavLink>
//             )}

//             {auth.isLoggedIn && (
// <NavLink to="/ads/new" exact>
//   <li class="nav-link">Post Ad</li>
// </NavLink>
//             )}
//             {!auth.isLoggedIn && (
//               <NavLink to="/auth" exact>
//                 <li class="nav-link">Authenticate</li>
//               </NavLink>
//             )}
//             {auth.isLoggedIn && (
//               <NavLink to="/">
//                 <li onClick={auth.logout} class="nav-link">
//                   LOGOUT
//                 </li>
//               </NavLink>
//             )}
//           </ul>
//         </div>
//       </nav>
//     </React.Fragment>
//   );
// };

// export default Navbar;
