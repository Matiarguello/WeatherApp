const{ Router } = require('express');


router = Router();

const{
    locationPut
} = require('../controllers/location.controller');



//Atrapar valores

router.get( "/:location", locationPut );


module.exports = router;