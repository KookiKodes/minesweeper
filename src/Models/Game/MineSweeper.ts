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
			cellSize: 100,
			className: "board",
			minePercentage: 0.21,
		}),
		interface: SweeperInterface({ className: "interface" }),
		element: "main",
	},
	init({}) {
		this.appendElem(this.board);
		const button = Button({ value: Text({ value: "Update Board Size" }) });
		this.appendElem(button);
		button.addEvent("click", (e) => {
			const newBoard = SweeperBoard({
				size: [30, 30],
				cellSize: 70,
				className: "board",
				minePercentage: 0.1,
			});
			this.board.replaceElem(newBoard);
			delete this.board;
			this.board = newBoard;
		});
	},
	propertyDescriptors: {
		name: { value: "minesweeper" },
	},
});
