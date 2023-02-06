import React, { useEffect, useState } from "react";
import axios from "axios";

const PhotoItem = () => {
  const [imageList, setImageList] = useState();

  const getImageApi = async () => {
    const res = await axios.get("서버주소");
    setImageList(res.data);
  };

  useEffect(() => {
    getImageApi();
  }, []);

  return <div></div>;
};

export default PhotoItem;
