const Item = require('../db/models/itemmodel');
const Price = require('../db/models/pricemodel');

class ItemService{
    constructor(){};
    async AddItem(data,user){
        console.log(user)
        const {itemname,itemtype,customertype,prices } = data;
        try{
            await Item.create({itemname:itemname,itemtype:itemtype,customertype:customertype,ownerId:user}).then(async(item)=>{
                await this.AddItemPrice(prices,item.id)
            });

            return 'Item Added';
        }catch (err){
            return err
        }
    }
    async AddItemPrice(prices,item_id){
       try{
        prices.map(async(x) => {
            const {soldunit,unitprice,ccy} = x;
            await Price.create({soldunit,unitprice,ccy,itemId:item_id})
        })
       }catch (err){
        return err
    }
    }

    async EditItem(data,id){
        try{
         await Item.update(data,{where:{id:id}})
           .catch(err=>console.log(err));
         return 'editted'
        }catch (err){
         return err
     }
     }

     async DeleteItem(id){
        try{
         await Item.destroy({where:{id:id}})
           .catch(err=>console.log(err));
         return 'deleted'
        }catch (err){
         return err
     }
     }

    async GetAllItem(userId){
        const items = await Item.findAll({where:{ownerId:userId}});
        return items;
    }

    async GetItemDetails(id){
      const item = await Item.findOne({where:{id:id}})
      if (item == null){
        return "No such item exists"
    }else{
        return item
    }
    }

    async GetItemsByType(type,userId){
        const itemtype = ['drink & baverage','snack', 'ingredient','other','body and facial care']
        const customertype = ['retailer','end-user']
        if (itemtype.includes(type)){
            const items = await Item.findAll({where:{itemtype:type,ownerId:userId}});
            return items
        }else if (customertype.includes(type)){
            const items = await Item.findAll({where:{customertype:type,ownerId:userId}})
            return items
        }else{
            return "No item exists"
        }
        
        
    }

    async GetItemByQuery(query){
        const items = await Item.findAll({where:query});
        return items
        
    }
}

module.exports = ItemService;
