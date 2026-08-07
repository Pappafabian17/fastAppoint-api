const Service = require('../models/Service');
const User = require('../models/User'); 

const getAllServices = async (req, res, next) => {
  try {
    // #swagger.tags = ['Services']
    const services = await Service.find({}).populate('providerId', 'name email role');
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

const getServiceById = async (req, res, next) => {
  try {
    // #swagger.tags = ['Services']
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
    // #swagger.tags = ['Services']
    // #swagger.parameters['body'] = { in: 'body', schema: { $ref: '#/definitions/Service' } }
    const { title, description, durationMinutes, price, category, providerId } = req.body;
    const providerExists = await User.findById(providerId);
    if (!providerExists) {
      const error = new Error('The referenced provider does not exist');
      error.statusCode = 400; 
      throw error;
    }
    const newService = new Service({ title, description, durationMinutes, price, category, providerId });
    const savedService = await newService.save();

    res.status(201).json(savedService);
  } catch (error) {
    next(error);
  }
};

const updateService = async (req, res, next) => {
  try {
    // #swagger.tags = ['Services']
    // #swagger.parameters['body'] = { in: 'body', schema: { $ref: '#/definitions/Service' } }
    const { title, description, durationMinutes, price, category, providerId } = req.body;
    if (providerId) {
      const providerExists = await User.findById(providerId);
      if (!providerExists) {
        const error = new Error('The referenced provider does not exist');
        error.statusCode = 400;
        throw error;
      }
    }

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
    // #swagger.tags = ['Services']
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      const error = new Error('Service not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: 'Service successfully deleted',
      deletedService
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
  deleteService
};
