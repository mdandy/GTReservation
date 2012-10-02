#MaVeN

<br/>
##Authors

* **Michael Dandy** - mdandy3@gatech.edu
* **Jonathan Edwards** - jedwards36@gatech.edu
* **Kevin Johnstone** - kjohnstone6@gatech.edu
* **Josh Zeder** - jzeder3@gatech.edu


##Description
Based on interviews done at Georgia Tech, we are going to make a mobile web 
application for 
racquetball reservation system. Our web application will be designed with 
racquetball and squash players at the Georgia Tech Campus Recreation Center in 
mind. The web application will provide a user-friendly interface that will list 
all outstanding reservations and allow users to create new reservations for 
courts that are available within the next forty-eight hours. The forty-eight 
hour rule is to keep inline with the current CRC rules for reservations. This 
system will use GTMob to authenticate the user so that we can assure that the
user is either current student or alumni. We will also create a database that 
this app will use to read and write reservation data.


***Shortcomings of current solutions***

Currently the CRC uses a simple pen and paper approach when recording racquetball 
and squash reservations. If students wish to make a reservation for a court they 
must either call the CRC or travel across campus and check with the front desk if 
there are any vacancies. A major problem with this current reservation system is 
that your planned time may not be available. You must then contact the player(s) 
you are going to play with and schedule a new time, in which you can both play. 
You must also either be at the CRC or in a position where you can call in order 
to make the reservation. Another problem with the current solution is that 
anyone can call and make a reservation. People who are not students or alumni 
can call and make reservations, allowing them to circumvent the rules and 
make several reservations in a row.


***Technologies to be used in the solution***

We will be developing the frontend application using HTML, JQuery, and CSS. The 
database will be in MySQL. The backend will be coded using PHP. Moreover, we are
going to use GTmob API to interact with GT related information such as GT 
authentication, GT directory, and student information.


##References

* JQuery Mobile - <http://jquerymobile.com/test/docs/api/index.html>
* HTML - <http://www.w3.org/TR/1999/REC-html401-19991224/>
* PHP Manual - <http://www.php.net/manual/en/> 
* PHP PDO Manual - <http://php.net/manual/en/book.pdo.php>
* GTmob - <http://gtmob.gatech.edu/drupal/apis>

##Note

GTReservation is not a standalone application. It requires 
<a href="http://gtmob.gatech.edu/drupal/apis">GTmob</a> platform to function 
properly. You can view GTReservation at 
<http://m2.cip.gatech.edu/d/maven/w/GTReservation/c/>.