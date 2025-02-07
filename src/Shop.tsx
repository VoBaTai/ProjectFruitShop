import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  setDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { firestoreDb } from "./firebase-config";

export interface IShop {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

const Shop = () => {
  const [products, setProducts] = useState<IShop[]>([]);
  const [userUid, setUserUid] = useState<string | null>(
    localStorage.getItem("userUid")
  );
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const q = query(collection(firestoreDb, "products"), orderBy("name"));
    getDocs(q).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        const item = doc.data() as IShop;
        item.id = doc.id;
        return item;
      });
      setProducts(data);
    });
  };

  const handleAddToCart = async (productId: string) => {
    if (!userUid) {
      alert("Vui lòng đăng nhập!");
      return;
    }

    try {
      const cartRef = doc(firestoreDb, `users/${userUid}/cart`, productId);
      await setDoc(cartRef, {
        productId: productId,
        quantity: 1,
      });

      alert("Sản phẩm đã thêm vào giỏ hàng!");
      // Cập nhật giỏ hàng sau khi thêm sản phẩm
    } catch (error: any) {
      console.error("Error adding to cart:", error.message);
      alert(error.message);
    }
  };

  return (
    <>
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <h4>Danh Sách Sản Phẩm</h4>
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {products.map((item) => (
              <div className="col mb-5" key={item.id}>
                <div className="card h-100">
                  <a href="/#" onClick={(e) => navigate(`/shop/${item.id}`)}>
                    <img
                      className="card-img-top"
                      src={item.image}
                      alt={item.name}
                      style={{ height: "200px" }}
                    />
                  </a>
                  <div className="card-body p-4">
                    <div className="text-center">
                      <h5 className="fw-bolder">{item.name}</h5>
                      {item.price} VNĐ
                    </div>
                  </div>
                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                      <button
                        className="btn btn-outline-success mt-auto"
                        onClick={() => handleAddToCart(item.id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
