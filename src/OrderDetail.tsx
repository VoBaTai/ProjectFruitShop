import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { firestoreDb } from "./firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";

interface IOrderDetail {
  orderId: string;
  price: number;
  productId: string;
  quantity: number;
}

const OrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>(); // Lấy orderId từ URL
  const [orderDetails, setOrderDetails] = useState<IOrderDetail[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true); // Thêm trạng thái loading
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const q = query(
          collection(firestoreDb, "orderDetails"),
          where("orderId", "==", orderId) // Truy vấn dựa trên orderId
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError("No order details found for this order ID.");
          setLoading(false);
          return;
        }

        const data = querySnapshot.docs.map((doc) => {
          const orderDetail = doc.data() as IOrderDetail;
          orderDetail.price = Number(orderDetail.price); // Chuyển đổi price sang số
          return orderDetail;
        });
        setOrderDetails(data);

        // Tính tổng giá trị đơn hàng
        const orderTotal = data.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        setTotal(orderTotal);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order details: ", error);
        setError("Failed to fetch order details.");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị trạng thái đang tải
  }

  if (error) {
    return <div>{error}</div>; // Hiển thị lỗi nếu có
  }

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="content">
          <h1>Chi tiết hóa đơn</h1>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Order ID: {orderId}</h3>
                </div>
                <div className="card-body">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Product ID</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Tổng cộng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails.map((item, index) => (
                        <tr key={index}>
                          <td>{item.productId}</td>
                          <td>{item.quantity}</td>
                          <td>{item.price.toFixed(2)} VNĐ</td>{" "}
                          {/* Hiển thị giá */}
                          <td>
                            {(item.price * item.quantity).toFixed(2)} VNĐ
                          </td>{" "}
                          {/* Hiển thị tổng */}
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colSpan={3} className="text-right">
                          Tổng
                        </th>
                        <th>{total.toFixed(2)} VNĐ</th> {/* Hiển thị tổng */}
                      </tr>
                    </tfoot>
                  </table>
                  <Link to="/admin/orders" className="btn btn-secondary">
                    Trở lại
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderDetail;
