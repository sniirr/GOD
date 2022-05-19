import isLoggedIn from '../middlewares/isLoggedIn';
import { upsertOrganization } from "../controlers/organizationCtrl";
const router = require('express').Router();

router
  .post('/upsert', isLoggedIn, upsertOrganization);

export default router;
