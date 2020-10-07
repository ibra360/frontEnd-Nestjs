import Axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";


import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Card,
} from "reactstrap";

const Example = (props) => {
    const history = useHistory();
  //   const responseData = await Axios.post("http://localhost:5000/product");

  var [state, setState] = useState({
    title: "",
    description: "",
    price: "",
  });
  //   var [desc, setDesc] = useState();
  //   var [price, setPrice] = useState();

  const onSubmit = async () => {
    try {
      const responseData = await Axios.post(
        "http://localhost:5000/product",
        state
      );
      console.log("USer from redux",props.USER)
      history.push('/')
    } catch (err) {
      console.log(err);
    }
  };

  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Card className="mt-5">
      <Form>
        <FormGroup>
          <Label for="Title">Title</Label>
          <Input
            type="text"
            name="title"
            onChange={(e) => changeHandler(e)}
            placeholder="Enter your product Title"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Description</Label>
          <Input
            type="text"
            name="description"
            onChange={(e) => changeHandler(e)}
            // id="examplePassword"
            placeholder="Product descripton"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Price</Label>
          <Input
            type="number"
            name="price"
            onChange={(e) => changeHandler(e)}
            // id="examplePassword"
            placeholder="Product price"
          />
        </FormGroup>

        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  USER: state.user,
});

export default connect(mapStateToProps, { })(Example);
