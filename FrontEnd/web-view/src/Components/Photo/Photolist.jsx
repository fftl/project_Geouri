import React, { useState, useEffect } from "react";
import { Gallery } from "react-grid-gallery";
import instance from "../../Redux/modules/instance";
import "./Photolist.css";
import Lightbox from "yet-another-react-lightbox";

const photoApi = {
  getPhoto: (memberKey) =>
    instance.get(`web/snapShot/all?memberKey=${memberKey}`),
};

const Photolist = () => {
  const [url, setUrl] = useState(null);
  const [memberKey, setMemberKey] = useState("nh3b-494F");
  const [list, setList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [index, setIndex] = useState(-1);
  const handleClick = (index, item) => setIndex(index);
  const slides = list.map((image) => ({
    src: image.imgUrl,
  }));

  useEffect(() => {
    console.log(imageList);
    const fetchData = async () => {
      try {
        await photoApi.getPhoto(memberKey).then((response) => {
          const data = response.data.data;
          setList((prev) => [...prev, ...data]);
          setImageList(
            list.map((image) => {
              return {
                src: image.imgUrl,
              };
            })
          );
        });
      } catch (error) {
        console.error(error);
        setUrl(null);
      }
    };
    fetchData();
    // console.log(list);
  }, []);

  return (
    <div className="gal">
      <Gallery images={imageList} onClick={handleClick} />
      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
      />
    </div>
  );
};

export default Photolist;
