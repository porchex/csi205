import fblogo from "/images/FBLOGO.png";
import iglogo from "/images/IG.jpg";

const AppFooter = () => {
    return ( 
    <>
        <h3 style={{ textAlign: 'center'}}>SPU-SIT-CSI</h3>
        <div>
        <a href="https://www.instagram.com/porrxz_/?hl=th "  target="_blank"><img src={fblogo} style={{ width: '40px', height: '40px' }}/></a>
        <a href="https://www.facebook.com/thanachon.chaengcharoen "  target="_blank"><img src={iglogo} style={{ width: '30px', height: '30px' }}/></a>
        </div>
    </> 
    );
}
 
export default AppFooter;