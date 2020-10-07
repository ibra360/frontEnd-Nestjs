import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { saveUser } from "../Actions/UserActions";
import { connect } from "react-redux";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Alert,
  Card,
} from "reactstrap";

const Auth = (props) => {
  const history = useHistory();
  var [state, setState] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async () => {
    try {
      const responseData = await Axios.post(
        "http://localhost:5000/auth/login",
        state
      );
      localStorage.setItem("auth", true);
      console.log(responseData.data.result.userExist.email);
      props.saveUser(responseData.data.result.userExist);
      let user = JSON.stringify(responseData.data.result.userExist);
      localStorage.setItem("user", user);
      history.push("/add");
      //   console.log(props.history);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="mt-5">
      <Form>
        <FormGroup>
          <Label for="Title">Email</Label>
          <Input
            type="email"
            name="email"
            onChange={(e) => changeHandler(e)}
            placeholder="Enter your email"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            onChange={(e) => changeHandler(e)}
            // id="examplePassword"
            placeholder="password"
          />
        </FormGroup>
        <Button onClick={onSubmit}>Sign In</Button>
      </Form>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  USER: state.user,
});

export default connect(mapStateToProps, { saveUser })(Auth);
