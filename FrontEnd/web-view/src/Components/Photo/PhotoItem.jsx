import React, { useEffect, useState } from "react";
import axios from "axios";

const PhotoItem = () => {
  const [imageList, setImageList] = useState();
  const [clickedImage, setClickedImage] = useState({
    item: "",
    convertedCode: "",
  });

  const onClickImage = (item) => {
    let convertedCode = Buffer.from(item, "base64");
    setClickedImage({ item: item, convertedCode: convertedCode });
  };

  const getImageApi = async () => {
    const res = await axios.get("서버주소");
    setImageList(res.data);
  };

  useEffect(() => {
    getImageApi();
  }, []);

  <div>
    {imageList &&
      imageList.map((item, idx) => {
        return (
          <img
            key={`image-${idx}`}
            style={{
              maxWidth: "100%",
              height: "auto",
              filter:
                clickedImage.item === item
                  ? "grayscale(0%)"
                  : "grayscale(100%)",
            }}
            src={`data:image/;base64,${item}`}
            alt={`image-${idx}`}
            onClick={onClickImage(item)}
          />
        );
      })}
  </div>;
};

export default PhotoItem;
