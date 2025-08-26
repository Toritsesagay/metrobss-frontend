import React, { useState, useEffect } from 'react';
import styles from './EmailVerify.module.css';
import { checkverification } from "../store/action/userAppStorage";
import { useDispatch } from "react-redux";
import LoadingModal from "../components/Modal/LoadingModal";
import Modal from "../components/Modal/Modal";
import { useNavigate, useParams } from 'react-router-dom';
import SubmitBtn from "../components/Submit";

function EmailVerify() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isErrorInfo, setIsErrorInfo] = useState('');
    const [isSignout, setIsSignout] = useState(false);
    const [preloader, setPreloader] = useState(true);

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Close modal handler
    const closeModal = () => {
        setIsError(false);
        setIsSignout(false);
    };

    // Redirect if no ID in params
    useEffect(() => {
        if (!id) {
            navigate('/signup');
        }
    }, [id, navigate]);

    // Preloader timeout
    useEffect(() => {
        const timer = setTimeout(() => {
            setPreloader(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    // Email verification checker
    const continueHandler = async () => {
        try {
            setIsLoading(true);
            const res = await dispatch(checkverification(id));
            setIsLoading(false);

            if (!res?.bool) {
                console.log("Verification failed:", res);
                return;
            }

            // On successful verification
            navigate('/next-step'); // Change this to your actual next route
        } catch (err) {
            console.error("Verification error:", err);
            setIsLoading(false);
            setIsError(true);
            setIsErrorInfo("Something went wrong verifying your email.");
        }
    };

    // Polling effect
    useEffect(() => {
        const interval = setInterval(() => {
            continueHandler();
        }, 1000);

        return () => clearInterval(interval);
    }, []); // Only run once

    const submitHandler = () => {
        navigate('/signup');
    };

    return (
        <>
            {isLoading && <LoadingModal />}
            {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}

            <div className={styles.screenContainer}>
                <div className={styles.innerContainer}>
                    <h1 className={styles.verifyHead}>Verify your email</h1>
                    <p className={styles.verifyParagraph}>
                        We sent a verification email to <span>{id}</span>. Click the link inside to get started!
                    </p>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        submitHandler();
                    }}>
                        <SubmitBtn
                            text='Email didn’t arrive?'
                            style={{ borderRadius: '8px', marginBottom: '15px', marginTop: '15px' }}
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

export default EmailVerify;
