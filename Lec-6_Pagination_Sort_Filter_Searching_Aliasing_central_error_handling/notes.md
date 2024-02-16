# what is MVC?

   - MVC stands Model View Controller
   1. Model (Mongoose): Respresnts the data structure and logic of the application.
   2. View: represents the UI(User Interface). (Client side code -> React)
   3. Controller: Flowing the data b/e model and view.

# What problems faced in MVC archiyecture?
  - Code Duplicacy (Controller code is repeating) 

# What is factory DP?

   - Factory is a DP that provides you a centralised factory functions 
     to generate the instances of mongoose Models/Controllers.
   - Benefits of Factory DP:

      1. Ecapsulation.
      2. Consistency.
      3. Felexibility.
      4. Testability.

# Hooks in mongoose?

   Intuition:
   - Now there are some situations where you want to run some validation before saving the data into the database liking process of saving data, logging

   - pre-hooks: built-in hooks which are provided by the mongoose
      1. Data validation and sanitization.
      2. password hashing.
      3. setting the default values.
      4. Timestamping 
      5. Logging

   - post-hooks: built-in hooks which are provided by the mongoose
      1. logging
      2. Data analysis and aggregation

# What is mongodb queries?
   - Operations performed to retrieve, manipulate or analyse the data in a mongodb database.
   - These queries helps you to filter out the data in the mongodb at db level.
   - mongodb queries link: https://www.mongodb.com/docs/manual/reference/operator/query/
   - eg: "price":{"$gt": 20000} -> can directly apply at db level

# what is query params?
     - In URL everthing after the question mark are known as query params?
     - eg:localhost:3040/api/products?filter=asc sort&select=price stock 
     - These query params are useful for filtering out the data.
     - query params example from flipcart: https://www.flipkart.com/mens-tshirts/pr?sid=clo%2Cash%2Cank%2Cedy&fm=neo%2Fmerchandising&iid=M_1a619aed-0feb-4104-a9fd-0e851bbeefc3_1_372UD5BXDFYS_MC.IF56C41VGEYS&otracker=hp_rich_navigation_2_1.navigationCard.RICH_NAVIGATION_Fashion%7EMen%2527s%2BTop%2BWear%7EMen%2527s%2BT-Shirts_IF56C41VGEYS&otracker1=hp_rich_navigation_PINNED_neo%2Fmerchandising_NA_NAV_EXPANDABLE_navigationCard_cc_2_L2_view-all&cid=IF56C41VGEYS&p%5B%5D=facets.brand%255B%255D%3DPUMA&p%5B%5D=facets.discount_range_v1%255B%255D%3D50%2525%2Bor%2Bmore&page=2

# what is sorting, pagination, searching and filtering?
    Sorting: To sort the data either in asc or desc order.
    Pagination: Create the number of pages for getting the limited. (limit and skip)
    Searching: To search the data.
    Filtering: To filter out the data at more granular level.

# Sorting Impl:
   postman: localhost:3040/api/products?sort=asc&select=price stock&myQuery=categories

# How to encode the url:
     - https://www.urlencoder.org/
     - eg: just take after ? and convert into encode URL.
     - also know as percent-encoding is a method used to encode the information.
     - generally encoded URL contains % follwed by hexadecimal that covert into ASCII code

# pagination Impl:
    - https://www.flipkart.com/mens-tshirts/pr?sid=clo%2Cash%2Cank%2Cedy&fm=neo%2Fmerchandising&iid=M_1a619aed-0feb-4104-a9fd-0e851bbeefc3_1_372UD5BXDFYS_MC.IF56C41VGEYS&otracker=hp_rich_navigation_2_1.navigationCard.RICH_NAVIGATION_Fashion~Men%2527s%2BTop%2BWear~Men%2527s%2BT-Shirts_IF56C41VGEYS&otracker1=hp_rich_navigation_PINNED_neo%2Fmerchandising_NA_NAV_EXPANDABLE_navigationCard_cc_2_L2_view-all&cid=IF56C41VGEYS&p%5B%5D=facets.discount_range_v1%255B%255D%3D50%2525%2Bor%2Bmore&p%5B%5D=facets.brand%255B%255D%3DPUMA&p%5B%5D=facets.ideal_for%255B%255D%3DMen&p%5B%5D=facets.fabric%255B%255D%3DCotton%2BBlend&page=2&limit=20

# central error handling:

   - Instead of catch block that returns the 500 as internal server error in the code,that we can centralised that error.
   - postman url - localhost:3040/api/products/65cc2a290d406cc7fa1807bc -> will get the json       resposne on postman as 
   {
    "status": 404,
    "message": "Data not found"
   }

   or id any code issue will be there

   {
    "status": 500,
    "message": "Internal Server Error"
   }


