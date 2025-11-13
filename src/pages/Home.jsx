import { Outlet } from "react-router-dom";
import human from "/images/human.png";
const Home = () => {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Home Page</h2>
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        marginTop: "20px" 
      }}>
        <img
          src={human}
          alt="student"
          style={{ borderRadius: "0%", width: "300px", height: "300px" }}
        />
        <h3 style={{ marginTop: "10px" }}>รหัสนักศึกษา: 67095854</h3>
        <p>ชื่อ-สกุล: นายธนชล แจงเจริญ</p>
        <p>ชั้นปี: ปีที่ 2</p>
        <p>สาขา: วิทยาการคอมพิวเตอร์และนวัตกรรมพัฒนาซอฟต์แวร์</p>
        <p>คณะ: เทคโนโลยีสาระสนเทศ</p>
        <p>มหาวิทยาลัย: มหาวิทยาลัยศรีปทุม</p>
        <p style={{ maxWidth: "500px", textAlign: "center", marginTop: "10px" }}>
          สวัสดีครับชื่อเล่นชื่อปอครับชอบกินไก่ทอด
        </p>
      </div>

      {/* ตำแหน่ง Outlet สำหรับหน้าอื่น ๆ */}
      <Outlet />
    </>
  );
};

export default Home;
