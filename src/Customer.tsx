import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firestoreDb } from "./firebase-config";

export interface ICustomers {
  id: string;
  uid: string;
  email: string;
  username: string;
}

const Customer = () => {
  const [customers, setCustomers] = useState<ICustomers[]>([]);
  const navigate = useNavigate();

  const showEditPage = (e: any, id: string) => {
    e.preventDefault();
    navigate(`/admin/customer/${id}`); // Điều hướng tới trang chỉnh sửa khách hàng
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const q = query(collection(firestoreDb, "users"), orderBy("email"));
    getDocs(q).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        const item = doc.data() as ICustomers;
        item.id = doc.id;
        return item;
      });
      setCustomers(data);
    });
  };

  const handleDelete = (e: any, id: string) => {
    e.preventDefault();
    deleteDoc(doc(firestoreDb, "users", id)).then(() => loadData());
  };

  return (
    <>
      {/* Content Wrapper */}
      <div className="content-wrapper">
        {/* Main Content */}
        <section className="content">
          <div className="content">
            <h1>Customer Management</h1>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Customer List</h3>
                  </div>
                  <div className="card-body">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Email</th>
                          <th>username</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customers.map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.email}</td>
                            <td>{item.username}</td>
                            <td>
                              <a
                                href="/#"
                                className="me-1"
                                onClick={(e) => showEditPage(e, item.id)}
                              >
                                <i className="bi-pencil-square text-primary fs-3" />
                              </a>
                              <a
                                href="/#"
                                onClick={(e) => handleDelete(e, item.id)}
                              >
                                <i className="bi-trash text-danger fs-3" />
                              </a>
                            </td>
                          </tr>
                        ))}

                        {/* Add more customers here */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Customer;
