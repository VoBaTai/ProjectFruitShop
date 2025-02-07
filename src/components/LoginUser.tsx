import React, { useState } from "react";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

interface LoginUserProps {
  onClose: () => void;
}

const LoginUser: React.FC<LoginUserProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    try {
      // Đăng nhập với Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Lưu UID vào localStorage
      if (user && user.uid) {
        localStorage.setItem("userUid", user.uid); // Lưu UID vào localStorage
      }

      alert(`Đăng nhập thành công: ${user.email}`);
      onClose(); // Đóng modal sau khi đăng nhập thành công
    } catch (error: any) {
      console.error("Error logging in:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="form-container">
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
        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginUser;
