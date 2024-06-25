import React, { useRef, useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { userAuht } from '../context/AuthContextProvider';

function Profile() {
    const { user, handleProfileUpdate } = userAuht();
    const fileInputRef = useRef();

    const handleUploadButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileUpload = async (e) => {
        try {
            const file = e.target.files[0];
            if (file) {
                const imageref = ref(storage, `images/${user?.email}`);
                await uploadBytes(imageref, file);
                const url = await getDownloadURL(imageref);
                await handleProfileUpdate(url);
                window.location.reload();
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className='w-full h-screen'>
            <img className='absolute hidden sm:block w-full h-full object-cover' src="https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY.jpg" alt="netflix overlay" />
            <div className='fixed top-0 left-0 w-full h-full bg-black/80'></div>

            <div className='fixed w-full px-4 py-24 z-50'>
                <div className='max-w-[450px] h-[600px] mx-auto bg-black/95 text-white'>
                    <div className='flex flex-col gap-2 items-center max-w-[320px] mx-auto py-16'>
                        <h1 className='text-3xl font-bold m-2'>Profile</h1>
                        <div className='relative h-32 w-32 border rounded-2xl'>
                            <img className="h-full w-full rounded-2xl object-cover" src={user?.photoURL} alt="profile" />
                        </div>
                        <div className='flex flex-col items-center justify-center mt-5 p-3 w-full'>
                        
                            <p className='text-gray-400 text-sm p-2'>Email: {user?.email}</p>
                        </div>
                        <div className='flex w-full items-center justify-center'>
                            <div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileUpload}
                                />
                                <button
                                    onClick={handleUploadButtonClick}
                                    className='bg-red-100 px-3 py-2 rounded text-black cursor-pointer'
                                >
                                    Upload Profile
                                </button>
                            </div>
                            <button className='bg-red-600 px-3 ml-2 py-2 rounded text-white cursor-pointer'>Reset Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
