# rostersbackend
A complete backend for a "roster management" type app. 
DEPLOYED ON: https://rostersbackend.herokuapp.com/

MADE with Mongodb, express, and node. 

- Contains user authorisation, authentication, forgot password retrieve with link, etc. 


- CRUD functionalities for Staffs and timesheets. 


- AWS S3 bucket for saving staff's profile pics.


- Generate and download PDF file containing all the staffs and staff details.
- And many more



'/' -> for homepage

/register' -> for register route. Directions for Use: Use POST method and send "email" and "password" in Json format.

'/login' -> for login route. Directions for Use: Use POST method and send "email" and "password" in Json format. You will get a jsonwebtoken, which will be required for visiting "authentication required" routes.

'/auth/getstaff' -> to get list of staffs that you have created. 

'/auth/addstaff' -> to add a staff. Directions for use: Use POST method with following fields: name,email,contactNumber,age, costPerHour,userImage(the file will get uploaded to AWS S3 bucket).  

'/auth/updatestaff/:staffId' -> for updating your staff details

'/auth/deletestaff/:staffId' -> for deleting your staff

'/auth/:staffId/createtimesheet' -> for creating a timesheet for a specific user. Fields include: startDayTime and endDayTime.
Example: 
{
    "startDayTime": "2022-12-30T16:00:00Z",
    "endDayTime": "2022-12-30T24:00:00Z"
}

'/auth/:staffId/gettimesheet' -> to get timesheets of a specific staff

'/auth/:staffId/updatetimesheet/:timesheetId' -> to update timesheet of a specific staff 

'/auth/:staffId/deletetimesheet/:timesheetId' -> to delete the timesheet of a specific staff 

'/passwordReset' -> to get an email which will be used for changing password. Directions of use: Use POST method with your email in json. If an user exists, You will get a link in your email to change your password.

'/changePassword/:userId/:token' -> use the link that you got in your email to change the password. DIrections of Use: Use POST method with "newPassword" as a key with your new password to change the password. 

'/createPdf' -> this lets you download a pdf containing all the details of your staffs. Use GET and add the token provided during login in bearer token to access this.
Here's a screenshot showing the example of a pdf file created using the app. 
![Screenshot (24)](https://user-images.githubusercontent.com/82562466/198294919-51640de8-25c2-43aa-ab40-5dfdf58b4e70.png)

