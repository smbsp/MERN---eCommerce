/**
 *  web apps/mobile apps - client-side development + server-side development + database(where you can persist the data).
 * 
 *   client side development: HTML+CSS+JS/ReactJS&Redux
 *   server-side development: NodeJS (with expressJS framework), Java(with JEE and Spring framework), c#(with ASP, .net framework), python(with DJANGO or FLASK framework)
 *   (backend/server-side developer responsibilities came into the picture) -> They manages the user authentication & authorisation, bussiness logic, data processing, and 
 *     database interactions and able to handle the security to the data, API design/implementation(REST end points), Learn backend Design Patterns.
 * 
 * 
 *   What is nodeJS and what does it provide?
 *   
 *     -> NodeJS: 
 *           - It's an open-source, cross-platform runtime environment that 
 *             allows you to execute the JS code on the server. 
 *           - Rayn Dahl cretaed it and first released in 2009.
 * 
 *     -> Why do you need NodeJS for the web server?
 *           1. JS everywhere: Nodejs devs are also going to use JS for writing the code for web server.
 *           2. Non-blocking I/O Model: it is designed around non-blocking, event-driven architecture.
 *           3. Rich Ecosystem: it has vast ecosystem of libraries and built-in modules and can be available to the dev via npm.
 *           4. Community Support: we have a very active community of nodeJS developers.
 *           5. Fast Execution: NodeJS is built on v8 JS Engine which compiles the JS code into Machine code fastly.
 * 
 *     -> browser vs nodeJS environment:
 * 
 *          Browser:
 *           1. client-side env.
 *           2. JS code excutes within the browser.
 *           3. used for frontend development.
 *           4. Allows to manipulation of DOM for the web page interaction and perfoms async operations.
 *    
 *          NodeJS: 
 *           1. server-side env.
 *           2. JS code executes on the server. 
 *           3. used for sever-side development.
 *           4. Allows you to design REST API, retrieving the data from the DB, handling Security.
 * 
 *      NodeJS installation:
 *  
 *        1. Download and install - https://nodejs.org/en
 *        2. check the version of nodeJS - node -v and npm -v , yarn -v
 *        3. to install axios libray(any external libraries) - npm i axios/ yarn add axios
 * 
 *     Purpose of npm(node package manager) - helps you install the libraries or built-in modules.
 * 
 *    What are nodeJS modules?
 *      - NodeJS comes with the built-in modules that provides the essentional functionalities for the varios tasks:
 *        1. fs module: Hanlding the files or reading/writing the content from the files.
 *        2. path module: Handling the directory path or the files path.
 *        3. http module: Provides the functionality for creating th web server 
 *            and make the HTTP request and send the response to client machine.
 *        4. ws module: Fow handling web socket based some real time application (online gamings and chat apps).
 *                 
 */