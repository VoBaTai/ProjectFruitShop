import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { firestoreDb } from "./firebase-config";
import { ICustomers } from "./Customer";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import Input from "./components/Input";

const defaultCustomerValue = {
  id: "",
  uid: "",
  email: "",
  username: "",
};

const CustomerEdit = () => {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<ICustomers>(defaultCustomerValue);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleBack = (e: any) => {
    e.preventDefault();
    navigate("/admin/customer");
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSave = async () => {
    const { id: customerId, ...data } = customer;

    if (!customerId) {
      await addDoc(collection(firestoreDb, "users"), data);
    } else {
      await setDoc(doc(firestoreDb, "users", customerId), data);
    }
    navigate("/admin/customer");
  };

  useEffect(() => {
    if (id !== "0") {
      getDoc(doc(collection(firestoreDb, "users"), id)).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as ICustomers;
          data.id = snapshot.id;
          setCustomer(data);
        } else {
          setCustomer(defaultCustomerValue);
        }
      });
    }
  }, [id, navigate]);

  return (
    <>
      <div className="content-wrapper">
        <section className="content">
          <div className="content">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">
                  Customer
                  <small className="text-muted">
                    {Number(id) === 0 ? "New" : "Edit"}
                  </small>
                </h5>
              </div>
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <Input
                        label="Name"
                        id="txtName"
                        name="username"
                        onChange={handleChange}
                        value={customer.username}
                      />
                    </div>
                    <div className="col-md-6">
                      <Input
                        label="Email"
                        id="txtEmail"
                        name="email"
                        onChange={handleChange}
                        value={customer.email}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-footer text-end">
                <a
                  href="/#"
                  className="btn btn-secondary me-2"
                  onClick={(e) => handleBack(e)}
                >
                  Back
                </a>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CustomerEdit;
