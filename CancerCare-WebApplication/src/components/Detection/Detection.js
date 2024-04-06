import React, { useState } from 'react';
import Navbar from '../navbar/navbar';
import { FaRegFileImage } from "react-icons/fa";
import Lottie from 'react-lottie';
import imgloading from '../../Assests/img-loading.json'
import docanimation from '../../Assests/doctor-animation.json'
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import './Detection.css';
import { imageDB } from '../../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Detection() {
  const [img, setImg] = useState();
  const [cancerStatus, setCancerStatus] = useState('');
  const [iscancer, setIscancer] = useState(false)
  const [loader, setLoader] = useState(false);
  const [loadingtext, setLoadingtext] = useState('Uploading...')
  const [imglink, setImglink] = useState('')
  const navigate = useNavigate()
  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  const filename = v4();
  document.querySelector('title').textContent = "CancerCare | Lab";
  const onChecked = async () => {
    setLoader(true);
    setTimeout(() => { setLoadingtext('Processing...') }, 2000)
    const imgRef = ref(imageDB, `files/${filename}`);
    await uploadBytes(imgRef, img);
    getDownloadURL(ref(imageDB, `files/${filename}`))
      .then(res => {
        setImglink(res)
        axios.post('http://127.0.0.1:5000/predict', { 'image_link': res }, { headers: "application/json" })
          .then(resdata => {
            setCancerStatus(resdata.data.predictions.label)
            if (resdata.data.predictions.label !== "No Cancer") {
              setTimeout(() => { setIscancer(true) }, 700)
            }
          });
      });
    setTimeout(() => { setLoader(false) }, 2500)
  };
  const onClose = () => {
    setIscancer(false)
    setLoadingtext('Uploading...')
  }
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <Navbar />
        <div className='labimg'></div>
        <div>
          <div className='row mt-4' style={{ width: "90%", marginLeft: "140px" }}>
            <div className='col-lg-7'>
              <h2 style={{ color: "#03045e", fontWeight: "bold" }} className='mt-5 mb-4'>Leukemia Cancer Detection</h2>
              <ul>
                <li><p><span className='text-danger'>Leukemia</span>, a type of cancer found in your blood and bone marrow, is caused by the rapid production of abnormal white blood cells. The high number of abnormal white blood cells are not able to fight infection, and they impair the ability of the bone marrow to produce red blood cells and platelet</p></li>
                <li><p><span className='text-danger'>Lymphoma</span> is a type of blood cancer that affects the lymphatic system, which removes excess fluids from your body and produces immune cells. Lymphocytes are a type of white blood cell that fight infection. Abnormal lymphocytes become lymphoma cells, which multiply and collect in your lymph nodes and other tissues. Over time, these cancerous cells impair your immune system.</p></li>
                <li><p><span className='text-danger'>Myeloma</span> is a cancer of the plasma cells. Plasma cells are white blood cells that produce disease- and infection-fighting antibodies in your body. Myeloma cells prevent the normal production of antibodies, leaving your body's immune system weakened and susceptible to infection. </p></li>
              </ul>
            </div>
            <div className='col-lg-5'>
              <div className='d-block mx-auto'>
                <Lottie
                  options={{ animationData: docanimation, defaultOptions }}
                  height={500}
                  width={500}
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="image" className='mx-auto mb-5 drop-container'>
              <i style={{ fontSize: "60px" }}><FaRegFileImage /></i>
              <span className='drop-title'>Upload here</span>
              or
              <input type="file" id='image' accept='image/*' onChange={(e) => setImg(e.target.files[0])} />
              <button style={{ marginTop: "20px", fontSize: "18px", width: "max-content" }} onClick={() => onChecked()} className='btn btn-outline-dark' data-bs-toggle="modal" data-bs-target="#exampleModal">Check</button>
            </label>
          </div>
        </div>
      </div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ boxShadow: "0 4px 15px 4px rgba(0, 0, 0, 0.2)" }}>
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => onClose()} aria-label="Close"></button>
            </div>
            <div className="modal-body d-block mx-auto">
              {loader ?
                <div>
                  <div className='d-block mx-auto'>
                    <Lottie
                      options={{ animationData: imgloading, defaultOptions }}
                      height={300}
                      width={300}
                    />
                  </div>
                  <h3 className='loading-text text-center mb-5'>{loadingtext}</h3>
                </div>
                :
                <div>
                  <img src={imglink} width="300px" height="300px" alt="" />
                  <h4 className='text-center mt-4'>result : {cancerStatus}</h4>
                </div>
              }
            </div>
            <div className="modal-footer">
              {iscancer && <button type="button" className='btn btn-success' data-bs-dismiss="modal" onClick={() => { navigate('/maps') }}>Get Hospitals</button>}
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => onClose()}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detection;
