// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection("posts").add({
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