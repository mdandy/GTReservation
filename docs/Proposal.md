#MaVeN

<br/>
##Table of Contents

1. Team Members
2. User Interview Results
3. Project Description 
4. Deliverables
5. References

##Team Members

* **Michael Dandy** - mdandy3@gatech.edu
* **Jonathan Edwards** - jedwards36@gatech.edu
* **Kevin Johnstone** - kjohnstone6@gatech.edu
* **Josh Zeder** - jzeder3@gatech.edu


##User Interview Results

###Michael Dandy
***Customer:*** CS Undergrad Student

***Problem:*** He wishes that there is a campus virtual tour guide.
It will be a huge help for freshmen who oftentimes are overwhelmed with how
big Georgia Tech campus is. Basically, he wants a mobile app that can show him 
basic information about the buildings in Georgia Tech as he walks around campus. 
This information include: 
* whether or not he has class in that building; if so, show the class schedule
* whether or not the building has study rooms

<hr />

***Customer:*** CS Undergrad Student

***Problem:*** There should be a free PRS system. As we all know, the PRS system
was changed several semesters ago, and it becomes a huge pain for Seniors. Some 
of their classes require PRS clicker as part of attendance  and/or participation 
grade. As result, they have to either buy a new PRS clicker or pay  
subscription fee. Unlike lower classmen, Seniors won't be able to use that clicker  
in the next semester since they are about to graduate.

***Possible fix:*** Have a PRS web or mobile application, and it
should be distributed for free.

<br />
###Jonathan Edwards
***Customer Archetype:*** Undergraduate, mid-twenties

***Key-pain:*** Parking is a nightmare, and he would like to know when one lot is 
open and another isn’t. The lot next to Howey was mentioned, that he will 
drive all the way here just to discover that no spaces are available.

***Possible fix:*** He didn't mention a solution, just that he would want to 
know when the lots fill up before he gets there. I felt that it could be 
accomplished very simply if we could get the data from the parking meter in 
the lot next to Howey, and then just display when the lot is full or when 
it contains vacancies. The same principle could be applied to the lot next 
to the parking registration building in Tech Square.

<hr />

***Customer Archetype:*** Undergraduate, early twenties

***Key-pain:*** I wish there was a way to see if fellow Tech students had the 
textbooks I needed for the semester so I could buy them sooner and save some cash 
in the process. (The student then described that his work-around was to use 
Reddit.com and find other Georgia Tech students who would participate).

***Possible fix:*** Create an app for textbook trading and sales/requests so 
that Tech Students can benefit from each other’s personal libraries. It should 
have user profiles, the name of the textbook, the price, the class the textbook 
for, and location for meetup.

<br />
###Kevin Johnstone
***Customer:*** Faculty

***Key-pain:*** Currently, racquetball reservations at CRC is done by pen 
and paper system, and it is a hardship. You must call the CRC and make a blind 
reservation in which you cannot see what reservations are available beforehand. 
If there is a mobile or web application that allows you to make 
reservations online, it would be much easier to coordinate reservations with
other players. In adddition, I am not always in a position where I can make a
call to reserve a court. For example, when I'm in class, I have to wait until
the class is ended to make a reservation.

<hr />
***Customer:*** Student, undergraduate CS major

***Key-pain:*** Finding group in classes where you don't know anyone is quite 
problematic. He had taken classes such as ISYE 3770 that had major group projects 
but he did not know anyone in the class. The current solution is to spam the class 
with artificial resumes. It would be nice if there is an app that allows you to 
create profile that includes information such as GPA, major, and technical skill. 
This app should help in group creation by allowing people to search team members
based on certain criteria.

<br />
###Josh Zeder
***Customer:*** Undergraduate, early twenties.

***Problem:*** He would like to know how many people are at the gym so that 
when he knows when the best time to go to gym is. Otherwise, he could possibly   wait for a long time to use the equipments. 

***Possible solutions:*** There are no simple solutions for this problem. You 
can get the number of people coming in because you have to scan buzzcards to get 
in. However, there is no simple way to measure the amount of people leaving.

<hr />
***Customer:*** Undergraduate, teenager.

***Problem:*** He wants to know the fastest walking path to class and how long 
it will take so that he knows the latest possible time to leave. This could be
done using Google maps, so I do not think it needs to be redone.


##Project Description
Based on our interviews, we are going to make a mobile web application for 
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


##Deliverables
* Prototype wireframes
* Source code for application 
* Demo to the RAs of the app working on a handset 
* Documentation  covering:
	* the application architecture 
	* possible improvements 
	* known bugs and issues
	* interaction with dependent services
	* problem areas and how the team overcame them
* Short (4 minute) video presentation that includes (at a minimum) the problem, solution architecture and demonstration


##References

* JQuery Mobile - <http://jquerymobile.com/test/docs/api/index.html>
* HTML - <http://www.w3.org/TR/1999/REC-html401-19991224/>
* PHP Manual - <http://www.php.net/manual/en/> 
* PHP PDO Manual - <http://php.net/manual/en/book.pdo.php>
* GTmob - <http://gtmob.gatech.edu/drupal/apis>