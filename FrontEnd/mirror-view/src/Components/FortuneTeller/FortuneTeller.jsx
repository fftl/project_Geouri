import './FortuneTeller.css';
import React from 'react';
import { useSelector } from 'react-redux';

const FortuneTeller = () => {
    const fortune = '이 고비를 잘 넘겨야 합니다.'
    // const fortune = useSelector((state) => state?.mirror?.member?.fortune);
    return(
        <div className='fortune-teller'>
            <p className='fortune-p'>{fortune}</p>
        </div>
    )
}

export default FortuneTeller;