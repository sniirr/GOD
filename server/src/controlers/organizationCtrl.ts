import { Organization } from "../models/OrganizationModel";
const ObjectId = require('mongoose').Types.ObjectId;

export async function upsertOrganization(organization) {
  try {
    // get question
    if (organization._id) {
      // update
      return await Organization.findOneAndUpdate({ _id: new ObjectId(organization._id) }, organization);
    } else {
      // create new question
      return await Organization.create(organization);
    }
  } catch (error: any) {
    throw `Failed to upsert Organization ${{organization}}. ERROR - ${error.message}`
  }
}