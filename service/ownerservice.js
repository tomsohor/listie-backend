const owner = require('../db/models/ownermodel');
const bcrypt = require('bcrypt');

class OwnerService{
    constructor(){};
    async registerUser(data){
        try{
            const hashPwd = await bcrypt.hash(data.password,10);
            data.password = hashPwd;
            await owner.create(data);
            return 'user added..'
        }catch (err){
            return err
        }
             
    }
    async getUserByUsername(username){
        try{
            const user = await owner.findOne({where:{username:username}});
            return user;
        }catch (e){
            return(e);
        }
        
    }
    async getUserById(id){
        try{
            const user = await owner.findOne({where:{id:id}});
            return user;
        }catch (e){
            return(e);
        }
        
    }
    
}

module.exports = OwnerService;
