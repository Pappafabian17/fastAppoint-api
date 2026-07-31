const Service = require('../models/Service');

const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find({}).populate('providerId', 'name email role');
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id).populate('providerId', 'name email role');

    if (!service) {
      const error = new Error('Service not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(service);
  } catch (error) {
    next(error);
  }
};

const createService = async (req, res, next) => {
  try {
    const { title, description, durationMinutes, price, category, providerId } = req.body;

    const service = await Service.create({
      title,
      description,
      durationMinutes,
      price,
      category,
      providerId,
    });

    res.status(201).json(service);
  } catch (error) {
    next(error);
  }
};

const updateService = async (req, res, next) => {
  try {
    const { title, description, durationMinutes, price, category, providerId } = req.body;

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { title, description, durationMinutes, price, category, providerId },
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      const error = new Error('Service not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(updatedService);
  } catch (error) {
    next(error);
  }
};

const deleteService = async (req, res, next) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);

    if (!deletedService) {
      const error = new Error('Service not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: 'Service deleted successfully',
      deletedService,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};