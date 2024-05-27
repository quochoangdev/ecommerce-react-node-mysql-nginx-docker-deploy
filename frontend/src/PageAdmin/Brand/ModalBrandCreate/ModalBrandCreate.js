import classNames from "classnames/bind";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { toast } from "react-toastify";
import { MdErrorOutline } from "react-icons/md";
import { createBrand } from "../../../services/apiAdminService";

import styles from "./ModalBrandCreate.module.scss";

const cx = classNames.bind(styles);

const ModalBrandCreate = (props) => {
  const [data, setData] = useState({
    name: "",
  });

  const validInputDefault = {
    name: true,
  };
  const [validInputs, setValidInputs] = useState(validInputDefault);

  const isCheckInputs = () => {
    if (!data.name) {
      toast("Please Enter Name");
      return false;
    }
    return true;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleOnFocus = () => {
    setValidInputs(validInputDefault);
  };

  // Valid Input
  const checkValidateInputs = () => {
    setValidInputs(validInputDefault);
    let arr = ["name"];
    let check = true;
    // eslint-disable-next-line array-callback-return
    arr.map((item, index) => {
      if (!data[item] && check) {
        setValidInputs((prev) => {
          return {
            ...prev,
            [item]: false,
          };
        });
        check = false;
        return false;
      }
    });
    return true;
  };

  // Confirm
  const handleConfirmRole = async () => {
    let isCheckBorder = checkValidateInputs();
    let isCheckTextEmpty = isCheckInputs();
    if (isCheckBorder && isCheckTextEmpty) {
      let response = await createBrand(data);
      if (response && response.EC === 1) {
        let dataValid = response.DT;
        setValidInputs((prev) => {
          return {
            ...prev,
            [dataValid]: false,
          };
        });
      }
      if (response && response.EC === 0) {
        toast.success(response.EM);
        props.handleClose();
        props.fetchBrand();
        setData((prev) => {
          return {
            ...prev,
            name: "",
          };
        });
      } else {
        toast.error(response.EM);
      }
    }
  };
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        fullscreen={"xxl-down"}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className={cx("title")}>Create New Role</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={cx("form-wrapper")}>
            {/* name */}
            <div className={cx("bl-one-input")}>
              <label>
                name (<span className={cx("valid-start")}>*</span>)
              </label>
              <div className={cx("bl-icon")}>
                <input
                  className={cx(validInputs.name ? "" : `is-valid`)}
                  type="text"
                  name="name"
                  onChange={handleOnChange}
                  onFocus={handleOnFocus}
                />
                {!validInputs.name && <MdErrorOutline className={cx("icon")} />}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className={cx("btn", "secondary")} onClick={props.handleClose}>
            Close
          </button>
          <button className={cx("btn", "primary")} onClick={() => handleConfirmRole()}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalBrandCreate;