import { Image } from "../../Elements";
import './Photolist.css';

const PhotoItem = (props) => {
    const { created, imgUrl, memberKey, setOpenModal, setOpenPhotoUrl, openPhotoUrl } = props;

    const openPhoto = (e) => {
        e.preventDefault();
        setOpenModal(true);
        setOpenPhotoUrl(imgUrl);
    }
    return (
        <>
          <div className="photo-image-div">
            <Image 
              type="photo" 
              imgUrl={imgUrl} 
              onClick={openPhoto}/>
          </div>
        </>
    )
}

export default PhotoItem;