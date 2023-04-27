import { Hash } from "crypto";
import React, { useState } from "react";
import cls from "./SupportInfo.module.css";
import EnvHelper from '../../../helpers/EnvHelper';
import RegistrationRequest from "src/models/Auth/RegistrationRequest";
import IUserInfoFromJwt from '../../../models/Auth/IUserInfoFromJwt';
import { useNavigate } from "react-router-dom";
import UrlHelper from '../../../helpers/UrlHelper';

export interface ISupportInfo {
    ShowWallets?: boolean;
}

const SupportInfo: React.FC<ISupportInfo> = (props) => {
    const [btcDisabled, setBtcDisabled] = useState(false);
    const [ethDisabled, setEthDisabled] = useState(false);
    const showCrypto = props.ShowWallets ?? true;
    
    return (
        <span className={[cls.SupportInfoWrapper].join(' ')}>
            <p className={[cls.SupportInfoBlock].join(' ')}>
                Vdb is a completely open-source GPLv3 licenced software.
            </p>
            <p className={[cls.SupportInfoBlock].join(' ')}>
                Since this is still a beta version, all user limits are increased by 5 times, i.e. free user can add 5 devices instead of 1.
            </p>
            <p className={[cls.SupportInfoBlock].join(' ')}>
                Paid servers are not activated yet. For now, you can only support the development of this software by sending cryptocurrency.
            </p>

            {showCrypto
                ? <span className={[cls.SupportInfoBlock].join(' ')} >
                    <span className={[cls.SupportInfoBlock, cls.SupportInfoWallet].join(' ')}>

                        <span>bitcoin: 14G5VJv49weUfQJbEibQYT7vspWHQyXRAF</span>
                    </span>
                    <span className={[cls.SupportInfoBlock, cls.SupportInfoWallet].join(' ')}>

                        <span>ethereum: 0xfaDc0d326a681f1f0813Fcf11d8C918074DF0eE5@1</span>
                    </span>
                </span> : <span />}
            {showCrypto
                ? <span className={[cls.SupportInfoBlock].join(' ')} >
                    { // TODO: Craete component 'QrCodeBlock'. 
                    }
                    <span className={[cls.SupportInfoBlock, cls.SupportInfoWallet].join(' ')}>
                        <button
                            className={[cls.QrHideButton].join(' ')}
                            onClick={() => setBtcDisabled(!btcDisabled)}>
                            {btcDisabled ? "Show QR" : "Hide QR"}</button>
                        <img
                            style={{ width: "100%" }}
                            src={UrlHelper.getHostUrl() + "/images/bitcoin.jpg"}
                            alt="bitcoin:14G5VJv49weUfQJbEibQYT7vspWHQyXRAF"
                            title="bitcoin QR"
                            hidden={btcDisabled} />
                    </span>
                    <span className={[cls.SupportInfoBlock, cls.SupportInfoWallet].join(' ')}>
                        <button
                            className={[cls.QrHideButton].join(' ')}
                            onClick={() => setEthDisabled(!ethDisabled)}>
                            {ethDisabled ? "Show QR" : "Hide QR"}</button>
                        <img
                            style={{ width: "100%" }}
                            src={UrlHelper.getHostUrl() + "/images/ethereum.jpg"}
                            alt="ethereum:0xfaDc0d326a681f1f0813Fcf11d8C918074DF0eE5@1"
                            title="ethereum QR"
                            hidden={ethDisabled} />
                    </span>
                </span> : <span />}
        </span >
    );
}

export default SupportInfo;