//Impors the Node.js built-in crypto module for cryptographic operations.
const crypto = require("crypto");

// Generates a random initialization vector (IV) of 16 bytes for AES encryption.
const iv = Buffer.from(process.env.AES_IV, 'hex');
// Generates a random encryption key of 32 bytes (256 bits) for AES encryption.
const key = Buffer.from(process.env.AES_KEY, 'hex');

const encryptPassword = (plainPassword) => {
  //Creates a Cipher object for AES-256-CBC encryption using the generated key and IV.
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  // Encrypts the plain password using AES-256-CBC encryption and returns the encrypted password as a hexadecimal string.
  const encryptedPassword = Buffer.concat([cipher.update(plainPassword, "utf-8"), cipher.final()]).toString("hex");
  return encryptedPassword;
};

const decryptPassword = (encryptedPassword) => {
  //Creates a Decipher object for AES-256-CBC decryption using the generated key and IV.
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
  //Decrypts the encrypted password using AES-256-CBC decryption and returns the decrypted password as a UTF-8 encoded string.
  const decryptedPassword = Buffer.concat([decipher.update(Buffer.from(encryptedPassword, "hex")), decipher.final()]).toString("utf-8");
  return decryptedPassword;
};

module.exports = { encryptPassword, decryptPassword };