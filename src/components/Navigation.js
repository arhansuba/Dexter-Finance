import { useSelector } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import Blockies from 'react-blockies';
import {WalletConnectButton } from '@solana/wallet-adapter-react-ui';
import styles from "../styles/Theme.module.css";
import logo from "../img/logo.png";
import solanaIcon from "../img/solana.png";
import Tabs from "./Tabs";


const Navigation = () => {
  const account = useSelector((state) => state.provider.account);


  const networkHandler = async (e) => {
    console.log("networkHandler", e);
    // Solana'da ağ değişimi işlemleri burada gerçekleştirilir.
    // Örneğin, '@solana/web3.js' kullanarak yapılabilir.
  };

  const currentNetworkIcon = solanaIcon;

  return (
    <Navbar className={styles.customNavbar} expand="lg">
      <Navbar.Brand className="mx-auto navBrand">
        <img
          alt="logo"
          src={logo}
          width="40"
          height="40"
          className={`d-inline-block align-top ${styles.navLogo}`}
        />
      </Navbar.Brand>
      <Tabs />
      <Navbar.Collapse className="justify-content-end">
        <Dropdown onSelect={networkHandler}>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {currentNetworkIcon ? (
              <img
                src={currentNetworkIcon}
                alt="Current Network Icon"
                width="20"
              />
            ) : (
              "Select Network"
            )}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {/* Solana ağ geçiş seçenekleri buraya eklenir */}
          </Dropdown.Menu>
        </Dropdown>
        {account ? (
          <Navbar.Text className={styles.accountInfo}>
            <Blockies
              seed={account}
              size={10}
              scale={3}
              color="#2187D0"
              bgColor="#F1F2F9"
              spotColor="#767F92"
              className="identicon mx-2"
            />
            {account.slice(0, 6) + "..." + account.slice(38, 42)}
          </Navbar.Text>
        ) : (
          <WalletConnectButton className={styles.connectBtn} />
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
