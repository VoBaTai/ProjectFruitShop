import React, { useState } from "react";
import { auth, firestoreDb } from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

interface SignUpProps {
  onClose: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(firestoreDb, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        username: username,
      });

      alert("Đăng ký thành công!");
      onClose(); // Đóng modal sau khi đăng ký thành công
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="form-container">
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="modal-footer">
        <button className="btn btn-primary" onClick={handleSignUp}>
          Sign Up
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SignUp;
