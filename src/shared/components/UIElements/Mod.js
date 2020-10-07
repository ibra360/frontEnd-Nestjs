import React, { useState, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useHttpClient } from "../../hooks/http-hook";
// import LoadingSpiner from "../../components/UIElements/LoadingSpinner";
import { AuthContext } from "../../context/auth-context";

const Mod = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const confirmDeleteHandler = async () => {
    setModal(false);
    try {
      sendRequest(
        `http://localhost:5000/api/ads/${props.iid}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      props.del(props.iid);
      {
        console.log("Deleted");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <React.Fragment>
      <Button color="danger" onClick={toggle}>
        Deletee
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} charCode="x">
          Delete Ad
        </ModalHeader>
        <ModalBody>
          Are you sure you want to delete this Ad permanently?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={confirmDeleteHandler}>
            Deleteeeee
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default Mod;
