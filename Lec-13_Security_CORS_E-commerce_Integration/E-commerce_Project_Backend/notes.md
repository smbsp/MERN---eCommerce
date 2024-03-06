# Security:

   - To protect your data(specially the sensitive, password, CVV number, Card Number).
   1. Password Encryption.
   
   - Flooding of emails/sms/ making mupliple request (grievance)
   2. Rate limiting

   - To protect your data while making request via API  gateway, then you may require some extra headers information then only you can allow the user to get the relevant information.

   3. Adding extra headers

   - SQL injection: manipulating the data while intercepting the ruest and then modify the data before sending it to DB.
   4. no SQL Injection - sanitizing the input data before persisting into db.


1. Password Encryption:

    - hashing technique (plain text + secrect key + hasing algorithm) can used to protect the password.

    - password: 1234567
     To generate hash code:  https://www.md5hashgenerator.com/

     To decrypt the hash code then use this website: https://10015.io/tools/md5-encrypt-decrypt#google_vignette

    - password has to be stronger, if you are encrypting the password or any sensitive data while using hasing technique.

    - MD5 hashing technique is good one to protect the sensistive information.

    - Bcrypt: Encrption packagee to be used for encrypting the data.

         - use salt - 10-12 (slats determines the complexity of the hashing algorithm)
         - signup and login - password - hashing

    - crypto module: yarn add crypto

         - Secret key - will persist in backend side -> easier for me to encrypt and decrypt the password.
         - AES algo - Advanced Encryption Standard 

2. Rate limiting: A technique to control the requests or actions within the time frame via end user.

   - flooding of emails/sms -> to control it then can be done via adding rate limiting

3. Adding required/extra headers during the request or response - Required for security point of view to deops team gerally for restricting the unauthorised users.

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('x-api-secret-key', 'dsghfvsd123GH');
    next();
});

4. NoSQL injection: 

    - occurs when the untrusted data is handled improperly in NoSQL dbs.
    - because manipulation of the queries can happen in the NoSQL Dbs.

    - we need the sanitisation of data before persisitng into the NoSql DB.

    How to and who santizes the data?

    - mongoose automatically sanitizes and escapes the user data when we persist the data in mongo db.

    - you can encrypt the password or any sensitive information then compare before making a query or persisting the data into mongo db.




Reference: AWS deployment for our REST API - https://docs.aws.amazon.com/apigateway/latest/developerguide/rest-api-develop.html


