import stamp from "tp-stampit";
import { Svg } from "../View/Svg";
import mineSvg from "../../assets/icons/mine.svg";

export const Mine = stamp(Svg, {
	props: {
		htmlString: mineSvg.trim(),
	},
	propertyDescriptors: {
		name: { value: "mine" },
	},
});
