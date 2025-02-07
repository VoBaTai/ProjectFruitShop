import React from "react";
import "./App.css";
import Banner from "./components/Banner";
function Contact() {
  return (
    <>
      <Banner
        nameWeb="Liên hệ với chúng tôi"
        description=""
        style={{ backgroundColor: "#30AADD" }}
      />
      <section className="py-5">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-lg-8 col-md-10">
              <h2 className="fw-bolder mb-4 text-center">Liên hệ</h2>
              <p className="text-center mb-4">
                Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi
                bằng cách điền vào biểu mẫu bên dưới hoặc thông qua thông tin
                liên hệ được cung cấp.
              </p>
              {/* Contact form*/}
              <form id="contactForm">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="name"
                    type="text"
                    placeholder="Enter your name..."
                    required
                  />
                  <label htmlFor="name">Họ tên đầy đủ</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                  />
                  <label htmlFor="email">Địa chỉ email</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="phone"
                    type="tel"
                    placeholder="(123) 456-7890"
                  />
                  <label htmlFor="phone">Số điện thoại</label>
                </div>
                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    id="message"
                    placeholder="Enter your message here..."
                    style={{ height: "10rem" }}
                    required
                    defaultValue={""}
                  />
                  <label htmlFor="message">Lời Nhắn:</label>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-outline-success btn-lg"
                    type="submit"
                  >
                    Gửi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Contact;
