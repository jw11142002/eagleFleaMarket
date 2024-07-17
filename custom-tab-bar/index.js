
Component({
  data: {
    selected:0,
    "color": "black",
    "selectedColor": "green",
    "borderStyle": "white",
    "list": [
      {
        "text": "home",
        "pagePath": "/pages/home/home",
        "iconPath": "/images/tab_icons/home_icon.png",
        "selectedIconPath": "/images/tab_icons/home_icon.png"
      },
      {
        "heigher": true,
        "text": "Sell",
        "pagePath": "/pages/sell/sell",
        "iconPath": "/images/tab_icons/sell_icon.png",
        "selectedIconPath": "/images/tab_icons/sell_icon.png"
      },
      {
        "text": "My Items",
        "pagePath": "/pages/myItems/myItems",
        "iconPath": "/images/tab_icons/my_items_icon.png",
        "selectedIconPath": "/images/tab_icons/my_items_icon.png"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      this.setData({
        selected:data.index
      })
      wx.switchTab({url})
    }
  }
})