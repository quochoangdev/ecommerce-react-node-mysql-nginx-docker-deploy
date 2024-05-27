import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalBrandDelete(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title as={"h2"}>Confirm Delete Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body as={"div"}>
          Woohoo, are you sure to delete this name: {props.dataModel.name}
        </Modal.Body>
        <Modal.Footer>
          <Button size="lg" variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button size="lg" variant="primary" onClick={props.handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalBrandDelete;
