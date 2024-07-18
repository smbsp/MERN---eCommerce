# what is RESTful API?
A REST API (Representational State Transfer API) is a type of API (Application Programming Interface) that adheres to the principles of REST architectural style and allows for interaction with RESTful web services. REST is a set of architectural constraints, not a protocol or a standard. API developers can implement REST in a variety of ways.

Here's what makes an API "RESTful":

a) Statelessness: Each HTTP request from the client to server must contain all the information needed to understand the request, and cannot take advantage of any stored context on the server. Session state is therefore kept entirely on the client.

b) Client-Server Architecture: The client and the server should be independent of each other, allowing either to be replaced and updated without affecting the other, as long as the interface is not altered.

c) Cacheable: Clients can cache responses to improve performance. Responses must, therefore, explicitly state whether they are cacheable.

d) Layered System: A client cannot ordinarily tell whether it is connected directly to the end server or to an intermediary along the way.

e) Uniform Interface: The method of communication between client and server must be uniform, which simplifies and decouples the architecture, allowing each part to evolve independently.

f) Code on Demand (optional): Servers can provide executable code or scripts for clients to execute in their context. This is the only optional constraint of REST.

A "normal API" or "non-RESTful API" might not adhere to these principles. For example, SOAP (Simple Object Access Protocol) APIs, XML-RPC, and JSON-RPC are not RESTful as they do not meet all the REST constraints. They can be based on stateful communication, use their own set of standards for message formats and session management, and usually revolve around actions (like getUserData) instead of resources.

In contrast, RESTful APIs typically operate over HTTP and use HTTP verbs (GET, POST, PUT, DELETE, etc.) for CRUD (Create, Read, Update, Delete) operations, with endpoints (URIs) representing the data objects. Data formats such as JSON or XML are used to send and receive the content.

RESTful APIs are generally preferred for web services due to their simplicity, scalability, and performance benefits.

# What is routes in expressJS?

   - In Express.js, routes are used to define the endpoints at which requests can be made, along with the HTTP methods that those endpoints will respond to. Essentially, a route is a combination of a URI (Uniform Resource Identifier), an HTTP method (like GET, POST, PUT, DELETE, etc.), and a set of associated handlers that should be executed when the route is matched.

# what is mongodb?
   - it's NoSQL DBMS, that stores the data in flexible way, JSON-like documents, high performance database and very scalabale.
   - Refer the notes
   

# What is moongoose?
   - moongoose - driver - https://mongoosejs.com/