// import axios from 'axios';

// const verifyWithEsewa = async (transaction_uuid) => {
//     try {
//         const response = await axios.post(
//             'https://rc-epay.esewa.com.np/api/epay/transaction/status/',
//             {
//                 transaction_uuid,
//                 merchant_code: 'EPAYTEST' // Use your actual merchant code
//             },
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${process.env.ESEWA_SECRET}`
//                 }
//             }
//         );

//         return response.data.status === 'COMPLETE';
//     } catch (error) {
//         console.error('eSewa verification failed:', error);
//         return false;
//     }
// };

// export default verifyWithEsewa; // Fixed export