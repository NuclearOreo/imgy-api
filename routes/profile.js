const _ = require('lodash');
const app = require('express');
const router =  app.Router();
const {Profile, profileValidation} = require('../models/profile');