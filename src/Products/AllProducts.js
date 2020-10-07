import Axios from "axios";
import React, { useState, useEffect } from "react";
// import { Card, Button, CardTitle, CardText, Row, Col, Badge } from "reactstrap";
import Avatar from "../shared/components/UIElements/Avatar";
import Card from "../shared/components/UIElements/Card";
import "./UserItem.css";
import "./UsersList.css";


const AllProducts = () => {
  const [loadedUsers, setLoadedUsers] = useState([]);
  const fetchProducts = async () => {
    try {
      const responseData = await Axios.get("http://localhost:5000/product");
      setLoadedUsers(responseData.data);
      // const result = responseData;
    } catch (err) {}
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  console.log("users", loadedUsers);

  return (
    <li className="user-list">
      {loadedUsers.map((ans) => {
        return(
        <Card className="user-item__content center">
          {/* <Link to={`/${ans.id}/ads`}> */}
          <div className="user-item__image">
            <Avatar
              image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
              alt={ans.title}
            />
          </div>
          <div className="user-item__info">
            <h2>{ans.title}</h2>
            <h4>{ans.price} Rupees</h4>
          </div>
          {/* </Link> */}
        </Card>
      )})}
    </li>
  );
};

export default AllProducts;
