import stamp from "tp-stampit";
import { ElementHandler } from "./ElementHandler";
import { EventHandler } from "../Helpers/EventHandler";

export const Button = stamp(ElementHandler, EventHandler, {
  props: {
    value: null,
    element: "button",
  },
  init({ value = this.value }) {
    this.value = value;
    this.appendElem(this.value);
  },
});
