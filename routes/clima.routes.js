const{ Router } = require('express');


router = Router();

const{
    ClimaPut
} = require('./../controllers/clima.controller');



//Atrapar valores

router.get( "/:search", ClimaPut );




module.exports = router;