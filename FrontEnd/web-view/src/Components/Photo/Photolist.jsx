import React, { useState, useEffect } from "react";
import "./Photolist.css";
import axios from "axios";

const api = axios.create(
  {
    baseURL: "http://i8a201.p.ssafy.io",
  },
  { withCredentials: true }
);

const Photolist = () => {
  const [url, setUrl] = useState(null);
  const [memberKey, setMemberKey] = useState("fSBS-lCHb");
  const [list, setList] = useState([]);
  const [imageList, setImageList] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  
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
    <div>
      
    </div>
  )
};

export default Photolist;
