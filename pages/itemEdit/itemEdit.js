// pages/sell/sell.js

import { dateFormat } from "../../utils/util.js";

const db = wx.cloud.database()
const item = db.collection('posts')

var userInfo;

Page({

  // Delete Image
  deleteImage(event) {
    const nowIndex = event.currentTarget.dataset.id;
    let images = this.data.fileIds;
    images.splice(nowIndex, 1);
    this.setData({
      fileIds: images
    })
  },

  // Preview Image
  previewIamge(event) {
    const nowIndex = event.currentTarget.dataset.id;
    const images = this.data.fileIds;
    wx.previewImage({
      current: images[nowIndex],  
      urls: images,  
    })
  },

  // Choose Image
  chooseImage() {
    if (this.data.fileIds.length == 0) {
      wx.showToast({
        title: 'Select pictures',
        icon: 'none',
        duration: 2000,
        success: res => {
          this.ImageOperator()
        }
      })
    }else {
      this.ImageOperator()
    }
    
  },

  ImageOperator() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res =>  {
        const newList = res.tempFilePaths;
        const curList = this.data.fileIds;

        let curLength = curList.length;
        let newLength = newList.length;
        console.log("current length: " + curLength);
        console.log("new length: " + newLength);

        if ( curLength == 9 ) {
          console.log("...");
        }
        if ( curLength < 9 ) {
          let images = [];
          let residue = 9 - curLength;
          if ( residue >= newLength ) {
            images = curList.concat(newList);
          }else {
            images = curList.concat(newList.slice(0, residue));
          }  
          this.setData({
            fileIds: images
          })
        }
      }
    })
    
  },

  /**
   * Page initial data
   */
  data: {
    fileIds: [],
    type: "",
    item: {},
    LoggedIn: true,
    userInfo: [],
    itemCheck: [false, false, false, false, false, false, false, false],
    images: [],
    openid: '',
  },

   getOpenid: function() {
     let page = this;
     wx.cloud.callFunction({
       name: 'getOpenid',
       complete: res => {
         var openid = res.result.openid
         page.setData({
           openid: openid
         })
       }
     })
   },

  tapCancel: function() {
    wx.showModal({
      title: 'Are you sure you want to cancel?',
      cancelText: 'No',
      confirmText: 'Yes',
      success: res => {
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/home/home',
          })
      }
    }
    })
  },


  async submitPost(event) {

    let date = new Date()
    var dateString = dateFormat("YYYY-mm-dd", date)
    var dateNum = Date.now();


    //var date = new Date(dateNum);
    //var dateString = date.toLocaleDateString();
    var files = [];

    for (let index = 0; index < this.data.fileIds.length; index++) {
      const fileId = this.data.fileIds[index];
      if (fileId.indexOf("cloud") !== 0) {
        //Uploads photos to cloud, remembers file ids
        const cloudPath = `${Date.now()}.png`
        const res = await wx.cloud.uploadFile({
          cloudPath,
          filePath: fileId,
        })
        console.log("res:" + res.fileID);
        files.push(res.fileID)
      } else {
        files.push(fileId)
      }
    }

    this.setData({
      fileIds: files
    })

    //Add entry into cloud database
    if(this.pageData.id) {
      item.doc(this.pageData.id).get().then(res => {
          wx.cloud.callFunction({
              name: "updatePost",
              data: {
                  id: this.pageData.id,
                  itemName: event.detail.value.itemName,
                  itemContact: event.detail.value.itemContact,
                  itemPrice: event.detail.value.itemPrice,
                  itemCatagory: event.detail.value.itemCatagory,
                  itemDescription: event.detail.value.itemDescription,
                  itemImageIds: files,
                  itemCreateDate: dateNum,
                  itemDateString: dateString,
                  itemSellerNickname: userInfo.nickName,
                  itemSellerOpenid: this.data.openid,
              }
          })
        })
      } else {
          wx.cloud.callFunction({
              name: "savePost",
              data: {
                  itemName: event.detail.value.itemName,
                  itemContact: event.detail.value.itemContact,
                  itemPrice: event.detail.value.itemPrice,
                  itemCatagory: event.detail.value.itemCatagory,
                  itemDescription: event.detail.value.itemDescription,
                  itemImageIds: files,
                  itemCreateDate: dateNum,
                  itemDateString: dateString,
                  itemSellerNickname: userInfo.nickName,
                  itemSellerOpenid: this.data.openid,
              }
            })
    }
    wx.switchTab({
      url: '/pages/myItems/myItems',
    })
  },


  pageData: {

  },

  onLoad: function(options) {
    this.getOpenid()
    this.pageData.id = options.id
    if(options.id) {
      item.doc(options.id).get().then(res => {
        this.setData({
          item:res.data,
          fileIds: res.data.itemImageIds
        })

        const catagory = res.data.itemCatagory
        if (catagory == "Sports") {
          this.setData({
            itemCheck: [true, false, false, false, false, false, false, false]
          })
        }
        else if (catagory == "Books") {
          this.setData({
            itemCheck: [false, true, false, false, false, false, false, false]
          })
        }
        else if (catagory == "Appliance") {
          this.setData({
            itemCheck: [false, false, true, false, false, false, false, false]
          })
        }
        else if (catagory == "Household") {
          this.setData({
            itemCheck: [false, false, false, true, false, false, false, false]
          })
        }
        else if (catagory == "Clothes") {
          this.setData({
            itemCheck: [true, false, false, false, true, false, false, false]
          })
        }
        else if (catagory == "Footwear") {
          this.setData({
            itemCheck: [true, false, false, false, false, true, false, false]
          })
        }
        else if (catagory == "Electronics") {
          this.setData({
            itemCheck: [true, false, false, false, false, false, true, false]
          })
        }
        else if (catagory == "Hobby") {
          this.setData({
            itemCheck: [true, false, false, false, false, false, false, true]
          })
        }
      })
    }
  },

  

  onShow: function() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.setData({
            LoggedIn: true
          })
        } else {
          this.setData({
            LoggedIn: false
          })
        }
      }
    })
    wx.getUserInfo({
      success: function(res) {
        userInfo = res.userInfo;
      }
    })
  },

    closeClick: function() {
      this.setData({
        visible: false
      })
    },

    onUnload: function() {
      wx.switchTab({
        url: '/pages/home/home'
      })
    }

})

