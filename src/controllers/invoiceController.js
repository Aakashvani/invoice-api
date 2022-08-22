const Invoice = require("../models/invoiceModel");

// to create an invoice :- [Enter new invoice details]
const creatingInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.create(req.body);
    return res.status(201).send(invoice);
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
};

// to get all invoice :- [Get all invoices stored in the db]
const getAllInvoice = async (req, res, next) => {
  try {
    const invoices = await Invoice.find()
      // .sort({ invoiceNumber: 1 })
      .lean()
      .exec();
    return res.status(201).send(invoices);
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
};

// to update by invoice number :- [Update a specific invoice based on invoice number]
const updateInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findOneAndUpdate(
      { invoiceNumber: req.params.number },
      req.body,
      { new: true }
    );
    return res.status(201).send(invoice);
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
};

// To GET all invoices between two dates :-
const deleteInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findOneAndDelete({
      invoiceNumber: req.params.number,
    });
    return res.status(204).send(invoice);
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
};

const getByDate = async (req, res, next) => {
  try {
    const invoices = await Invoice.aggregate([
      {
        $match: {
          invoiceDate: {
            $lt: new Date(req.params.endDate),
            $gt: new Date(req.params.startDate),
          },
        },
      },
    ]);
    return res.status(200).send(invoices);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

module.exports = {
  creatingInvoice,
  getAllInvoice,
  updateInvoice,
  deleteInvoice,
  getByDate,
};
