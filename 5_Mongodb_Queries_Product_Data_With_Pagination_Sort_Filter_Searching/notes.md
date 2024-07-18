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
    - will cover in next session

# what is query params
     - will cover in next session

