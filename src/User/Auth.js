import Axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { saveUser } from "../Actions/UserActions";
import { connect } from "react-redux";
// import ImageUpload from "../Image/ImageUpload";

import FacebookLogin from "react-facebook-login";
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
    image:""
  });

  const responseFacebook = (res) => {
    console.log(res);
  };

  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async () => {
    try {
      const responseData = await Axios.post(
        "http://localhost:5000/auth/signup",
        state
      );
      console.log(responseData);
      console.log("User Created Successfully");
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="mt-5">
      <Form>
        <FormGroup>
          <Label for="Title">Title</Label>
          <Input
            type="email"
            name="email"
            onChange={(e) => changeHandler(e)}
            placeholder="Enter your email"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Description</Label>
          <Input
            type="password"
            name="password"
            onChange={(e) => changeHandler(e)}
            // id="examplePassword"
            placeholder="password"
          />
        </FormGroup>

        <br />
        <div className="mb-1">
          Image <span className="font-css top">*</span>
          <div className="">
            <input
              onChange={(e) => changeHandler(e)}
              type="file"
              id="file-input"
              name="image"
            />
          </div>
        </div>
        <Button color="info" onClick={onSubmit}>
          Signup
        </Button>
        <br />
        <br />
        <FacebookLogin
          className="btn btn-secondary m-3 d-inline"
          appId="13031837532295651"
          autoLoad={false}
          fields="name,email"
          // onClick={componentClicked}
          callback={responseFacebook}
          cssClass="my-facebook-button-class btn btn-primary"
          icon="fa-facebook-square"
        />
        <br />
        <br />

        <Alert className="center">
          Alreay a user? <Link to="/Login">Sign In</Link>Instead
        </Alert>
      </Form>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  USER: state.user,
});

export default connect(mapStateToProps, { saveUser })(Auth);
