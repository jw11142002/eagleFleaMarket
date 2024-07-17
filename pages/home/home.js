//index.js
//获取应用实例

const app = getApp()
const db = wx.cloud.database()




Page({


  data: {
    date: "",
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    catagory: "All",
    active:1
  },

  onPullDownRefresh:  function() {
    this.getListItems();
  },

  onShow: async function(options) {

    if(typeof this.getTabBar==='function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }

    if(this.data.catagory != 'All') {
      wx.cloud.callFunction({
        name: "getPostsByCatagory",
        data: {
          itemCatagory: this.data.catagory
        },
        success: (res) => {
          this.setData({
            posts: res.result.data,
          })
        }
      })
    }
    else {
      wx.cloud.callFunction({
        name: "getPosts",
        success: (res) => {
          this.setData({
            posts: res.result.data,
          })
        }
      })
    }
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  allClick: function() {
    this.setData({
      catagory: 'All',
      active: 1
    });
    this.getListItems();
  },
  sportsClick: function() {
    this.setData({
      catagory: 'Sports',
      active: 2
    });
    this.getListItems();
  },
  booksClick: function() {
    this.setData({
      catagory: 'Books',
      active: 3
    });
    this.getListItems();
  },
  applianceClick: function() {
    this.setData({
      catagory: 'Appliance',
      active: 4
    });
    this.getListItems();
  },
  householdClick: function() {
    this.setData({
      catagory: 'Household',
      active: 5
    });
    this.getListItems();
  },
  clothesClick: function() {
    this.setData({
      catagory: 'Clothes',
      active: 6
    });
    this.getListItems();
  },
  footwearClick: function() {
    this.setData({
      catagory: 'Footwear',
      active: 7
    });
    this.getListItems();
  },
  electronicsClick: function() {
    this.setData({
      catagory: 'Electronics',
      active: 8
    });
    this.getListItems();
  },
  hobbyClick: function() {
    this.setData({
      catagory: 'Hobby',
      active: 9
    });
    this.getListItems();
  },


  costcoClick: function() {
    this.setData({adLink: "COSTCO"})
  },
  puresmileClick: function() {
    this.setData({adLink: "PURESMILE"})
  },
  nydentalClick: function() {
    this.setData({adLink: "NYDENTAL"})
  },
  lanhaiClick: function() {
    this.setData({adLink: "LANHAI"})
  },

  getListItems: function() {
    if(this.data.catagory != 'All') {
      wx.cloud.callFunction({
        name: "getPostsByCatagory",
        data: {
          itemCatagory: this.data.catagory
        },
        success: (res) => {
          this.setData({
            posts: res.result.data,
          })
        }
      })
    }
    else {
      wx.cloud.callFunction({
        name: "getPosts",
        success: (res) => {
          this.setData({
            posts: res.result.data,
          })
        }
      })
    }
  }

})