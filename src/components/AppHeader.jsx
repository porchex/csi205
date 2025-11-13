import "./AddHeader.css";
import logo from "/images/logo.png";

const AppHeader = () => {
  return (
    <>
      <div>
        <img src={logo} className="AppHeader" />
      </div>

      <h1 style={{ textAlign: 'center' }}>CSI205 การพัฒนาโปรแกรมส่วนหน้า</h1>
    </>
  );
};

export default AppHeader;
