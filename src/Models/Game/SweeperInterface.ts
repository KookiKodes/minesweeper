import stamp from "tp-stampit";
import { ElementHandler } from "../View/ElementHandler";
import { Timer } from "./Timer";
import { Incrementor } from "../Helpers/Incrementor";
import { Button } from "../View/Button";
import { Text } from "../View/Text";
import "../../styles/interface.css";

export const SweeperInterface = stamp(ElementHandler, {
	props: {
		element: "div",
		timer: null,
		resetButton: null,
		mineCounter: null,
	},
	init({ timerPadding = 0 }) {
		this.timer = Timer({ className: "timer", timerPadding });

		this.resetButton = Button({
			className: "reset btn",
			value: Text({ value: "Reset" }),
		});

		this.mineCounter = Incrementor({ padding: 3, className: "mine-counter" });

		this.appendElem(this.timer, this.resetButton, this.mineCounter);
	},
	methods: {
		startTimer() {
			this.timer.start();
		},
		stopTimer() {
			this.timer.stop();
		},
		resetTimer() {
			this.timer.reset();
		},
		setTotalMines(total: number) {
			this.mineCounter.value = total;
			this.mineCounter.update();
		},
		reduceMineCount(amount: number = 1) {
			for (let i = 0; i < amount; i++) {
				this.mineCounter.decrement();
			}
		},
		resetAll() {
			this.mineCounter.value = 0;
			this.mineCounter.update();
			this.timer.reset();
		},
	},
});
