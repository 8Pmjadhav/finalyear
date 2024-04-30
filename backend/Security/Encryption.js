import CryptoJS from 'crypto-js';


// const secretKey = String(process.env.AES_SECURITY_KEY); 
const secretKey = 'secretKey';

  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  };

export default encryptData;