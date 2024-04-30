import CryptoJS from 'crypto-js';

// const secretKey = String(process.env.AES_SECURITY_KEY); 
const secretKey = 'secretKey';

const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  console.log(bytes.toString(CryptoJS.enc.Utf8));
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export default decryptData;