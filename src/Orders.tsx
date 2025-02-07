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

export interface IOrders {
  id: string;
  orderDate: string;
  status: string;
  totalAmount: string;
  userId: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<IOrders[]>([]);
  const navigate = useNavigate();

  const showEditPage = (e: any, id: string) => {
    e.preventDefault();
    navigate(`/admin/order/${id}`); // Điều hướng tới trang chỉnh sửa sản phẩm
  };

  const showOrderDetail = (id: string) => {
    navigate(`/admin/orderDetail/${id}`); // Điều hướng tới trang chi tiết đơn hàng
  };

  useEffect(() => {
    loadData();
  }, []);
  const loadData = () => {
    const q = query(collection(firestoreDb, "ordersshop"), orderBy("userId"));
    getDocs(q).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        const item = doc.data() as IOrders;
        item.id = doc.id;
        return item;
      });
      setOrders(data);
    });
  };
  const handleDelete = (e: any, id: string) => {
    e.preventDefault();
    deleteDoc(doc(firestoreDb, "ordersshop", id)).then(() => loadData());
  };

  return (
    <div className="content-wrapper">
      {/* Main Content */}
      <section className="content">
        <div className="content">
          <h1>Orders</h1>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Order List</h3>
                </div>
                <div className="card-body">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>UserId</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.userId}</td>
                          <td>{item.totalAmount}</td>
                          <td>{item.status}</td>
                          <td>
                            <div className="d-flex justify-content-start align-items-center gap-2">
                              <a
                                href="/#"
                                onClick={(e) => handleDelete(e, item.id)}
                              >
                                <i className="bi-trash text-danger fs-4" />
                              </a>
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => showOrderDetail(item.id)} // Điều hướng đến chi tiết đơn hàng
                              >
                                View
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Orders;
