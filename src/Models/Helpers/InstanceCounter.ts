import stamp from "tp-stampit";

export const InstanceCounter = stamp({
	conf: {
		instances: 0,
	},
	props: {
		instanceIndex: 0,
	},
	init(notUsed, { stamp }) {
		notUsed;
		this.instanceIndex = stamp.compose.configuration.instances;
		stamp.compose.configuration.instances += 1;
	},
	staticPropertyDescriptors: {
		name: { value: "InstanceCounter" },
	},
	composers({ stamp }) {
		stamp.compose.configuration.instances = 0;
	},
});
