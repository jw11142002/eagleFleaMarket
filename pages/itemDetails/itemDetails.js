import { getOpenID } from "../../utils/util.js";


const db = wx.cloud.database()
const item = db.collection('posts')

Page ({

    data: {
        item: {},
        user: true,
        userOpenid: '',
    },

    pageData: {

    },

    onLoad: function (options) {
        let page = this;
        wx.cloud.callFunction({
            name: 'getOpenid',
            complete: res => {
                console.log(res.result.openid)
                var openid = res.result.openid
                
                this.pageData.id = options.id
                item.doc(options.id).get().then(res => {
                    this.setData({
                        item: res.data
                    })
                    console.log(this.data.item.itemSellerOpenid)
                    if(openid == this.data.item.itemSellerOpenid) {
                        this.setData({
                            user: true
                        })
                    } else {
                        this.setData({
                            user: false
                        })
                    }
                })
            }
        })
    },

    /*
    onLoad: function (options) {
        let page = this;
        var openid = getOpenID();
        console.log("OPENID: " + openid)

        this.pageData.id = options.id
        item.doc(options.id).get().then(res => {
            this.setData({
                item: res.data
            })
        })
        console.log("Item seller id: " + this.data.item.itemSellerOpenid)
        if(openid == this.data.item.itemSellerOpenid) {
            this.setData({
                user: true
            })
        } else {
            this.setData({
                user: false
            })
        }   
    },
    */


    async deletePost(event) {
        wx.cloud.callFunction({
            name: "removePost",
            data: {
                id: this.pageData.id
            }
        }).then(console.log)
        wx.switchTab({
          url: '/pages/myItems/myItems',
        })
    }
})