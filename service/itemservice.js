const Item = require("../db/models/itemmodel");
const Price = require("../db/models/pricemodel");

class ItemService {
  constructor() {}
  async AddItem(data, user) {
    const { itemname, itemtype, customertype, prices, pic } = data;
    const d = JSON.parse(prices);

    try {
      await Item.create({
        itemname: itemname,
        itemtype: itemtype,
        customertype: customertype,
        pic,
        ownerId: user,
      }).then(async (item) => {
        await this.AddItemPrice(d, item.id);
      });

      return "Item Added";
    } catch (err) {
      return err;
    }
  }
  async AddItemPrice(prices, item_id) {
    try {
      prices.map(async (x) => {
        const { soldunit, unitprice, ccy } = x;
        await Price.create({ soldunit, unitprice, ccy, itemId: item_id }).then(
          () => {
            console.log("price added");
          }
        );
      });
    } catch (err) {
      return err;
    }
  }

  async EditItem(data) {
    try {
      const prices = JSON.parse(data.prices);
      console.log(prices);
      const existingPrice = await Price.findAll({ where: { itemId: data.id } });
      const newPrices = prices.filter(
        ({ id }) => !existingPrice.some(({ id: id2 }) => id === id2)
      );
      if (newPrices) {
        await Price.bulkCreate(
          newPrices.map((x) => {
            return {
              itemId: data.id,
              soldunit: x.soldunit,
              unitprice: x.unitprice,
              ccy: x.ccy,
            };
          })
        );
      }
      const removePrices = existingPrice.filter(
        ({ id }) => !prices.some(({ id: id2 }) => id === id2)
      );
      if (removePrices) {
        await Price.destroy({ where: { id: removePrices.map((x) => x.id) } });
      }
      // k.prices
      prices.forEach(async (price) => {
        await Price.update(price, { where: { id: price.id } });
      });
      await Item.update(data, { where: { id: data.id } }).catch((err) =>
        console.log(err)
      );
      return "editted";
    } catch (err) {
      console.log(err);
    }
  }

  async DeleteItem(item, user) {
    console.log(item, user);
    try {
      const res = await Item.destroy({ where: { id: item, ownerId: user } });
      console.log(res);
    } catch (err) {
      return err;
    }
  }

  async GetAllItem(userId) {
    const items = await Item.findAll({ where: { ownerId: userId } });
    return items;
  }

  async GetItemDetails(id, user) {
    const item = await Item.findOne({ where: { id: id, ownerId: user } });
    const prices = await Price.findAll({ where: { itemId: item.id }, order: [
      ["createdAt", "ASC"]
    ] });
    if (item == null) {
      return "No such item exists";
    } else {
      return { item, prices };
    }
  }

  async GetItemsByType(type, userId) {
    const itemtype = [
      "drink & baverage",
      "snack",
      "ingredient",
      "other",
      "body and facial care",
    ];
    const customertype = ["retailer", "end-user"];
    if (itemtype.includes(type)) {
      const items = await Item.findAll({
        where: { itemtype: type, ownerId: userId },
      });
      return items;
    } else if (customertype.includes(type)) {
      const items = await Item.findAll({
        where: { customertype: type, ownerId: userId },
      });
      return items;
    } else {
      return "No item exists";
    }
  }

  async GetItemByQuery(query) {
    const items = await Item.findAll({ where: query });
    return items;
  }
}

module.exports = ItemService;
