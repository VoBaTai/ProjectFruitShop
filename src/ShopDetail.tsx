import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { firestoreDb } from "./firebase-config";
import { IShop } from "./Shop";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";

const ProductValue = {
  id: "",
  name: "",
  description: "",
  price: "",
  image: "",
};

const ShopDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<IShop[]>([]);
  const [product, setProduct] = useState<IShop>(ProductValue);
  const [userUid, setUserUid] = useState<string | null>(
    localStorage.getItem("userUid")
  );
  const [quantity, setQuantity] = useState<number>(1); // State để lưu số lượng sản phẩm
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

  useEffect(() => {
    getDoc(doc(collection(firestoreDb, "products"), id)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as IShop;
        data.id = snapshot.id;
        setProduct(data);
      }
    });
  }, [id, navigate]);

  const handleAddToCart = async () => {
    if (!userUid) {
      alert("Vui lòng đăng nhập!");
      return;
    }

    try {
      const cartRef = doc(firestoreDb, `users/${userUid}/cart`, product.id);
      await setDoc(cartRef, {
        productId: product.id,
        quantity: quantity,
      });

      alert("Sản phẩm đã thêm vào giỏ hàng!");
    } catch (error: any) {
      console.error("Error adding to cart:", error.message);
      alert(error.message);
    }
  };

  const showDetailPage = (e: any, id: string) => {
    e.preventDefault();
    navigate(`/shop/${id}`); // Điều hướng tới trang chỉnh sửa sản phẩm
  };

  return (
    <>
      <div>
        <section className="py-5">
          <div className="container px-4 px-lg-5 my-5">
            <div className="row gx-4 gx-lg-5 align-items-center">
              <div className="col-md-6">
                <img
                  className="card-img-top mb-5 mb-md-0"
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <div className="col-md-6">
                <h1 className="display-5 fw-bolder">{product.name}</h1>
                <div className="fs-5 mb-5">
                  <span>{product.price} VNĐ</span>
                </div>
                <p className="lead">{product.description}</p>
                <div className="d-flex">
                  <input
                    className="form-control text-center me-3"
                    id="inputQuantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    style={{ maxWidth: "3rem" }}
                  />
                  <button
                    className="btn btn-outline-dark flex-shrink-0"
                    type="button"
                    onClick={handleAddToCart} // Gọi hàm thêm vào giỏ hàng
                  >
                    <i className="bi-cart-fill me-1" />
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Related Products Section */}
        <section className="py-5 bg-light">
          <div className="container px-4 px-lg-5 my-5">
            <h2 className="fw-bolder mb-4">Related Products</h2>
            <div className="container px-4 px-lg-5 mt-5">
              <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-lg-4 justify-content-center">
                {products.slice(0, 3).map((item, index) => (
                  <div className="col mb-5" key={index}>
                    <div className="card h-100 shadow-sm">
                      {/* Product image */}
                      <a href="/#" onClick={(e) => showDetailPage(e, item.id)}>
                        <img
                          className="card-img-top"
                          src={item.image}
                          alt={item.name}
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                      </a>

                      {/* Product details */}
                      <div className="card-body p-4">
                        <div className="text-center">
                          {/* Product name */}
                          <a
                            onClick={(e) => showDetailPage(e, item.id)}
                            href="/#"
                            className="text-decoration-none text-secondary hover:text-success"
                          >
                            <h5 className="fw-bolder">{item.name}</h5>
                          </a>
                          {/* Product price */}
                          <div className="mt-3">
                            <span className="text-muted">{item.price} VNĐ</span>
                          </div>
                        </div>
                      </div>

                      {/* Product actions */}
                      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div className="text-center">
                          <button
                            className="btn btn-outline-success mt-auto"
                            onClick={() => handleAddToCart()} // Thêm sản phẩm vào giỏ hàng từ trang liên quan
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
          </div>
        </section>
      </div>
    </>
  );
};

export default ShopDetail;
