const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();

// const { SECRET_KEY } = process.env;

const encryptPassword = (password) => {

    // Initializing the key
    const key = crypto.randomBytes(32);

    // Initializing the iv vector
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    // let encryptedPwd = cipher.update(password, 'utf-8', 'hex');

    let encrypted = cipher.update(password);

    encrypted = Buffer.concat([encrypted, cipher.final()]);
    //encryptedPwd+=cipher.final('hex');

    console.log(encrypted);

    // Returning iv and the encrypted data
    return encrypted.toString('hex');

}

const decryptPassword = (encryptedPassword) => {
    //  const decipher = crypto.createDecipheriv('aes-192', SECRET_KEY);
    //  let decryptedPwd = decipher.update(encryptedPassword, 'utf-8', 'hex');

    console.log(encryptedPassword);

    // Initializing the key
    const key = crypto.randomBytes(32);

    // Initializing the iv vector
    let iv = crypto.randomBytes(16);
    //  decryptedPwd+=decipher.final('utf-8');

     let ivHex = Buffer.from(iv, 'hex');
     let encryptedText =Buffer.from(encryptedPassword, 'hex');

    // Creating the decipher from algo, key and iv
    let decipher = crypto.createDecipheriv(
    'aes-256-cbc', Buffer.from(key), ivHex);

    // Updating decrypted text
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    console.log(decrypted);

// returning response data after decryption
return decrypted.toString();

}

module.exports = {
    encryptPassword,
    decryptPassword
}