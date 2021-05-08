import stamp from "tp-stampit";
import { SweeperBoard } from "./SweeperBoard";
import { SweeperInterface } from "./SweeperInterface";
import { Modal } from "../Helpers/Modal";
import { EventHandler } from "../Helpers/EventHandler";
import "../../styles/minesweeper.css";

export const MineSweeper = stamp(EventHandler, {
	props: {
		board: SweeperBoard({
			size: [20, 20],
			cellSize: 100,
			className: "board",
			minePercentage: 0.21,
		}),
		interface: SweeperInterface({ className: "interface", timerPadding: 3 }),
		element: "main",
		startModal: Modal({
			header: "Minesweeper",
		}),
	},
	init({}) {
		this.appendElem(this.interface, this.board, this.startModal);
		this.addMarginToBoard();

		this.board.addEvent("click", (e) => {
			const cell = this.board.findCellFromElem(e.target);
			if (cell.isMarked() && !cell.isMine()) {
				this.interface.mineCounter.increment();
			}
			if (cell.isMine()) {
				this.board.revealAllMines();
				this.interface.stopTimer();
			}
		});

		this.board.addEvent(
			"click",
			() => {
				this.updateMineCounter();
				this.interface.startTimer();
			},
			{ once: true }
		);

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
			this.addMarginToBoard();
		});
	},
	methods: {
		addMarginToBoard() {
			this.interface.getWidth().then((height) => {
				this.board.style({
					margin: `${height + 30}px 30px 30px 30px`,
				});
			});
		},
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
