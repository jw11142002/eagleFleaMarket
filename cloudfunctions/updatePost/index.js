
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {
    return await db.collection('posts').doc(event.id).update({
      data: {
        itemName: event.itemName,
        itemContact: event.itemContact,
        itemPrice: event.itemPrice,
        itemCatagory: event.itemCatagory,
        itemDescription: event.itemDescription,
        itemImageIds: event.itemImageIds,
        itemCreateDate: event.itemCreateDate,
        itemDateString: event.itemDateString,
        itemSellerNickname: event.itemSellerNickname,
        itemSellerOpenid: event.itemSellerOpenid,
      }
    })

}