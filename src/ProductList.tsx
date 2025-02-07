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

export interface IProducts {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<IProducts[]>([]);
  const navigate = useNavigate();

  const showEditPage = (e: any, id: string) => {
    e.preventDefault();
    navigate(`/admin/product/${id}`); // Điều hướng tới trang chỉnh sửa sản phẩm
  };
  useEffect(() => {
    loadData();
  }, []);
  const loadData = () => {
    const q = query(collection(firestoreDb, "products"), orderBy("name"));
    getDocs(q).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        const item = doc.data() as IProducts;
        item.id = doc.id;
        return item;
      });
      setProducts(data);
    });
  };
  const handleDelete = (e: any, id: string) => {
    e.preventDefault();
    deleteDoc(doc(firestoreDb, "products", id)).then(() => loadData());
  };
  return (
    <>
      <div className="content-wrapper">
        {/* Main Content */}
        <section className="content">
          <div className="content">
            <h1>Product Management</h1>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Product List</h3>
                    <a
                      href="/#"
                      className="btn btn-primary float-right"
                      onClick={(e) => showEditPage(e, "0")}
                    >
                      Add Product
                    </a>
                  </div>
                  <div className="card-body">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Price</th>
                          <th>Image</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.price} VNĐ</td>
                            <td>
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: "100px" }}
                              />
                            </td>
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

                        {/* Add more products here */}
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
export default ProductList;
