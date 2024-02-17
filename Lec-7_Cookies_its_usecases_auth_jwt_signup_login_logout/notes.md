# static vs dynamic websites?
 - static websites give you the same user experience.
 - dynamic websites give the tailored user experience 

# what is cookie?

  - cookie is a client-side store which is available on every web browser
  - To persist the data as res+cookie, we use server side httpOnly cookie.
  - hhttpOnly cookie can't be tempered.
  - It stores the data at client side and the cookies will use `key: value` pairs to store the data.

  - What cookies can do?
     - Remembering the login information.
     - Store the user preferences.
     - Maintain the user session.
     - track the user behavior.

  - Accessing the cookies at server side via middleware them cookie-parser is required.
    install the cookie-paser: npm i cookie-parser or yarn add cookie-parser

- Identification, Authentication and Authorisation:

    Identification: A process of stating or claiming who you are?
      - username, email id -> user preferences is solved.

    Authentication: a processs of verifiying the claiming identity.
     - login, otp, biometric
     - web tokens -> if that web token is secured

    Authorisation: A process of checking or determining the necessary permissions for accessing.
    

- JWT (JSON Web Token):

   - please refer the notes.
   - To implement the JWT, we need a libray -> we require 'jsonwebtoken'
   - Need to install it npm i jsonwebtoken or yarn add jsonwebtoken