import cl from "./VdbWelcome.module.css";
import { NavLink } from "react-router-dom";
import GlobalContext from '../../helpers/GlobalContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useState, useEffect } from 'react';
import VdbActiveNodes from "../VdbActiveNodes/VdbActiveNodes";



const VdbWelcome: React.FC = () => {
    const [fastTransSt, setFastTransSt] = useState(false);
    const [secureTransSt, setSecureTransSt] = useState(false);
    const [sourceTransSt, setSourceTransSt] = useState(false);
    const [descrTransSt, setDescrTransSt] = useState(false);
    const [othersTransSt, setOthersTransSt] = useState(false);

    useEffect(() => {
        setTimeout(() => setFastTransSt(true), 0);
        setTimeout(() => setSecureTransSt(true), 200);
        setTimeout(() => setSourceTransSt(true), 400);
        setTimeout(() => setDescrTransSt(true), 600);
        setTimeout(() => setOthersTransSt(true), 800);
    }, []);

    const transitionClasses = {
        enterActive: cl.welcomeTransitionEnter,
        enterDone: cl.welcomeTransitionEnterActive,
        exitActive: cl.welcomeTransitionExit,
        exitDone: cl.welcomeTransitionExitActive,
    }

    const commonTransProp = {
        timeout: 300,
        classNames: transitionClasses
    }


    return (
        <span className={cl.welcomeWrapper}>
            <span className={cl.welcomeRow}>
                <strong>
                    <span className={cl.welcomWords}>
                        <CSSTransition in={fastTransSt} {...commonTransProp}>
                            <span className={cl.welcomeWord}>
                                Fast.
                            </span >
                        </CSSTransition>
                        <CSSTransition in={secureTransSt} {...commonTransProp}>
                            <span className={cl.welcomeWord}>
                                Secure.
                            </span>
                        </CSSTransition>
                        <CSSTransition in={sourceTransSt} {...commonTransProp}>
                            <span className={cl.welcomeWord}>
                                Open-source.
                            </span>
                        </CSSTransition>
                    </span>
                </strong>
                <span className={cl.welcomeDescription}>
                    <span className={cl.welcomWords}>
                        <CSSTransition in={descrTransSt} {...commonTransProp}>
                            <span className={cl.welcomeDecriptionPhrase}>
                                Our servers provide up to 10 Gbit/s channel.
                            </span >
                        </CSSTransition>
                        <CSSTransition in={descrTransSt} {...commonTransProp}>
                            <span className={cl.welcomeDecriptionPhrase}>
                                We are using TLSv1.3 for every of your connection
                                to the API. All your VPN traffic is encrypted with
                                modern 'ChaCha20' protocol.
                            </span>
                        </CSSTransition>
                        <CSSTransition in={descrTransSt} {...commonTransProp}>
                            <span className={cl.welcomeDecriptionPhrase}>
                                Additional goal is you to know which code you are running.
                                All sources are public.
                            </span>
                        </CSSTransition>
                    </span>
                </span>
            </span>
            <CSSTransition in={othersTransSt} {...commonTransProp}>
                <span className={cl.currentStatusPhrase}>
                    Current status:
                </span>
            </CSSTransition>
            <CSSTransition in={othersTransSt} {...commonTransProp}>
                <span className={cl.nodesList}>
                    <VdbActiveNodes />
                </span>
            </CSSTransition>
        </span>
    );
}

export default VdbWelcome;