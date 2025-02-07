import React from "react";
import "./App.css";
import Banner from "./components/Banner";
import Member from "./components/Member";
const Team = () => {
  return (
    <>
      <Banner
        nameWeb="Thành viên nhóm"
        description=""
        style={{ backgroundColor: "#30AADD" }}
      />
      <section className="page-section mt-3" id="team">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Các thành viên</h2>
            <h3 className="section-subheading text-muted">
              Tham gia làm dự án
            </h3>
          </div>
          <div className="row">
            <Member
              nameMember="Võ Bá Lộc"
              alt=""
              src="./images/person.jpg"
              description="Team Leader"
            />
            <Member
              nameMember="Võ Bá Tài"
              alt=""
              src="./images/person.jpg"
              description="Member"
            />
            <Member
              nameMember="Bùi Hữu Liêm"
              alt=""
              src="./images/person.jpg"
              description="Member"
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default Team;
