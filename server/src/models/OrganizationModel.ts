const mongoose = require('mongoose');

const Schema = mongoose.Schema;

export const OrganizationSchema = new Schema({
  name: String,
});

export const Organization = mongoose.model('Organization', OrganizationSchema)
