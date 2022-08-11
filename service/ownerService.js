const owner = require('../db/models/ownerModel');

class OwnerService{
    constructor(){};
    async Register(data){
        try{
            await owner.create(data);
            return 'user added..'
        }catch (err){
            return err
        }
             
    }

    async Login(data){
        const {username,password} = data;
        if (!username){
            return "Username Field can't be empty"
        }else if(!password){
            return "Password Field can't be empty"
        }else{
            try{
                const user = await owner.findOne({where:{username:username,password:password}});
                if (user === null){
                    return 'Incorrect Username or Password'
                }else{
                    return user
                }
            }catch(err){
                return err
            }
        } 
    }
}

module.exports = OwnerService;
