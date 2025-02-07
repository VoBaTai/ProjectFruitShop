import React, { useEffect, useState } from "react";
import "./App.css";
import Banner from "./components/Banner";
import { IShop } from "./Shop";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestoreDb } from "./firebase-config";
import { useNavigate } from "react-router-dom";
function Home() {
  const [products, setProducts] = useState<IShop[]>([]);
  const navigate = useNavigate();
  const showDetailPage = (e: any, id: string) => {
    e.preventDefault();
    navigate(`/shop/${id}`); // Điều hướng tới trang chỉnh sửa sản phẩm
  };
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
  return (
    <>
      <Banner
        nameWeb="Chào mừng đến VegetStore"
        description=""
        style={{ backgroundColor: "#D90368" }}
      />
      {/* Section*/}
      <section className="py-5">
        <h1 className="text-center text-success">Sản phẩm nổi bật</h1>
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {products.slice(0, 8).map((item, index) => (
              <div className="col mb-5">
                <div className="card h-100">
                  {/* Product image*/}
                  <a href="/#" onClick={(e) => showDetailPage(e, item.id)}>
                    <img
                      className="card-img-top"
                      src={item.image}
                      alt={item.name}
                      style={{ height: "200px" }}
                    />
                  </a>

                  {/* Product details*/}
                  <div className="card-body p-4">
                    <div className="text-center">
                      {/* Product name*/}
                      <a
                        onClick={(e) => showDetailPage(e, item.id)}
                        href="/#"
                        className="text-decoration-none text-secondary hover:text-success"
                      >
                        <h5 className="fw-bolder ">{item.name}</h5>
                      </a>
                      {/* Product price*/}
                      {item.price} VNĐ
                    </div>
                  </div>
                  {/* Product actions*/}
                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                      <a
                        onClick={(e) => showDetailPage(e, item.id)}
                        href="/#"
                        className="btn btn-outline-success mt-auto"
                      >
                        Xem chi tiết
                      </a>
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
}

export default Home;
