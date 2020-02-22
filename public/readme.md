Object Oriented Programming (OOP) is a programming design methodology build around the concept of "objects."  Data and functions are bundled together into objects to often represent real-world entities.  These objects are based off of classes, which are the abstract representation of the object in the same way that a the concept of "human" is the abstract representation of an actual person.

OOP is beneficial from a number of different angles.  It enables code reusability, such that a class can be instantiated numerous times without rebuilding the object's associated data and methods.  OOP offers abstracion such that an object's user doesn't need a deep understanding of the object's anatomy to make effective use of it.  It offers modularity that decouples different aspects of a program and simplifies development.  And it provides ease of maintenance as objects are maintained separately.

An example of an OOP application is a video rental service.  Customers can sign up, check and return videos of different genres.  Admins can add, modify and delete genres and movies. OOP allows these different elements to be easily managed in a DB and for CRUD operations to impact specific objects. The application could contain the following objects--

- User - Properties: name, phone, email, password. Relationships: sign-in sessions (1:N), rental sessions (1:N)
- Sign-in session - Properties: timestamp, browsing activity. Relationships: user (N:1)
- Genre - Properties: name, popularity rank.  Relationships: movies (1:N)
- Movie - Properties: name, runtime, price, details, cast. Relationships: genre (1:1), rental session (1:N)
- Rental session - Properties: check-out time, check-in time. Relationships: user (N:1), movie (1:1)

The CRUD operations on the different objects may be as follows--

CREATE
- User - user signs up with name, phone, email, and password
- Rental session - user checks out a movie with time checked out, movie price, movie genre, and user information like cc information and address
- Sign-on session - user signs in with email and password
- Genre - admin can add new genres to the application.  Genres contain all associated movies either normalized (referenced) or not normalized (embedded)

READ
- Movie - user can view a single movie containing title, genre, cast, runtime, rating
- Genre - user can browse set of all movies by genre.  
- User - admin can get access to specific users or set of users
- Rental session - users and admins can see current and historic rental sessions, viewing properties like time check out and time remaining 

UPDATE
- User - users can update their profile 
- Movie - admins can update movie details like genre and cast
- Genre - admins can update genres 
- Rental session - users can update rental sessions by returning their movie or extending the checkout timeline

DELETE
- User - admins and users can remove user profiles
- Movie - admins can remove movies 
- Genre - admins can remove genres

The application could be supplemented with many more objects and operations, but this could serve a could core 
