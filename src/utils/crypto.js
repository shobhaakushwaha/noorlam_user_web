import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
const SECRET_IV = process.env.NEXT_PUBLIC_ENCRYPTION_IV;

/**
 * Convert string to WordArray using UTF-8
 */
const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
const iv = CryptoJS.enc.Utf8.parse(SECRET_IV);

/**
 * Encrypt Data using AES-256-CBC
 */
export const encryptData = (data) => {
    try {
        const jsonString = JSON.stringify(data);

        const encrypted = CryptoJS.AES.encrypt(
            CryptoJS.enc.Utf8.parse(jsonString),
            key,
            {
                keySize: 256 / 32,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            }
        );

        return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    } catch (error) {
        console.error("Encryption Error:", error);
        return null;
    }
};

/**
 * Decrypt Data using AES-256-CBC
 */
// export const decryptData = (cipherText) => {
//     try {
//         const decrypted = CryptoJS.AES.decrypt(
//             { ciphertext: CryptoJS.enc.Base64.parse(cipherText) },
//             key,
//             {
//                 keySize: 256 / 32,
//                 iv: iv,
//                 mode: CryptoJS.mode.CBC,
//                 padding: CryptoJS.pad.Pkcs7,
//             }
//         );

//         const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
//         return decryptedText ? JSON?.parse(decryptedText) : null;
//     } catch (error) {
//         console.error("Decryption Error:", error);
//         return null;
//     }
// };

export const decryptData = (cipherText) => {
  try {
    if (!cipherText || typeof cipherText !== "string") {
      return null;
    }

    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: CryptoJS.enc.Base64.parse(cipherText) },
      key,
      {
        keySize: 256 / 32,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

    // 🔥 Important validation
    if (!decryptedText) return null;

    try {
      return JSON.parse(decryptedText);
    } catch (parseError) {
      console.warn("Invalid JSON after decrypt");
      return null;
    }

  } catch (error) {
    return null;
  }
};
