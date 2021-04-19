import stamp from "tp-stampit";
import { Text } from "../View/Text";

export const Adjacent = stamp(Text, {
  props: {
    element: "p",
    value: 0,
    name: "adjacent",
  },
  init() {
    this.remText();
  },
  methods: {
    increment() {
      this.value += 1;
      this.update();
    },
    decrement() {
      this.value -= 1;
      this.update();
    },
    update() {
      this.setColor();
      this.addText(this.value);
    },
    setColor() {
      const colors = [
        "none",
        "blue",
        "green",
        "red",
        "darkblue",
        "darkred",
        "teal",
        "black",
        "grey",
      ];
      this.style({ color: colors[this.value] });
    },
  },
});
