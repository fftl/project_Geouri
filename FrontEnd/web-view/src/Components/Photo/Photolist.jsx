import React, { useState, useEffect } from "react";
import { Gallery } from "react-grid-gallery";
import axios from "axios";

const Photolist = () => {
  const [url, setUrl] = useState(null);
  const [userKey, setUserKey] = useState("some_user_key");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("your_api_endpoint", {
          params: {
            userKey: userKey,
          },
        });

        const data = response.data;
        setUrl(data.url);
      } catch (error) {
        console.error(error);
        setUrl(null);
      }
    };

    fetchData();
  }, [userKey]);

  const imageList = JSON.stringify(url);

  // const imageData = [{}];

  const images = imageList.map((image) => {
    return {
      src: image.src,
      thumbnail: image.thumbnail,
      thumbnailWidth: image.thumbnailWidth,
      thumbnailHeight: image.thumbnailHeight,
    };
  });

  return (
    <div>
      <Gallery images={imageList} />
    </div>
  );
};

export default Photolist;
