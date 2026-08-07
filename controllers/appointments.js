const Appointment = require('../models/Appointments');
const User = require('../models/User');
const Service = require('../models/Service');

const getAllAppointments = async (req, res, next) => {
  try {
    // #swagger.tags = ['Appointments']
    const appointments = await Appointment.find({})
      .populate('clientId', 'name email role')
      .populate('serviceId', 'title price durationMinutes')
      .populate('providerId', 'name email role');
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

const getAppointmentById = async (req, res, next) => {
  try {
    // #swagger.tags = ['Appointments']
    const appointment = await Appointment.findById(req.params.id)
      .populate('clientId', 'name email role')
      .populate('serviceId', 'title price durationMinutes')
      .populate('providerId', 'name email role');

    if (!appointment) {
      const error = new Error('Appointment not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(appointment);
  } catch (error) {
    next(error);
  }
};

const createAppointment = async (req, res, next) => {
  try {
    // #swagger.tags = ['Appointments']
    // #swagger.parameters['body'] = { in: 'body', schema: { $ref: '#/definitions/Appointment' } }
    const { clientId, serviceId, providerId, appointmentDate, status, notes } = req.body;

    const client = await User.findById(clientId);
    if (!client) {
      const error = new Error('The referenced client does not exist');
      error.statusCode = 400;
      throw error;
    }

    const provider = await User.findById(providerId);
    if (!provider) {
      const error = new Error('The referenced provider does not exist');
      error.statusCode = 400;
      throw error;
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      const error = new Error('The referenced service does not exist');
      error.statusCode = 400;
      throw error;
    }

    const newAppointment = new Appointment({ clientId, serviceId, providerId, appointmentDate, status, notes });
    const savedAppointment = await newAppointment.save();

    res.status(201).json(savedAppointment);
  } catch (error) {
    next(error);
  }
};

const updateAppointment = async (req, res, next) => {
  try {
    // #swagger.tags = ['Appointments']
    // #swagger.parameters['body'] = { in: 'body', schema: { $ref: '#/definitions/Appointment' } }
    const { clientId, serviceId, providerId, appointmentDate, status, notes } = req.body;

    if (clientId) {
      const clientExists = await User.findById(clientId);
      if (!clientExists) {
        const error = new Error('The referenced client does not exist');
        error.statusCode = 400;
        throw error;
      }
    }
    if (providerId) {
      const providerExists = await User.findById(providerId);
      if (!providerExists) {
        const error = new Error('The referenced provider does not exist');
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

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { clientId, serviceId, providerId, appointmentDate, status, notes },
      { new: true, runValidators: true }
    );

    if (!updatedAppointment) {
      const error = new Error('Appointment not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    next(error);
  }
};

const deleteAppointment = async (req, res, next) => {
  try {
    // #swagger.tags = ['Appointments']
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) {
      const error = new Error('Appointment not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: 'Appointment successfully deleted',
      deletedAppointment
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
};
