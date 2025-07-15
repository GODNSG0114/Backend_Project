*** que. What are HTTP header  (HTTP-> hypertext transfer protocol)
ans: header is metadata -> key-value sent along with request and responce
-------------------------------------------------------------------------------------------------------------
*** use of header-> catching , authentication , manage state
*** general type -> 1.request header -> from client
                2.responce header->from server
                3.representation header-> encoding / compression
                4.payload header-> data
-------------------------------------------------------------------------------------------------------------
*** most common headers->
   1. accept : application/json  <!-- tell that which type of data will accept by server-->
   2.user-agent: <!--told which application send request  -->
   3.authorization: <!-- told authorize imformation >
   3.content-type : <!-- told info. about content type ex. video >
   3.cookie : <!-- told cookie info >
   3.cache-control : <!-- told cache info -->
-------------------------------------------------------------------------------------------------------------
*** CORES headers ->
   1.Acces-control-allow -origin
   2.Acces-control-allow -credential
   3.Acces-control-allow -Method
-------------------------------------------------------------------------------------------------------------
*** security headers->
   1.cross-design-embedded-policy
   2.cross-design-opener-policy
   3.cross-design-security-policy
   4.X-XSS-Protection
-------------------------------------------------------------------------------------------------------------
*** HTTP method->

    1. GET    : retrieve a resource
    2. POST   : interact with resource (mostly added)
    3. PUT    : replace a resource
    4. PATCH  : change part of resource
    5. DELETE : remove a resource
    6. HEAD   : No message body (responce headers only)
    7. OPTIONS: what operations are available
    8. TRACE  : loopback test (get same data)
-------------------------------------------------------------------------------------------------------------  
*** HTTP status code (_send by server to user  ) ->
  1xx - information
  2xx - success
  3xx - redirection
  4xx - client error
  5xx - server error
-------------------------------------------------------------------------------------------------------------
***standard status code (not fixed but used ingeneral)
101 - continue
102- processing
200 - ok
201 -created
202 - accepted
307 - temporory redirected
308 -permanent redirected
400 - bad request
401 - unauthorised
402 - payment required
404 - not found
500 - internal server error
504 - gate way time out

-------------------------------------------------------------------------------------------------------------
*** OVERVIEW - HOW HTTP WORK

🧑‍💻 Browser / Client (Front-End)
       |
       |  1️⃣ HTTP Request (GET/POST etc.)
       |  ---------------------------------->
       |
       |      URL: /api/data
       |      Method: GET
       |      Headers: { Authorization, Content-Type }
       |      Body: (optional)
       |
       |
       |                            🌐
       |                         Web Server
       |                         (Back-End)
       |                            |
       |                            |  2️⃣ Server Processes Request
       |                            |     - Validates request
       |                            |     - Fetches data / DB access
       |                            |
       |                            |
       |  3️⃣ HTTP Response
       |  <----------------------------------
       |      Status: 200 OK
       |      Headers: { Content-Type: JSON }
       |      Body: { "data": [...] }
       |
       ▼
🧑‍💻 Client shows result (UI me display hota hai)
-------------------------------------------------------------------------------------------------------------
