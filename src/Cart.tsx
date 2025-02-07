import React, { useState, useEffect } from "react";
import { firestoreDb } from "./firebase-config";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import "./App.css";
const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [userUid, setUserUid] = useState<string | null>(
    localStorage.getItem("userUid")
  );

  useEffect(() => {
    if (userUid) {
      fetchCartItems();
    }
  }, [userUid]);

  const fetchCartItems = async () => {
    const cartCollection = collection(firestoreDb, `users/${userUid}/cart`);
    const cartSnapshot = await getDocs(cartCollection);

    const items = await Promise.all(
      cartSnapshot.docs.map(async (docSnapshot) => {
        const data = docSnapshot.data();

        if (!data.productId) {
          console.error(`Missing productId for cart item: ${docSnapshot.id}`);
          return null;
        }
        const productRef = doc(firestoreDb, "products", data.productId);
        const productDoc = await getDoc(productRef);
        const productData = productDoc.exists() ? productDoc.data() : null;

        if (!productData) {
          return {
            id: docSnapshot.id,
            productId: data.productId,
            quantity: data.quantity,
            name: "Sản phẩm không tồn tại",
            price: 0,
            image: "https://via.placeholder.com/50",
          };
        }

        return {
          id: docSnapshot.id,
          productId: data.productId,
          quantity: data.quantity,
          name: productData.name,
          price: productData.price,
          image: productData.image,
        };
      })
    );

    setCartItems(items.filter((item) => item !== null));
  };

  const handleRemoveFromCart = async (cartItemId: string) => {
    try {
      const cartRef = doc(firestoreDb, `users/${userUid}/cart`, cartItemId);
      await deleteDoc(cartRef);

      alert("Sản phẩm đã xóa khỏi giỏ hàng!");
      fetchCartItems();
    } catch (error: any) {
      console.error("Error removing from cart:", error.message);
      alert(error.message);
    }
  };

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      const cartRef = doc(firestoreDb, `users/${userUid}/cart`, itemId);
      await setDoc(cartRef, {
        productId: itemId,
        quantity: newQuantity,
      });

      fetchCartItems();
    } catch (error: any) {
      console.error("Error updating quantity:", error.message);
      alert(error.message);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Giỏ hàng của bạn đang trống.");
      return;
    }

    try {
      // 1. Thêm đơn hàng vào bảng orders
      const orderRef = await addDoc(collection(firestoreDb, "ordersshop"), {
        userId: userUid,
        orderDate: new Date().toISOString(),
        totalAmount: calculateTotalPrice(),
        status: "pending", // Có thể thay đổi trạng thái đơn hàng nếu cần
      });

      // 2. Thêm chi tiết đơn hàng vào bảng ordersDetail
      const orderId = orderRef.id;
      const orderDetailsPromises = cartItems.map((item) =>
        addDoc(collection(firestoreDb, "orderDetails"), {
          orderId: orderId, // ID của đơn hàng
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })
      );

      await Promise.all(orderDetailsPromises);

      // 3. Xóa các sản phẩm khỏi giỏ hàng sau khi thanh toán
      const cartItemIds = cartItems.map((item) => item.id);
      const deletePromises = cartItemIds.map((itemId) =>
        deleteDoc(doc(firestoreDb, `users/${userUid}/cart`, itemId))
      );
      await Promise.all(deletePromises);

      alert("Thanh toán thành công!");
      fetchCartItems(); // Cập nhật lại giỏ hàng sau khi thanh toán
    } catch (error: any) {
      console.error("Error during checkout:", error.message);
      alert("Đã xảy ra lỗi khi thanh toán. Vui lòng thử lại.");
    }
  };

  const totalPrice = calculateTotalPrice();

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5">
        <div className="row">
          {/* Cart Items*/}
          <div className="col-lg-8">
            <h2 className="mb-4">Sản phẩm trong giỏ hàng</h2>
            {cartItems.length > 0 ? (
              <ul>
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        marginRight: "10px",
                      }}
                    />
                    <span style={{ flexGrow: 1 }}>
                      {item.name} - Giá: {item.price} VNĐ
                    </span>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        handleQuantityChange(item.id, Number(e.target.value))
                      }
                      style={{ width: "60px", marginLeft: "10px" }}
                    />
                    <span style={{ marginLeft: "10px" }}>
                      {(item.price * item.quantity).toFixed(2)} VNĐ
                    </span>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveFromCart(item.id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Xóa
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Giỏ hàng của bạn đang trống.</p>
            )}
          </div>
          {/* Order Summary*/}
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-header">
                <h5>Tổng hóa đơn</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Tổng cộng:</span>
                    <strong>{totalPrice} VNĐ</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Phí giao hàng:</span>
                    <strong>20.000 VNĐ</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Tổng:</span>
                    <strong>{totalPrice + 20000} VNĐ</strong>
                  </li>
                </ul>
                <button
                  className="btn btn-warning mt-3 w-100 text-white fw-bolder"
                  onClick={handleCheckout}
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
