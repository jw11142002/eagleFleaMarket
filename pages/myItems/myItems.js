// pages/myItems/myItems.js
import { getOpenID } from "../../utils/util.js";


Page({

  onPullDownRefresh:  function() {
    wx.cloud.callFunction({
      name: "getPostsByUid",
      data: {
        itemSellerOpenid: 'oKidA5YgwH1prPH68-dstgrzeq5Y'
      },
      success: (res) => {
        this.setData({
          posts: res.result.data
        })
      }   
    })
  },

  onShow: async function(options) {
    if(typeof this.getTabBar==='function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }

    let page = this;
    wx.cloud.callFunction({
        name: 'getOpenid',
        complete: res => {
            console.log(res.result.openid)
            var openid = res.result.openid
            wx.cloud.callFunction({
              name: "getPostsByUid",
              data: {
                itemSellerOpenid: openid
              },
              success: (res) => {
                this.setData({
                  posts: res.result.data
                })
              }
            })
        }
    })
  },


  /**
   * Page initial data
   */
  data: {
  
  }
})