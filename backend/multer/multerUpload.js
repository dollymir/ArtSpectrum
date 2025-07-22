const multer = require("multer");

//profile pic storage
const profilePicStorage = multer.diskStorage({

    //path to store the profilePic
    destination: (req, file, cb) => {
        cb(null, "D:/VS Projects/MERNSTACK Projects/INFOLABZ INTERNS/REACT PROJECTS/EVENT_BOOKING/event_booking_owner_react/src/images/profilePics");
    },

    //filename to give to the profilePic
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }

});

const profilePicUpload = multer({ storage: profilePicStorage });

module.exports = { profilePicUpload }