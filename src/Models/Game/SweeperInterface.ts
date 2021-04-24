import stamp from "tp-stampit";
import { ElementHandler } from "../View/ElementHandler";
import { Timer } from "./Timer";
import { Text } from "../View/Text";
import "../../styles/interface.css";

export const SweeperInterface = stamp(ElementHandler, {
	props: {
		element: "div",
		timer: Timer(),
	},
	init() {
		this.appendElem(this.timer);
	},
});
