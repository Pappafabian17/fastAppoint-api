const Review = require('../models/Reviews');
const Appointment = require('../models/Appointments');
const User = require('../models/User');
const Service = require('../models/Service');

const getAllReviews = async (req, res, next) => {
  try {
    // #swagger.tags = ['Reviews']
    const reviews = await Review.find({})
      .populate('appointmentId')
      .populate('serviceId', 'title')
      .populate('clientId', 'name email');
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

const getReviewById = async (req, res, next) => {
  try {
    // #swagger.tags = ['Reviews']
    const review = await Review.findById(req.params.id)
      .populate('appointmentId')
      .populate('serviceId', 'title')
      .populate('clientId', 'name email');

    if (!review) {
      const error = new Error('Review not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

const createReview = async (req, res, next) => {
  try {
    // #swagger.tags = ['Reviews']
    // #swagger.parameters['body'] = { in: 'body', schema: { $ref: '#/definitions/Review' } }
    const { appointmentId, serviceId, clientId, rating, comment } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      const error = new Error('The referenced appointment does not exist');
      error.statusCode = 400;
      throw error;
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      const error = new Error('The referenced service does not exist');
      error.statusCode = 400;
      throw error;
    }

    const client = await User.findById(clientId);
    if (!client) {
      const error = new Error('The referenced client does not exist');
      error.statusCode = 400;
      throw error;
    }

    const newReview = new Review({ appointmentId, serviceId, clientId, rating, comment });
    const savedReview = await newReview.save();

    res.status(201).json(savedReview);
  } catch (error) {
    next(error);
  }
};

const updateReview = async (req, res, next) => {
  try {
    // #swagger.tags = ['Reviews']
    // #swagger.parameters['body'] = { in: 'body', schema: { $ref: '#/definitions/Review' } }
    const { appointmentId, serviceId, clientId, rating, comment } = req.body;

    if (appointmentId) {
      const appointmentExists = await Appointment.findById(appointmentId);
      if (!appointmentExists) {
        const error = new Error('The referenced appointment does not exist');
        error.statusCode = 400;
        throw error;
      }
    }
    if (serviceId) {
      const serviceExists = await Service.findById(serviceId);
      if (!serviceExists) {
        const error = new Error('The referenced service does not exist');
        error.statusCode = 400;
        throw error;
      }
    }
    if (clientId) {
      const clientExists = await User.findById(clientId);
      if (!clientExists) {
        const error = new Error('The referenced client does not exist');
        error.statusCode = 400;
        throw error;
      }
    }

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { appointmentId, serviceId, clientId, rating, comment },
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      const error = new Error('Review not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    // #swagger.tags = ['Reviews']
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      const error = new Error('Review not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: 'Review successfully deleted',
      deletedReview
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
};
