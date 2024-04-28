import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { db } from "./firebase";
import {
  updateDoc,
  doc,
  getDoc,
  collection,
  addDoc,
  setDoc,
} from "firebase/firestore";

import "./App.css";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import { format } from "date-fns";
import ChatUI from "./pages/chatUI";

export const getFormattedDate = () => {
  const today = new Date();
  return format(today, "dd-MM-yyyy");
};

function App() {
  useEffect(() => {
    const visited = sessionStorage.getItem("cmnapgtwlFgTzs63YbZr");

    // if (!visited) {
    fetchData();
    //   sessionStorage.setItem("cmnapgtwlFgTzs63YbZr", true);
    // }
  }, []);

  const fetchData = async () => {
    const docId = getFormattedDate();
    const docRef = doc(db, "analytics", docId);

    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(doc(db, "analytics", docId), {
        viewsCount: 1,
        clickCount: 0,
      });
    } else {
      await updateDoc(docRef, { viewsCount: docSnap.data().viewsCount + 1 });
    }
  };
  return (
    <Router>
      <Routes>
        {/* Existing route for your main page */}
        <Route path="/" element={<Dashboard />} />

        {/* New route for your admin panel */}
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/chat-ai" element={<ChatUI />} />
      </Routes>
    </Router>
  );
}

export default App;
