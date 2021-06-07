const plugin = requirePlugin('myPlugin');

Page({
  data: {
    items: [],
    currentItem: 0
  },

  onLoad() {
    plugin.sayHello();
  },

  addItem() {
    this.data.items.push(this.data.currentItem++);
    this.setData({
      items: this.data.items,
      currentItem: this.data.currentItem
    });
  }
});

