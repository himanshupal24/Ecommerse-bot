import { Button } from "antd";
import "./chat.css";
import { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { format } from "date-fns";
import ChatItem from "../components/ChatComponentItem";
import AudioToText from "../components/VoiceButton";
import { Modal } from "react-bootstrap";

export default function ChatUI() {
  const [value, setValue] = useState("");
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "chatData"), orderBy("createdAt", "asc")),
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setChatData(data);
        chatRef.current?.scrollIntoView({ behavior: "smooth" });
      },
      (error) => {
        console.error("Error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    chatRef.current.scrollIntoView({ behavior: "smooth" });

    try {
      await addDoc(collection(db, "chatData"), {
        value: value,
        createdAt: Date.now(),
        type: "question",
      });
      setValue("");
      setLoading(true);

      const requestData = {
        query: value,
      };
      const response = await fetch("http://192.168.169.89:5000/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      await addDoc(collection(db, "chatData"), {
        value: responseData.result,
        createdAt: Date.now(),
        type: "textAnswer",
      });
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  return (
    <>
      <div className="body1">
        <div id="wrapper" className="wrapper">
          <div id="main-content">
            <div>
              <section
                className="msger shadow-md"
                style={{
                  backgroundColor: "#FAFAFC",
                  borderRadius: "1rem",
                  paddingTop: "1rem",
                  paddingLeft: "1rem",
                  paddingRight: "1.5rem",
                  paddingBottom: "0rem",
                }}
              >
                <header className="msger-header p-2">
                  <div className="d-flex justify-content-between w-100">
                    <div className="msger-header-title">
                      <div className="author-img">
                        <img
                          src="https://picsum.photos/100/100"
                          alt="Admin Image"
                        />
                      </div>
                      <div className="author-info">
                        <div className="author-title-wrap">
                          <h3 className="author-name">Profile_Name</h3>
                          <svg
                            width="20"
                            height="20"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#212121"
                            gradientcolor1="#212121"
                            gradientcolor2="#212121"
                          >
                            <path d="M12.012 2.25c.734.009 1.466.093 2.182.253a.75.75 0 0 1 .582.649l.17 1.527a1.384 1.384 0 0 0 1.928 1.116l1.4-.615a.75.75 0 0 1 .85.174 9.793 9.793 0 0 1 2.204 3.792.75.75 0 0 1-.271.826l-1.242.915a1.38 1.38 0 0 0 .001 2.226l1.242.915a.75.75 0 0 1 .272.826 9.799 9.799 0 0 1-2.204 3.792.75.75 0 0 1-.848.175l-1.406-.616a1.381 1.381 0 0 0-1.927 1.113l-.169 1.526a.75.75 0 0 1-.572.648 9.518 9.518 0 0 1-4.406 0 .75.75 0 0 1-.572-.648l-.168-1.524a1.382 1.382 0 0 0-1.925-1.11l-1.407.616a.75.75 0 0 1-.849-.175 9.798 9.798 0 0 1-2.203-3.796.75.75 0 0 1 .271-.826l1.243-.916a1.381 1.381 0 0 0 0-2.226l-1.243-.914a.75.75 0 0 1-.271-.826 9.793 9.793 0 0 1 2.204-3.792.75.75 0 0 1 .85-.174l1.4.615a1.387 1.387 0 0 0 1.93-1.118l.17-1.526a.75.75 0 0 1 .583-.649c.717-.16 1.45-.244 2.201-.253Zm0 1.5a9.137 9.137 0 0 0-1.354.117l-.109.977A2.886 2.886 0 0 1 6.525 7.17l-.898-.394a8.293 8.293 0 0 0-1.348 2.317l.798.587a2.88 2.88 0 0 1 0 4.643l-.799.588c.32.842.776 1.626 1.348 2.322l.905-.397a2.882 2.882 0 0 1 4.017 2.318l.11.984c.889.15 1.798.15 2.687 0l.11-.984a2.881 2.881 0 0 1 4.018-2.322l.905.396a8.3 8.3 0 0 0 1.347-2.318l-.798-.588a2.88 2.88 0 0 1 0-4.642l.796-.588a8.293 8.293 0 0 0-1.348-2.317l-.896.393a2.884 2.884 0 0 1-4.023-2.324l-.11-.976a8.99 8.99 0 0 0-1.333-.117ZM12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Zm0 1.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"></path>
                          </svg>
                        </div>
                        <div className="author-description">
                          <span className="active"></span> Status
                        </div>
                      </div>
                    </div>
                    <a
                      href="#"
                      onClick={handleShow}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Feedback
                    </a>
                  </div>
                </header>

                <div className="msger-chat" ref={chatRef}>
                  {chatData?.length > 0 ? (
                    <div style={{ minHeight: "50vh" }}>
                      {chatData?.map((chat) => (
                        <ChatItem data={chat} key={chat.id} />
                      ))}
                      {loading && (
                        <lord-icon
                          src="https://cdn.lordicon.com/lqxfrxad.json"
                          trigger="in"
                          style={{ width: "50px", height: "50px" }}
                        ></lord-icon>
                      )}
                    </div>
                  ) : (
                    <div
                      className="d-flex align-items-center justify-content-center flex-column"
                      style={{ height: "430px", width: "832px" }}
                    >
                      <h1>Welcome to E-commerce Bot </h1>
                      <p>
                        Your Shopping Guide: Expert Assistance, Instantly
                        Available.
                      </p>
                    </div>
                  )}
                </div>

                <div className="input-form p-0 ">
                  <div className="input-form-wrap d-flex align-items-center ">
                    <form onSubmit={handleSubmit}>
                      <div className="row col-12 ms-2 gap-2 d-flex align-items-center">
                        <div
                          className="d-flex align-items-center justify-content-between shadow-sm flex-column flex-sm-row inp col-md-11"
                          style={{
                            backgroundColor: "white",
                            borderRadius: "2rem",
                            paddingLeft: "1.5rem",
                            paddingRight: "1.5rem",
                            paddingTop: "0.6rem",
                            paddingBottom: "0.6rem",
                          }}
                        >
                          <input
                            type="text"
                            placeholder="Type Somthing"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            style={{ padding: ".5rem" }}
                          />
                          <div>
                            <button
                              className="btn btn-sm pt-sm-2 bt"
                              style={{
                                borderRadius: "1rem",
                                paddingLeft: "1rem",
                                backgroundColor: "#d7d7d7",
                                paddingRight: "1rem",
                                paddingTop: "0rem",
                                paddingBottom: "0.3rem",
                              }}
                              disabled={!value}
                              type="submit"
                            >
                              Send
                            </button>
                          </div>
                        </div>
                        <span className="input-button-wrap col">
                          <button
                            style={{
                              backgroundColor: "#ffffff",
                            }}
                            className="shadow-sm"
                          >
                            <svg
                              width="20"
                              height="20"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="#2B2C33"
                              gradientcolor1="#2B2C33"
                              gradientcolor2="#2B2C33"
                            >
                              <path d="M18.25 11a.75.75 0 0 1 .743.648l.007.102v.5a6.75 6.75 0 0 1-6.249 6.732l-.001 2.268a.75.75 0 0 1-1.493.102l-.007-.102v-2.268a6.75 6.75 0 0 1-6.246-6.496L5 12.25v-.5a.75.75 0 0 1 1.493-.102l.007.102v.5a5.25 5.25 0 0 0 5.034 5.246l.216.004h.5a5.25 5.25 0 0 0 5.246-5.034l.004-.216v-.5a.75.75 0 0 1 .75-.75ZM12 2a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Zm0 1.5A2.5 2.5 0 0 0 9.5 6v6a2.5 2.5 0 0 0 5 0V6A2.5 2.5 0 0 0 12 3.5Z"></path>
                            </svg>
                          </button>
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-floating">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
            ></textarea>
            <label htmlFor="floatingTextarea2">Your Feedback</label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
