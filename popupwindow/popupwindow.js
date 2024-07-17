
Component({
    /**
     * 组件的属性列表
     */
    properties: {
      //是否弹出显示
      visible: {
        type: Boolean,
        value: true
      },
      //展示的标题
      titleString: {
        type: String,
        value: ''
      },
      //展示的内容
      contentString: {
        type: String,
        value: ''
      },
      //内容的最大高度，超出高度可滚动。
      contentHeight: {
        type: Number,
        value: 700
      },
      //点击外部的遮罩层是否允许关闭
      outClickCanClose: {
        type: Boolean,
        value: false
      }
    },
  
    /**
     * 组件的初始数据
     */
    data: {
      
    },
  
    /**
     * 组件的方法列表
     */
    methods: {
      closePopup() {
        this.triggerEvent("close", {
          visible: this.data.visible
        })
      },
      outClick(){
        if (this.data.outClickCanClose){
          this.triggerEvent("close", {
            visible: this.data.visible
          })
        }
      },
      onGetUserInfo(event) {
        const userInfo = event.detail.userInfo
        if(userInfo) {
          this.setData({
            userInfo: userInfo
          })
          wx.switchTab({
              url: '/pages/sell/sell'
          })
        } else {
            wx.switchTab({
                url: '/pages/home/home'
            })
        }
      }
    },

    

  })
