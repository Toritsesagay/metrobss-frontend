import React, { useState } from 'react';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { 
  MdArrowBack, 
  MdNotifications, 
  MdMenu, 
  MdHome, 
  MdPerson, 
  MdAccountBalanceWallet, 
  MdPayment, 
  MdSend, 
  MdCreditCard, 
  MdAccountBalance, 
  MdHistory, 
  MdSettings, 
  MdLogout 
} from "react-icons/md"; // ✅ React Icons

function Header({ home, title }) {
    const [isShowMenu, setIsShowMenu] = useState(false);

    const menuHandler = () => {
        setIsShowMenu(prev => !prev)
    }

    const navigate = useNavigate();

    const navigateBack = () => {
        navigate(-1)
    }

    const navigateHandler = (data) => {
        navigate(`/${data}`)
    }

    const notificationHandler = () => {
        navigate('/notifications')
    }

    return (
        <div className={styles.header}>
            <div className={styles.innerheader}>
                <div className={styles.innerheaderleft}>
                    {!home && (
                        <MdArrowBack 
                            className={styles.icon} 
                            onClick={navigateBack} 
                            size={24} 
                        />
                    )}
                    <h2>{title}</h2>
                </div>

                <div className={styles.innerheaderright}>
                    <div className={styles.innerheaderrightbutton}>
                        <div className={styles.deposit} onClick={() => navigateHandler('deposit')}>
                            Deposit
                        </div>
                    </div>

                    {home && (
                        <div className={styles.notification}>
                            <MdNotifications 
                                className={styles.icon} 
                                onClick={notificationHandler} 
                                size={32} 
                            />
                        </div>
                    )}

                    {home && (
                        <MdMenu 
                            className={`${styles.hamburger} ${styles.icon}`} 
                            onClick={menuHandler} 
                            size={30} 
                        />
                    )}
                </div>
            </div>

            <ul className={`${styles.mobilemenu} ${isShowMenu ? styles.showmenu : ''}`}>
                <li className={styles.item} onClick={() => navigateHandler('dashboard')}>
                  <MdHome size={20} className={styles.icon} /> Home
                </li>
                <li className={styles.item} onClick={() => navigateHandler('profile')}>
                  <MdPerson size={20} className={styles.icon} /> Profile
                </li>
                <li className={styles.item} onClick={() => navigateHandler('deposit')}>
                  <MdAccountBalanceWallet size={20} className={styles.icon} /> Deposit
                </li>
                <li className={styles.item} onClick={() => navigateHandler('withdraw')}>
                  <MdPayment size={20} className={styles.icon} /> Bill Pay
                </li>
                <li className={styles.item} onClick={() => navigateHandler('transfer')}>
                  <MdSend size={20} className={styles.icon} /> Transfer
                </li>
                <li className={styles.item} onClick={() => navigateHandler('card')}>
                  <MdCreditCard size={20} className={styles.icon} /> Card
                </li>
                <li className={styles.item} onClick={() => navigateHandler('loan')}>
                  <MdAccountBalance size={20} className={styles.icon} /> Loan
                </li>
                <li className={styles.item} onClick={() => navigateHandler('transaction-history')}>
                  <MdHistory size={20} className={styles.icon} /> History
                </li>
                <li className={styles.item} onClick={() => navigateHandler('settings')}>
                  <MdSettings size={20} className={styles.icon} /> Settings
                </li>
               
            </ul>
        </div>
    );
}

export default Header;

