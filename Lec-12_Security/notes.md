# Security:

   - To protect your data(specially the sensitive, password, CVV number, Card Number).
   1. Password Encryption.
   
   - Flooding of emails/sms/ making mupliple request (grievance)
   2. Rate limiting

   - To protect your data while making request via API    gateway, then you may require some extra headers information then only you can allow the user to get the relevant information.

   3. Adding extra headers

   - SQL injection: manipulating the data while intercepting the ruest and then modify the data before sending it to DB.
   4. no SQL Injection - sanitizing the input data before persisting into db.


1. Password Encryption:

    - hashing technique (plain text + secrect key + hasing algorithm) can used to protect the password.

    - password: 1234567
     To generate hash code:  https://www.md5hashgenerator.com/

     To decrypt the hash code then use this website: https://10015.io/tools/md5-encrypt-decrypt#google_vignette

    - password has to be stronger, if you are encrypting the password or any sensitive data while using hasing technique.

    - MD5 hashing technique is good one to protectthe sensistive information.

    - Bcrypt: Encrption packagee to be used for encrypting the data.




Reference: AWS deployment for our REST API - https://docs.aws.amazon.com/apigateway/latest/developerguide/rest-api-develop.html


