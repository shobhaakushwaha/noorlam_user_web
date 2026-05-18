import React from 'react';
import './Modal.scss';
import { RxCross2 } from "react-icons/rx";
import { Input } from '@/component/form';
import { RoundedMagnifer } from '@/assets/icons';
import Image from 'next/image';

const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
                <button className="floating-close-btn" onClick={onClose}>
                    <RxCross2 />
                </button>
                <div className="modal-content">
                    <div className="modal-header">
                        <button className="back-btn">
                            <Image src={RoundedMagnifer} width={24} height={24} alt="icons"></Image>
                        </button>
                        <Input type="text" placeholder="Search your delivery address" autoFocus />
                    </div>
                    <div className="modal-divider"></div>
                    <div className="modal-current-location">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="5" stroke="#0F3D2E" strokeWidth="2" />
                            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="#0F3D2E" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span>Use current location</span>
                    </div>
                    <div className="modal-footer">
                        <span className="powered-text">powered by </span>
                        <span className="g-blue">G</span>
                        <span className="g-red">o</span>
                        <span className="g-yellow">o</span>
                        <span className="g-blue">g</span>
                        <span className="g-green">l</span>
                        <span className="g-red">e</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
