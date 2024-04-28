import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons"; // Import the shopping cart icon
import { getFormattedDate } from "../App";
import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const Slider = ({ data }) => {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex >= 10) {
      setStartIndex(0);
    } else {
      setStartIndex(startIndex + 1);
    }
    console.log(startIndex);
  };

  const handlePrev = () => {
    if (startIndex <= -10) {
      setStartIndex(0);
    } else {
      setStartIndex(startIndex - 1);
    }
    console.log(startIndex);
  };
  const fetchData = async () => {
    const docId = getFormattedDate();
    const docRef = doc(db, "analytics", docId);

    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(doc(db, "analytics", docId), {
        viewsCount: 0,
        clickCount: 1,
      });
    } else {
      await updateDoc(docRef, { clickCount: docSnap.data().clickCount + 1 });
    }
  };
  return (
    <div>
      <div className="slider-container " style={{ display: "flex" }}>
        <div
          className="card shadow-sm"
          style={{ width: "7rem", backgroundColor: "white", border: "0px" }}
        >
          <img
            src={data?.image}
            //   alt={Image ${startIndex}}
            style={{ height: "100px", width: "100px", padding: "0px" }}
            className="card-img-top"
          />
          <div className="card-body" style={{ padding: "0.5rem" }}>
            <h5
              className="card-title fw-bold p-0 m-0"
              style={{ fontSize: "0.8rem" }}
            >
              <a href="#" onClick={fetchData}>
                {data?.title}
              </a>
            </h5>
            <p className="card-text fw-medium p-0 mt-1 m-0">
              {data?.selling_price}
            </p>
            <div
              style={{ textDecoration: "none", color: "orange" }}
              className=""
            >
              {[...Array(Math.round(data?.product_rating || 3))].map(() => (
                <>★</>
              ))}
            </div>
            <div>
              <FontAwesomeIcon icon={faShoppingCart} />
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handlePrev}
        className="ms-3 shadow-sm border-0 m-2 p-1"
        style={{
          backgroundColor: "white",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
        }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button
        onClick={handleNext}
        className="shadow-sm border-0 p-1"
        style={{
          backgroundColor: "white",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
        }}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Slider;
