import { VscThreeBars } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import Lottie from 'react-lottie';
import { IoHomeSharp } from "react-icons/io5";
import { ImLab } from "react-icons/im";
import { FaHospital } from "react-icons/fa";
import canerlogo from '../../Assests/cancerlogo.png'
import { FaUserCircle } from "react-icons/fa";
import profileimg from '../../Assests/profile-img.json'
import { MdLogout } from "react-icons/md";
import { logout } from "../../redux/Actions";
import './navbar.css'
function Navbar() {
    const { username, email } = useSelector(state => state.loginreducer)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const onlogout = () => {
        localStorage.clear()
        dispatch(logout())
        navigate('/')
    }
    const defaultOptions = {
        loop: true,
        autoplay: true,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <div className='header'>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <NavLink className="logo" to='/'><img src={canerlogo} height="50px" width="50px" alt="" />Cancer Care</NavLink>
                    <button className="navbar-toggler navbtn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="toggler"><VscThreeBars /></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav gap-4">
                            <li className="nav-item">
                                <NavLink className="nav-link text-light" to='/home'><i className="fs-4"><IoHomeSharp /></i> Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-light" to='/detection'><i className="fs-4"><ImLab /></i> Lab</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-light" to='/maps'><i className="fs-4"><FaHospital /></i> Hospitals</NavLink>
                            </li>
                            <li>
                                <i style={{ fontSize: "30px", color: "white", cursor: "pointer" }} data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><FaUserCircle /></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                <div className="offcanvas-header d-flex justify-content-end">

                    <button type="button" className="btn-close mt-1" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <Lottie
                        options={{ animationData: profileimg, defaultOptions }}
                        height={300}
                        width={300}
                    />
                    <div className="mt-2 fs-5 text-center">
                        <p>{username}</p><hr />
                        <p>{email}</p><hr />
                        <p>History</p><hr />
                        <p style={{ cursor: "pointer" }} onClick={() => onlogout()}>logout <i><MdLogout /></i></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
