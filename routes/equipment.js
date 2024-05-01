const express = require('express');
const {
    addEquipment,
    getAllEquipment,
    deleteEquipment,
    updateEquipment,
    getSingeEquipment
    
    
    
    // deleteAddUser,
    // updateAddUser
  } = require('../controllers/EquipmentController');
  const router = express.Router();
   

  //post req
  router.post('/createequipment', addEquipment);
  router.get('/getallequipment', getAllEquipment);
  router.delete('/:id',  deleteEquipment);
  router.patch('/:id', updateEquipment);
    router.get('/:id', getSingeEquipment);

  module.exports = router;