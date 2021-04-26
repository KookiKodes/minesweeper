import stamp from "tp-stampit";
import { SweeperBoard } from "./SweeperBoard";
import { SweeperInterface } from "./SweeperInterface";
import { EventHandler } from "../Helpers/EventHandler";
import { Button } from "../View/Button";
import { Text } from "../View/Text";
import "../../styles/minesweeper.css";

export const MineSweeper = stamp(EventHandler, {
	props: {
		board: SweeperBoard({
			size: [10, 10],
			cellSize: 70,
			className: "board",
			minePercentage: 0.21,
		}),
		interface: SweeperInterface(),
		element: "main",
		button: null,
	},
	init({}) {
		this.button = Button({ value: Text({ value: "Update Size" }) });
		this.appendElem(this.interface, this.board, this.button);
		this.button.addEvent("click", (e) => {
			this.removeElem(this.board);
			this.board = SweeperBoard({
				size: [50, 25],
				cellSize: 70,
				className: "board",
			});
			this.appendElem(this.board);
		});
		const button = Button({ value: Text({ value: "Print values" }) });
		this.appendElem(button);
		button.addEvent("click", (e) => this.board.printCellTypeTotals());
	},
	propertyDescriptors: {
		name: { value: "minesweeper" },
	},
});
