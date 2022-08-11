const BName = require('../db/models/b_nameModel');

class BusinessService{
    constructor(){};
    async CreateBName(name){
        try{
            await BName.create(name);
            return 'Business Name is created successfully'
        }catch(err){
            return err
        }
        
    }


}

module.exports = BusinessService;