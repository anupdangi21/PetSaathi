import PetGroomingModel from "../Models/petGrooming.js";
import verifyWithEsewa from "./esewaService.js";

const verifyPayment = async (req, res) => {
    try {
      const { transaction_uuid, bookingData } = req.body;
  
      // Validate input
      if (!transaction_uuid || !bookingData?.email) {
        return res.status(400).json({ message: 'Invalid verification request' });
      }
  
      // Verify with eSewa API
      const verificationResponse = await axios.post(
        'https://rc-epay.esewa.com.np/api/epay/transaction/status/',
        {
          transaction_uuid,
          merchant_code: 'EPAYTEST'
        }
      );
  
      if (verificationResponse.data.status !== 'COMPLETE') {
        return res.status(400).json({ message: 'Payment not verified' });
      }
  
      // Save to database
      const booking = new PetGroomingModel({
        ...bookingData,
        paymentStatus: 'paid',
        transactionId: transaction_uuid
      });
  
      await booking.save();
  
      res.status(201).json({
        message: 'Booking confirmed',
        booking
      });
  
    } catch (error) {
      console.error('Verification error:', error);
      res.status(500).json({
        message: error.response?.data?.message || 'Payment verification failed'
      });
    }
  };
export default { verifyPayment };