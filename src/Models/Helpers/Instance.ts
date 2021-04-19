import stamp from "tp-stampit";
import { InstanceCounter } from "./InstanceCounter";

export const Instance = stamp(InstanceCounter, {
  conf: {
    allInstanceReferences: [],
  },
  props: {
    UNIQUE_ID: null,
  },
  init(notUsed, { stamp }) {
    notUsed;
    stamp.compose.configuration.allInstanceReferences.push(this);
    this.UNIQUE_ID = Symbol(`kooki.${this.name}.${this.instanceIndex}`);
  },
  statics: {
    getAllInstances(): any[] {
      return this.compose.configuration.allInstanceReferences;
    },
  },
  staticPropertyDescriptors: {
    name: { value: "instance" },
  },
  composers({ stamp }) {
    stamp.compose.configuration.allInstanceReferences = [];
  },
});
