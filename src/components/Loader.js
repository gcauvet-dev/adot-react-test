import React, { useEffect, useState } from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';
import SyncLoader from 'react-spinners/SyncLoader';

const ImageLoader = () => (
    <div className='loader'>
        <PropagateLoader size={10} color='#9fe9c5' loading />
    </div>
);

const AppLoader = () => {
    const [displayLoader, setDisplayLoader] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setDisplayLoader(false);
        }, 3000);
    }, []);

    return displayLoader ? (
        <div className='loader'>
            <SyncLoader size={15} color='#9fe9c5' loading />
        </div>
    ) : (
        <p className='no-destination-found'>No destinations found</p>
    );
};

export { ImageLoader, AppLoader };
