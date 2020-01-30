const express = require('express');

const router = express.Router();
const apiController = require('../controllers/apiController');


/* post request to /311 is data from search bar
JSON obj with key of address and borough in req.body
'created date' --> date
'incident address' --> address
'borough' --> borough
'complaint type'--> complaint
'descriptor' --> description
*/

router.post('/', 
  apiController.getData,
  (req, res) => {
    // res.locals.data will be an array of objects sent to the front end. If no reports were filed for an address, we'll send an empty array to the front end which will then be handled accordingly.
  return res.status(200).json(res.locals.data);
})

module.exports = router;