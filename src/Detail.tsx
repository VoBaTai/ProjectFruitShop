import ContainerProducts from "./components/ContainerProduct";
const Detail = () => {
  return (
    <>
      <div>
        <section className="py-5">
          <div className="container px-4 px-lg-5 my-5">
            <div className="row gx-4 gx-lg-5 align-items-center">
              <div className="col-md-6">
                <img
                  className="card-img-top mb-5 mb-md-0"
                  src="./images/product-1.png" // Đường dẫn hình ảnh hợp lệ
                  alt="Product"
                />
              </div>
              <div className="col-md-6">
                <h1 className="display-5 fw-bolder">Táo</h1>
                <div className="fs-5 mb-5">
                  <span>30.000 VNĐ</span>
                </div>
                <p className="lead">
                  Táo có hình tròn, màu sắc đa dạng (đỏ, xanh, vàng), vị ngọt
                  hoặc chua. Giàu chất xơ, vitamin C, ít calo. Tốt cho tim mạch,
                  tiêu hóa và tăng cường miễn dịch.
                </p>
                <div className="d-flex">
                  <input
                    className="form-control text-center me-3"
                    id="inputQuantity"
                    type="number"
                    defaultValue={1}
                    style={{ maxWidth: "3rem" }}
                  />
                  <button
                    className="btn btn-outline-dark flex-shrink-0"
                    type="button"
                  >
                    <i className="bi-cart-fill me-1" />
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Related Products Section*/}
        <section className="py-5 bg-light">
          <div className="container px-4 px-lg-5 my-5">
            <h2 className="fw-bolder mb-4">Related Products</h2>
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              {/* Related product 1 */}
              <ContainerProducts
                alt="/#"
                name="Chuối"
                src="./images/product-2.png"
                price="20.000 VNĐ"
              />
              {/* Related product 2 */}
              <ContainerProducts
                alt="/#"
                name="Cam"
                src="./images/product-3.png"
                price="50.000 VNĐ"
              />
              {/* Related product 3 */}
              <ContainerProducts
                alt="/#"
                name="Nho"
                src="./images/product-4.png"
                price="150.000 VNĐ"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Detail;
