import React from "react";
import classNames from "classnames/bind";
import styles from "./ProductItemBlock.module.scss";
import { Link } from "react-router-dom";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { MdOutlineArrowOutward } from "react-icons/md";
import { FaRegCart, FaCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { readCart, readJWT } from "../../../services/apiUserService";

const cx = classNames.bind(styles);
const ProductItemBlock = (props) => {
  const [isCheckCart, setIsCheckCart] = useState();
  // Check user
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [dataUsers, setDataUsers] = useState();
  const [cookie, setCookie] = useState();

  useEffect(() => {
    // Get localStorage
    const user = JSON.parse(localStorage.getItem("dataUsers"));
    setDataUsers(user);
    // Call api JWT
    fetchJWT();
  }, [props.product.id]);

  const fetchJWT = async () => {
    const resJWT = await readJWT();
    setCookie(resJWT?.DT?.jwt);
  };

  // Call Api
  useEffect(() => {
    !!dataUsers === true &&
      !!cookie === true &&
      fetchProducts(props.product.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUsers, cookie, props.product.id]);
  const fetchProducts = async () => {
    let productId = props.product.id;
    let data = await readCart(null, null, productId);
    if (data.EC === 0) {
      setIsCheckCart(true);
    } else {
      setIsCheckCart(null);
    }
  };

  const formatNumber = (number) => {
    return number.toLocaleString("vi-VN");
  };
  return (
    <Link to={`/${props.product.slug}`} className={cx("product-item-block")}>
      {/* <div className={cx("cart")}>
        {!!dataUsers === true && !!cookie === true ? (
          isCheckCart ? (
            <FaCart className={cx("cart-icon-fill")} />
          ) : (
            <FaRegCart className={cx("cart-icon-empty")} />
          )
        ) : (
          <></>
        )}
      </div> */}
      <div className={cx("avatar")}>
        <img
          className={cx("img")}
          src={`${props?.product?.image[0]}`}
          alt=""
        />
      </div>
      <div className={cx("content")}>
        <div className={cx("check-design")}>
          <IoShieldCheckmarkSharp className={cx("check-icon")} />
          Thiết kế bởi QuocHoangIT
        </div>
        <div className={cx("title")}>{props.product.title}</div>
        <div className={cx("information")}>
          <span className={cx("information")}>
            Số tầng {props.product.numberOfFloors}
          </span>
          <span className={cx("information", "center")}>
            Phòng ngủ {props.product.roomNumber}
          </span>
          <span className={cx("information")}>
            Diện tích {props?.product?.width * props?.product?.length} m2
          </span>
        </div>
        <div className={cx("btn-price")}>
          <button className={cx("btn")}>
            Khám Phá
            <MdOutlineArrowOutward className={cx("btn-icon")} />
          </button>
          <div className={cx("price")}>
            {formatNumber(props?.product?.price)}đ
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItemBlock;
