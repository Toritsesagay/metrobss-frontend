import React, { useState, useEffect } from 'react';
import styles from './EmailVerify.module.css';
import { checkverification } from "../store/action/userAppStorage";
import { useDispatch } from "react-redux";
// importing modals
import LoadingModal from "../components/Modal/LoadingModal";
import Modal from "../components/Modal/Modal";
// importing routers
import { useNavigate, useSearchParams } from 'react-router-dom';
import SubmitBtn from "../components/Submit";

function EmailVerify() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isErrorInfo, setIsErrorInfo] = useState('');
    const [isSignout, setIsSignout] = useState(false);
    const [preloader, setPreloader] = useState(true);

    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");   // 👈 now we grab email from query params

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const closeModal = () => {
        setIsError(false);
        setIsSignout(false);
    };

    useEffect(() => {
        if (!email) {
            navigate('/signup');
        }
    }, [email, navigate]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPreloader(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const continueHandler = async () => {
        if (!email) return;
        const res = await dispatch(checkverification(email));
        if (!res.bool) {
            console.log(res);
            return;
        }
        // navigate to phone number setup or next step
        // navigate('/phone-setup');
    };

    useEffect(() => {
        const interval = setInterval(continueHandler, 1000);
        return () => clearInterval(interval);
    }, [email]);

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
                        We sent a verification email to <span>{email}</span>. Click the link inside to get started!
                    </p>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        submitHandler();
                    }}>
                        <SubmitBtn 
                            text="Email didn't arrive?" 
                            style={{ borderRadius: '8px', marginBottom: '15px', marginTop: '15px' }} 
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

export default EmailVerify;
