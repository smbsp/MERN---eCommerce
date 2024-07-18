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

# What is aliasing?
   - In context of nodejs/expressjs API - refers to a technique that is used to simplify the    meaningful name to routes in the end points.

   - It makes easier to understand the end points and shorten the URL as well.

   - http://localhost:3040/api/products?filter={"categories": "electronics"}&page=1&limit=5 => 
     create its aliasing - http://localhost:3040/api/products/bigBillionDay

   - what /bigBillionDay end point want to contain

      - Product whose stock(qty) is less than 10.
      - rating of the product must be > 4.8
