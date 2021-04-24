import stamp from "tp-stampit";
import { InstanceCounter } from "./InstanceCounter";

export const Instance = stamp(InstanceCounter, {
	conf: {
		allInstanceReferences: [],
	},
	init(notUsed, { stamp }) {
		notUsed;
		stamp.compose.configuration.allInstanceReferences.push(this);
	},
	statics: {
		getAllInstances(): any[] {
			return this.compose.configuration.allInstanceReferences;
		},
		reset() {
			this.compose.configuration.instances = 0;
			return (this.compose.configuration.allInstanceReferences = []);
		},
	},
	staticPropertyDescriptors: {
		name: { value: "instance" },
	},
	composers({ stamp }) {
		stamp.compose.configuration.allInstanceReferences = [];
	},
});
