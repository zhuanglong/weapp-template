Component({
  properties: {
    items: {
      type: Array,
      value: [],
      observer(newVal, oldVal, changedPath) {
        this.setData({items: newVal});
      }
    }
  },

  data: {
    items: []
  },

  methods: {

  }
});
