import CryptoJS from 'crypto-js';
import secret from '../secret';

const { ENCRYPT_KEY } = secret();

const encrypt = (dataToStorage) => {
  return CryptoJS.AES.encrypt(JSON.stringify(dataToStorage), ENCRYPT_KEY);
};

const decrypt = (dataFromStorage) => {
  const bytes = CryptoJS.AES.decrypt(dataFromStorage, ENCRYPT_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const storageHelper = {
  get: (key) => {
    try {
      return decrypt(localStorage.getItem(key));
    } catch (e) {
      return undefined;
    }
  },
  set: (key, value) => {
    localStorage.setItem(key, encrypt(value));
  },
  clear: (key) => {
    localStorage.removeItem(key);
  },
};

export default storageHelper;
