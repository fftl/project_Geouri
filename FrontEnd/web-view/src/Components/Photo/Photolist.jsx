import { current } from "immer";
import React, { useState, useEffect } from "react";
import ReactGridGallery from "react-grid-gallery";
import instance from "../../Redux/modules/instance";
import "./Photolist.css";

const photoApi = {
  getPhoto: (memberKey) =>
    instance.get(`web/snapShot/all?memberKey=${memberKey}`),
};

const Photolist = () => {
  const [url, setUrl] = useState(null);
  const [memberKey, setMemberKey] = useState("nh3b-494F");
  const [list, setList] = useState([]);
  const [imageList, setImageList] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((currentIndex + imageList.length - 1) % imageList.length);

    if (currentIndex > 0) {
      setUrl(list[currentIndex].imgUrl);
    }
  };

  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % imageList.length);
    setUrl(list[currentIndex].imgUrl);
  };
  // const handleClick = (item, index) => setIndex(index);
  // const slides = imageList.map(({ src, width, height }) => ({
  //   src,
  //   width,
  //   height,
  // }));
  // console.log("slides: ", slides);
  // console.log(imageList);
  // useEffect(() => {
  // if (imageList.length > 0) {
  // setSlides(
  //   imageList.map(({ src, width, height }) => ({
  // src: src.split("?")[0],
  // src,
  // width,
  // height,
  // }))
  // );
  // }
  // }, [imageList]);

  // console.log(list);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await photoApi.getPhoto(memberKey).then((response) => {
          const data = response.data.data;
          setList((prev) => [...prev, ...data]);
          console.log(response.data.data);
        });
      } catch (error) {
        console.error(error);
        // setUrl(null);
      }
    };
    fetchData();
    // console.log(list);
  }, []);

  useEffect(() => {
    if (list.length > 0) {
      setImageList(
        list.map((image) => {
          return {
            src: image.imgUrl,
            width: 320,
            height: 320,
          };
        })
      );
    }
  }, [list]);

  const onClick = (value, idx) => {
    setModalOpen(true);
    setUrl(value[idx].imgUrl);
    setCurrentIndex(idx);
    console.log(value[idx].imgUrl);
  };

  // const imageModal = ({ src }) => {

  //   return (
  //     <div>

  //     </div>
  //   )
  // };
  const modalStyles = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "1rem",
    borderRadius: "5px",
  };
  return (
    <div className="gal">
      <div className="thumbnail">
        {list.length > 0 &&
          list.map((item, idx) => (
            <img
              className="imgComp"
              key={idx}
              src={list[idx].imgUrl}
              onClick={() => onClick(list, idx)}
              alt="idx"
            ></img>
          ))}
        {modalOpen && (
          <div style={modalStyles}>
            <img src={url} />
            <button onClick={() => setModalOpen(false)}>❌</button>
            <button onClick={handlePrevClick}>◀️</button>
            <button onClick={handleNextClick}>▶️</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Photolist;
