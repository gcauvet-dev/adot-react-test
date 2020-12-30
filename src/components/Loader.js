import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';
import SyncLoader from 'react-spinners/SyncLoader';

const ImageLoader = () => (
    <div className='loader'>
        <PropagateLoader size={10} color='#9fe9c5' loading />
    </div>
);

const AppLoader = () => (
    <div className='loader'>
        <SyncLoader size={15} color='#9fe9c5' loading />
    </div>
);

export { ImageLoader, AppLoader };
