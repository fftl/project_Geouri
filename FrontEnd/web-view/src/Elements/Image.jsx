import React from "react";
import './Image.css';
import AddIcon from '@mui/icons-material/Add';

function Image(props){
    const { onClick, src, type, imgUrl } = props;
    
    if (type === 'member') {
        return (
            <div 
                className="member-image"
                onClick={onClick}>
                    <img src={src}/>
                </div>
        )  
    }
    if (type === 'add_member') {
        return (
            <div 
                className="add-member-image"
                onClick={onClick}>
                <AddIcon style={{fontSize:"2rem"}}/>
            </div>
        )
    }
}

export default Image;