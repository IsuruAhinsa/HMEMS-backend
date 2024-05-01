const express = require('express');
const {
    wardCreateReq,
    getAllWardPr,
    deleteWardPr,
    updateWardPr,
    getSingeWardPr
    
    // deleteAddUser,
    // updateAddUser
  } = require('../controllers/WardPurchasingReqController');
  const router = express.Router();
   

  //post req
  router.post('/wardprcreate', wardCreateReq);
  router.get('/getall', getAllWardPr);
  router.delete('/:id', deleteWardPr)
  router.patch('/:id', updateWardPr)
  router.get('/:id', getSingeWardPr)

  module.exports = router;
