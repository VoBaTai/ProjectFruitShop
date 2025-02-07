import { Link } from "react-router-dom";

const DashBoard = () => {
  return (
    <div className="content-wrapper">
      {/* Main Content */}
      <section className="content">
        <div className="container-fluid">
          {/* Small boxes (Stat box) */}
          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>150</h3>
                  <p>Tổng Sản Phẩm</p>
                </div>
                <div className="icon">
                  <i className="fas fa-apple-alt" />
                </div>
                <Link to="/admin/product" className="small-box-footer">
                  Chi tiết <i className="fas fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>44</h3>
                  <p>Đơn hàng</p>
                </div>
                <div className="icon">
                  <i className="fas fa-shopping-cart" />
                </div>
                <Link to="/admin/orders" className="small-box-footer">
                  Chi tiết <i className="fas fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>65</h3>
                  <p>Khách hàng</p>
                </div>
                <div className="icon">
                  <i className="fas fa-users" />
                </div>
                <Link to="/admin/customer" className="small-box-footer">
                  Chi tiết <i className="fas fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default DashBoard;
