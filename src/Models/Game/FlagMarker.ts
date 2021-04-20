import stamp from "tp-stampit";
import { Svg } from "../View/Svg";
import flagSvg from "../../assets/icons/flag-marker.svg";

export const FlagMarker = stamp(Svg, {
	props: {
		htmlString: flagSvg.trim(),
		name: "flag-marker",
	},
	propertyDescriptors: {
		name: { value: "flag-marker" },
	},
});
