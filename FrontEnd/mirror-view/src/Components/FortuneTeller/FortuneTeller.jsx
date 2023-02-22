import './FortuneTeller.css';
import React from 'react';
import { useSelector } from 'react-redux';

const FortuneTeller = () => {
    const fortune = useSelector((state) => state?.mirror?.member?.fortune);
    return(
        <div className='fortune-teller'>
            <p className='fortune-p'>{fortune}</p>
        </div>
    )
}

export default FortuneTeller;