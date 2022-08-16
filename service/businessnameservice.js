const BName = require('../db/models/businessnamemodel');

class BusinessService{
    constructor(){};
    async CreateBName(bname,userid){;
        try{
            await BName.create({name:bname,userId:userid});
            return 'Business Name is created successfully'
        }catch(err){
            return err
        }
        
    }
    async GetBusName(id){
        console.log(id)
        try{
            const business = await BName.findOne({where:{userId:id}})
            return business
        }catch(e){
            return (e);
        }
    }


}

module.exports = BusinessService;