import stamp from "tp-stampit";
import { Svg } from "../View/Svg";
import mineSvg from "../../assets/icons/mine.svg";
import { Instance } from "../Helpers/Instance";

export const Mine = stamp(Svg, Instance, {
	props: {
		htmlString: mineSvg.trim(),
		name: "mine",
		parent: null,
	},
	methods: {
		setParent(parent) {
			this.parent = parent;
		},
	},
	propertyDescriptors: {
		name: { value: "mine" },
	},
});
