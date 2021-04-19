import stamp from "tp-stampit";

export const GraphNode = stamp({
  props: {
    value: null,
    adjacent: null,
  },
  init({ value = this.value }) {
    this.value = value;
    this.adjacent = new Set();
  },
  methods: {
    addAdjacent(value: any) {
      this.adjacent.add(value);
      return value;
    },
    removeAdjacent(value: any) {
      this.adjacent.delete(value);
      return value;
    },
    isAdjacent(value: any) {
      return this.adjacent.has(value);
    },
    getAdjacents() {
      return Array.from(this.adjacent);
    },
  },
});
