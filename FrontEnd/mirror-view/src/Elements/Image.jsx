import { useEffect } from "react";
import styled from "styled-components";

const Image = ( props ) => {
    const { setComp, src } = props;
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setComp('none')
      }, 3000)
    
      return () => {
        clearTimeout(timer);
      }
    }, [])
    

    return (
        <>
          {src ? 
              <PhotoImage1 src={src}/>
          : 
              null
          }
        </>
    )
    
}

const PhotoImage1 = styled.div`
    width: 44rem;
    height: 33rem;
    margin: auto;
    background-image: url("${(props) => props.src}");
    background-size: cover;
    background-position: center;
`

export default Image;