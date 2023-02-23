import React, { useState, useEffect } from "react";
import "./Photolist.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { Dimmer, Image } from "../../Elements";
import PhotoItem from "./PhotoItem";
import CloseIcon from '@mui/icons-material/Close';

const api = axios.create(
  {
    baseURL: "http://i8a201.p.ssafy.io",
  },
  { withCredentials: true }
);

const Photolist = () => {
  const member = useSelector((state) => state?.user?.member);
  const imgUrl = "https://firebasestorage.googleapis.com/v0/b/ddok-mirror.appspot.com/o/유소영.png?alt=media";
  const nickname = "쏘영";
  const [memberKey, setMemberKey] = useState("fSBS-lCHb");
  const [list, setList] = useState([]);
  const [imageList, setImageList] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [openPhotoUrl, setOpenPhotoUrl] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  
  const changeModal = () => {
    if(openModal){
      setOpenModal(false)
    }else{
      setOpenModal(true)
    }
  }
  // api 통신으로 사진 url 리스트 받아옴
  useEffect(() => {
    api
      .get("web/snapShot/all", {
        headers: {
          "member-key": memberKey,
        },
      })
      .then((response) => {
        console.log(response);
        const data = response.data.data;
        setList((prev) => [...prev, ...data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if(openModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [openModal]);
  
  // const handlePrevClick = () => {
  //   setCurrentIndex((currentIndex + imageList.length - 1) % imageList.length);

  //   if (currentIndex > 0) {
  //     setUrl(list[currentIndex].imgUrl);
  //   }
  // };

  // const handleNextClick = () => {
  //   setCurrentIndex((currentIndex + 1) % imageList.length);
  //   setUrl(list[currentIndex].imgUrl);
  // };

  // useEffect(() => {
  //   if (list.length > 0) {
  //     setImageList(
  //       list.map((image) => {
  //         return {
  //           src: image.imgUrl,
  //           width: 200,
  //           height: 200,
  //         };
  //       })
  //     );
  //   }
  // }, [list]);

  // const onClick = (value, idx) => {
  //   setModalOpen(true);
  //   setUrl(value[idx].imgUrl);
  //   setCurrentIndex(idx);
  //   console.log(value[idx].imgUrl);
  // };


  // const modalStyles = {
  //   position: "fixed",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   backgroundColor: "white",
  //   padding: "1rem",
  //   borderRadius: "5px",
  // };

  // const buttonStyles = {
  //   position: "relative",
  //   padding: "10px",
  //   border: "none",
  // };

  // return (
  //   <div className="gal">
  //     <div className="thumbnail">
  //       {list.length > 0 &&
  //         list.map((item, idx) => (
  //           <img
  //             className="imgComp"
  //             key={idx}
  //             src={list[idx].imgUrl}
  //             onClick={() => onClick(list, idx)}
  //             alt="idx"
  //           ></img>
  //         ))}
  //       {modalOpen && (
  //         <div style={modalStyles}>
  //           <img src={url} />
  //           <br></br>
  //           <button onClick={handlePrevClick} style={buttonStyles}>
  //             ◀️
  //           </button>
  //           <button onClick={() => setModalOpen(false)} style={buttonStyles}>
  //             ❌
  //           </button>
  //           <button onClick={handleNextClick} style={buttonStyles}>
  //             ▶️
  //           </button>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );

  return (
    <>
      <div>
        <div className="member-header">
          <Image type="member" src={imgUrl}/>
          {/* <Image type="member" src={member?.imgUrl}/> */}
          <div className="is_flex">
            <p style={{alignItems:'center', display:'flex'}}>{nickname}</p>
            {/* <p style={{alignItems:'center', display:'flex'}}>{member?.nickname}</p> */}
          </div>
        </div>
        <div className="gallery-box">
          {
            list?.map((item, idx) => {
              const created = item.created;
              const imgUrl = item.imgUrl;
              const memberKey = item.memberKey;

              return (
                <PhotoItem 
                  key={idx} 
                  created={created} 
                  imgUrl={imgUrl} 
                  memberKey={memberKey}
                  setOpenModal={setOpenModal}
                  setOpenPhotoUrl={setOpenPhotoUrl}
                  openPhotoUrl={openPhotoUrl}/>
              )
            })
          }
        </div>
        {openModal &&
        <>
          <Dimmer onClick={() => changeModal()} />
          <div 
            style={{
              width:"fit-content", 
              height:"fit-content", 
              zIndex:"200", 
              position:"fixed", 
              right:"0", 
              left:"0",
              margin:"0 auto",
              bottom:"300px",
            }}
            onClick={e => e.stopPropagation()}
            >
              <div 
                className="close-icon"
                onClick={() => changeModal()}><CloseIcon /></div>
              <Image type="photo_bigger" imgUrl={openPhotoUrl}/>
            </div>
        </>
        }
      </div>
    </>
  )
};

export default Photolist;
