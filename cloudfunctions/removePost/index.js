
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {
  return await db.collection('posts').doc(event.id).remove()
}