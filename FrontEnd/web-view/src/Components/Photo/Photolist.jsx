import React, { useState, useEffect } from "react";
import ReactGridGallery from "react-grid-gallery";
import instance from "../../Redux/modules/instance";
import "./Photolist.css";

const photoApi = {
  getPhoto: (memberKey) =>
    instance.get(`web/snapShot/all?memberKey=${memberKey}`),
};

const Photolist = () => {
  // const [url, setUrl] = useState(null);
  const [memberKey, setMemberKey] = useState("nh3b-494F");
  const [list, setList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [index, setIndex] = useState(-1);
  const [slides, setSlides] = useState([]);
  const handleClick = (item, index) => setIndex(index);
  // const slides = imageList.map(({ src, width, height }) => ({
  //   src,
  //   width,
  //   height,
  // }));
  // console.log("slides: ", slides);
  // console.log(imageList);
  useEffect(() => {
    if (imageList.length > 0) {
      setSlides(
        imageList.map(({ src, width, height }) => ({
          // src: src.split("?")[0],
          src,
          width,
          height,
        }))
      );
    }
  }, [imageList]);

  console.log(list);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await photoApi.getPhoto(memberKey).then((response) => {
          const data = response.data.data;
          setList((prev) => [...prev, ...data]);
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

  const onClick = (value) => {
    console.log(value);
  };

  return (
    <div className="gal">
      <div className="thumbnail">
        {list.length > 0 &&
          list.map((item, idx) => (
            <img
              className="imgComp"
              key={idx}
              src={item.imgUrl}
              onClick={() => onClick(item.imgUrl)}
              alt="idx"
            ></img>
          ))}
      </div>
      {/* <ReactGridGallery
        images={imageList}
        // onClick={handleClick}
        showLightboxThumbs={true}
      /> */}
      {/* <Lightbox
        slides={slides.length > 0 && slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
      /> */}
    </div>
  );
};

export default Photolist;
