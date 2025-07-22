const express = require("express");
const connectDB = require("./db/dbConnect");
const cors = require("cors");
const { SignUpApi } = require("./apis/registerApi");
const { LoginApi } = require("./apis/loginApi");
const session = require("express-session");
const { GetUsers } = require("./apis/admin/getUser");
const { GetArtists } = require("./apis/admin/getArtist");
const { GetCategories } = require("./apis/admin/getCategory");
const Logout = require("./apis/logout");
const Session = require("./apis/session");
const { profilePicUpload } = require("./multer/multerUpload");
const { AddEvents } = require("./apis/artist/addEvents");
const { BookEvent } = require("./apis/user/bookEvent");
const { GetUpcomingEvents } = require("./apis/admin/getUpcomingEvents");
const { GetPastEvents } = require("./apis/admin/getPastEvents");
const { AddFeedBack } = require("./apis/user/addFeedback");
const { GetFeedback } = require("./apis/admin/getFeedback");
const { AddComplaint } = require("./apis/user/addComplaint");
const { GetComplaint } = require("./apis/admin/getComplaint");
const { GetBooking } = require("./apis/admin/getBooking");
const { GetPayments } = require("./apis/admin/getPayment");
const { GetCounts } = require("./apis/admin/getCounts");
const { GetDailyProfit } = require("./apis/admin/getDailyProfit");
const { GetTodaysEvents } = require("./apis/admin/getTodaysEvents");
const { ArtistGetUpcomingEvents } = require("./apis/artist/getUpcomingEvents");
const { ArtistGetPastEvents } = require("./apis/artist/getPastEvents");
const { ArtistGetBooking } = require("./apis/artist/getBookings");
const { ArtistGetFeedback } = require("./apis/artist/getFeedback");
const { EditEvent } = require("./apis/artist/editEvent");
const { DeleteEvent } = require("./apis/artist/deleteEvent");
const { GetProfile } = require("./apis/artist/getProfile");
const { EditProfile } = require("./apis/artist/editProfile");
const { ArtistGetCounts } = require("./apis/artist/getCounts");
const { GetBookingHistory } = require("./apis/user/getBookingHistory");
const { CancleTicket } = require("./apis/user/cancleTicket");
const { GetPaymentsArtist } = require("./apis/artist/getPaymentInfo");
const { GetDailyProfitArtist } = require("./apis/user/getDailyProfitArtist");
const { GetTodaysEventsArtist } = require("./apis/artist/getTodayEvent");

//initialize app
const app = express();

//initialize PORT No
const PORT = 8000;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: ["http://localhost:3001", "http://localhost:3002", "http://localhost:3003", "http://192.168.0.20:3001"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

// Configure express-session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use("/images/profilePics", express.static("images/profilePics"));

//callback to connect MongoDB
connectDB();

//Routes
//!admin
app.get("/admin/getUser", GetUsers);
app.get("/admin/getArtist", GetArtists);
app.get("/admin/getUpcomingEvents", GetUpcomingEvents);
app.get("/admin/getPastEvents", GetPastEvents);
app.get("/admin/getFeedback", GetFeedback);
app.get("/admin/getComplaint", GetComplaint);
app.get("/admin/getBooking", GetBooking);
app.get("/admin/getPayment", GetPayments);
app.get("/admin/getCounts", GetCounts);
app.get("/admin/getDailyProfit", GetDailyProfit);
app.get("/admin/getTodaysEvents", GetTodaysEvents);

//!artist
app.post("/artist/getCounts", ArtistGetCounts);
app.post("/artist/getTodayEvents", GetTodaysEventsArtist);
app.post("/artist/getProfile", GetProfile);
app.post("/artist/editProfile", profilePicUpload.single("profilePic"), EditProfile);
app.post("/artist/addEvent", AddEvents);
app.post("/artist/editEvent", EditEvent);
app.post("/artist/deleteEvent", DeleteEvent);
app.post("/artist/getUpcomingEvents", ArtistGetUpcomingEvents);
app.post("/artist/getPastEvents", ArtistGetPastEvents);
app.post("/artist/getBookings", ArtistGetBooking);
app.post("/artist/getFeedback", ArtistGetFeedback);
app.post("/artist/getPayments", GetPaymentsArtist);
app.post("/artist/getDailyProfitArtist", GetDailyProfitArtist);

//!user 
app.post("/user/bookEvent", BookEvent);
app.post("/user/addFeedback", AddFeedBack);
app.post("/user/addComplaint", AddComplaint);
app.post("/user/getBookingHistory", GetBookingHistory);
app.post("/user/cancelTicket", CancleTicket);
app.post("/register", profilePicUpload.single("profilePic"), SignUpApi);
app.post("/login", LoginApi);
app.post("/session", Session);
app.post("/logout", Logout);

//!common
app.get("/getCategories", GetCategories)

//Activate Server
app.listen(PORT, () => {
    console.log("Server Started on port: ", PORT);
});
