import Review from "../Models/review.js"

const createReview = async (req, res) => {
    try {
        const { username, email, areaforimprovement, suggestion } = req.body;
        
        const newReview = new Review({
            username: username || 'Anonymous',
            email,
            areaforimprovement,
            suggestion,
            reviewAt: new Date()
        });

        const savedReview = await newReview.save();
        
        res.status(201).json({
            success: true,
            data: savedReview
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ reviewAt: -1 });
        res.status(200).json({
            success: true,
            data: reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export default {createReview,getReviews }