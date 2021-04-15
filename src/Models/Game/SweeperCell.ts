import stamp from "tp-stampit";
import "../../styles/cell.css";
import { Cell } from "../Helpers/Cell";
import { FlagMarker } from "./FlagMarker";

export const SweeperCell = stamp(Cell, {
	props: {
		marked: false,
		markerElem: null,
		revealed: false,
		name: "sweeper-cell",
	},
	init() {
		this.removeElem(this.value);
		this.markerElem = FlagMarker();

		// Marks unrevealed cell with a flag
		this.addEvent("contextmenu", (e) => {
			e.preventDefault();
			if (!this.revealed) {
				this.marked = !this.marked;
				this.marked ? this.addClass("marked") : this.remClass("marked");
				this.marked
					? this.appendElem(this.markerElem)
					: this.removeElem(this.markerElem);
			}
		});

		// Reveals cell content
		this.addEvent("click", this.revealCell.bind(this));
	},
	methods: {
		revealCell(e: Event) {
			e.preventDefault();
			if (!this.revealed) {
				this.revealed = !this.revealed;
				this.appendElem(this.value);
				this.addClass("revealed");
				if (this.marked) {
					this.removeElem(this.markerElem);
					this.remClass("marked");
				}
				if (this.value.name === "mine") {
					this.addClass("is-mine");
				} else if (this.value.value === 0) {
					setTimeout(() => {
						const cellGrid = SweeperCell.getAllInstances();
						this.updateAdjacent(cellGrid, (cell) => {
							if (cell.value.name !== "mine") {
								if (cell.value.value === 0) {
									this.revealCell.call(cell, e);
								}
							}
						});
					}, 1);
				}
			}
		},
		updateAdjacent(cellGrid: any[], fn) {
			const index = this.instanceIndex;
			const size = Math.sqrt(cellGrid.length);
			const adjacents = [
				index - size - 1,
				index - size,
				index - size + 1,
				index - 1,
				index + 1,
				index + size - 1,
				index + size,
				index + size + 1,
			];
			for (let index of adjacents) {
				const cell = cellGrid[index];
				if (cell) {
					console.log(index);
					fn(cell);
				}
			}
		},
	},
});
