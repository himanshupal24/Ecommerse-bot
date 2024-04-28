import { Button } from "antd";
import "./dashboard.css";
import { useEffect, useState } from "react";
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
import ChatUI from "./chatUI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleRoute = () => {
    console.log("kkkk");
    navigate("/chat-ai");
  };
  return (
    <>
      <div className="container">
        <main className="">
          <nav className="main-menu">
            <h1>Buywon</h1>
            <img
              className="logo"
              src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/4cfdcb5a-0137-4457-8be1-6e7bd1f29ebb"
              alt=""
            />
            <ul>
              <li className="nav-item active">
                <b></b>
                <b></b>
                <a href="#">
                  <FontAwesomeIcon icon={faHome} className="nav-icon" />

                  <span className="nav-text">Home</span>
                </a>
              </li>
            </ul>
          </nav>

          <section className="content">
            <div className="left-content">
              <div className="activities">
                <h1>Best Product</h1>
                <div className="activity-container">
                  <div className="image-container img-one">
                    <img
                      src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="tennis"
                    />
                    <div
                      style={{
                        background:
                          "linear-gradient(180deg, transparent, transparent, rgb(200 248 249 / 50%))",
                      }}
                    ></div>
                  </div>

                  <div className="image-container img-two">
                    <img
                      src="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="hiking"
                    />
                    <div
                      style={{
                        background:
                          "linear-gradient(180deg, transparent, transparent, rgba(249, 238, 200, 0.5))",
                      }}
                    ></div>
                  </div>

                  <div className="image-container img-three">
                    <img
                      src="https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="running"
                    />
                    <div></div>
                  </div>

                  <div className="image-container img-four">
                    <img
                      src="https://images.unsplash.com/photo-1701680853149-1b5240a95eeb?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="cycling"
                    />
                  </div>

                  <div className="image-container img-five">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1680346528789-0ffcc13f5ebf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="yoga"
                    />
                  </div>

                  <div className="image-container img-six">
                    <img
                      src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="swimming"
                    />
                  </div>
                </div>
              </div>

              <div className="left-bottom">
                <div className="weekly-schedule">
                  <h1 className="p-0 mt-4 ms-3">Best Offers</h1>
                  <div className="card-container">
                    <div className="card">
                      <img
                        className="card-img"
                        src="https://images.unsplash.com/photo-1600247354058-a55b0f6fb720?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                <div className="personal-bests mt-3">
                  <h1>Mobile & Accessories</h1>
                  <div className="personal-bests-container d-flex">
                    <div className="image-container img-three">
                      <img
                        src="https://images.unsplash.com/photo-1670825988535-399aaf1c9113?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="running"
                      />
                    </div>
                    <div className="image-container img-three">
                      <img
                        src="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="running"
                      />
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="right-content">
              <div className="friends-activity">
                <h1>Season Offers</h1>
                <div className="card-container">
                  <div className="card">
                    <div className="card-user-info">
                      <h2 className="mt-2">Winter Ware</h2>
                    </div>
                    <img
                      className="card-img"
                      src="https://images.unsplash.com/photo-1561365452-adb940139ffa?q=80&w=2056&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                    />
                    <p>Save up to 50% with an additional 30% off!</p>
                  </div>

                  <div className="card card-two mt-3">
                    <div className="card-user-info">
                      <h2 className="mt-2">Hair Oil</h2>
                    </div>
                    <img
                      className="card-img"
                      src="https://images.unsplash.com/photo-1601612635224-ed8bce54ee4e?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                    />
                    <p>
                      Nourish your locks with our hair oil, now at an
                      irresistible 30-50% off!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="fab-wrapper">
            <input id="fabCheckbox" type="checkbox" className="fab-checkbox" />
            <label className="fab" for="fabCheckbox" onClick={handleRoute}>
              <span className="fab-dots fab-dots-1"></span>
              <span className="fab-dots fab-dots-2"></span>
              <span className="fab-dots fab-dots-3"></span>
            </label>
          </div>
        </main>
      </div>
    </>
  );
}
