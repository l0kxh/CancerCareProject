import React from 'react'
import Navbar from '../navbar/navbar'
import Carousel from './Carousel'
import { useNavigate } from 'react-router-dom'
import './Home.css'
function Home() {
  document.querySelector('title').textContent = "CancerCare | Home"
  const navigate = useNavigate()
  return (
    <div>
      <Navbar />
      <Carousel />
      <div className='d-block mx-auto w-75 mt-5'>
        <div className='d-flex justify-content-between'>
          <h2 style={{ color: "#03045e", fontWeight: "bold" }} className='mb-4'>Blood Cancers</h2>
          <button type='button' className='btn btn-outline-danger mb-4' onClick={() => { navigate('/detection') }}>Wanna Check ??</button>
        </div>
        <p>Blood cancers affect the production and function of your blood cells. Most of these cancers start in your bone marrow where blood is produced. Stem cells in your bone marrow mature and develop into three types of blood cells: red blood cells, white blood cells, or platelets. In most blood cancers, the normal blood cell development process is interrupted by uncontrolled growth of an abnormal type of blood cell. These abnormal blood cells, or cancerous cells, prevent your blood from performing many of its functions, like fighting off infections or preventing serious bleeding.</p>
        <p>There are three main types of blood cancers:</p>
        <ul>
          <li><p><span className='text-danger'>Leukemia</span>, a type of cancer found in your blood and bone marrow, is caused by the rapid production of abnormal white blood cells. The high number of abnormal white blood cells are not able to fight infection, and they impair the ability of the bone marrow to produce red blood cells and platelet</p></li>
          <li><p><span className='text-danger'>Lymphoma</span> is a type of blood cancer that affects the lymphatic system, which removes excess fluids from your body and produces immune cells. Lymphocytes are a type of white blood cell that fight infection. Abnormal lymphocytes become lymphoma cells, which multiply and collect in your lymph nodes and other tissues. Over time, these cancerous cells impair your immune system.</p></li>
          <li><p><span className='text-danger'>Myeloma</span> is a cancer of the plasma cells. Plasma cells are white blood cells that produce disease- and infection-fighting antibodies in your body. Myeloma cells prevent the normal production of antibodies, leaving your body's immune system weakened and susceptible to infection. </p></li>
        </ul>
      </div>
      <div className='d-block mx-auto mt-5 mb-5' width="80%">
        <div className="d-flex flex-wrap gap-5 justify-content-center">
          <div className="card cardstyling" style={{ borderLeft: "5px solid  #0dcaf0" }}>
            <h5>Users</h5>
            <p style={{ fontSize: "25px", fontWeight: "bold" }}>10</p>
          </div>
          <div className="card cardstyling" style={{ borderLeft: "5px solid  #fd3550" }}>
            <h5>Deaths</h5>
            <p style={{ fontSize: "25px", fontWeight: "bold" }}>219</p>
          </div>
          <div className="card cardstyling" style={{ borderLeft: "5px solid  #15ca20" }}>
            <h5>Patients</h5>
            <p style={{ fontSize: "25px", fontWeight: "bold" }}>4594</p>
          </div>
          <div className="card cardstyling" style={{ borderLeft: "5px solid  #ffc107" }}>
            <h5>Cured</h5>
            <p style={{ fontSize: "25px", fontWeight: "bold" }}>137</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
