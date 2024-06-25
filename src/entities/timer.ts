const mixins = {
  data() {
    return {
      endTimer: false,
    }
  },
  methods: {
    timer(time: number) {

      setTimeout(() => {
        this.endTimer = true;
      }, time * 1000);
    }
  },
};

export default mixins