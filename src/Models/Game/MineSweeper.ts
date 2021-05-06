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
			size: [20, 20],
			cellSize: 50,
			className: "board",
			minePercentage: 0.21,
		}),
		interface: SweeperInterface({ className: "interface", timerPadding: 3 }),
		element: "main",
	},
	init({}) {
		this.appendElem(this.interface, this.board);

		this.board.addEvent("click", (e) => {
			const cell = this.board.findCellFromElem(e.target);
			this.updateMineCounter();
			this.interface.startTimer();
			if (cell.isMine()) {
				this.board.revealAllMines();
				this.board.events = new Map();
				this.interface.stopTimer();
			}
		});

		this.board.addEvent("contextmenu", (e) => {
			const cell = this.board.findCellFromElem(e.target);
			if (cell.isMarked()) {
				this.interface.mineCounter.decrement();
			} else {
				this.interface.mineCounter.increment();
			}
		});

		this.interface.resetButton.addEvent("click", (e) => {
			const { size, cellSize } = this.board;
			const newBoard = SweeperBoard({
				size,
				cellSize,
				className: "board",
				minePercentage: 0.21,
			});
			this.replaceChildElem(this.board, newBoard);
			newBoard.copyAllEvents(this.board);
			delete this.board;
			this.board = newBoard;
			this.interface.resetAll();
		});
	},
	methods: {
		updateMineCounter() {
			const totalMines = this.board.getTotalMines();
			this.interface.setTotalMines(totalMines);
		},
		reset() {
			this.timer.reset();
			this.interface.reset();
		},
	},
	propertyDescriptors: {
		name: { value: "minesweeper" },
	},
});
