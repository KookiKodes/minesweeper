import stamp from "tp-stampit";
import { Board } from "../Helpers/Board";
import { SweeperCell } from "./SweeperCell";
import { Mine } from "./Mine";
import { Adjacent } from "./Adjacent";
import "../../styles/board.css";

export const SweeperBoard = stamp(Board, {
	props: {
		cellValueTypes: [Adjacent, Mine],
		cellType: SweeperCell,
		cells: SweeperCell.getAllInstances(),
	},
	init() {
		this.generateBoard(async (cellValueType) => cellValueType[0]());

		this.addEvent("contextmenu", this.updateMarker.bind(this));
		this.addEvent("click", this.revealCell.bind(this));
	},
	methods: {
		updateMineAdjacents() {
			const mines = Mine.getAllInstances();
			for (let mine of mines) {
				const { parent } = mine;
				const adjacents = parent.getAdjacents();
				for (let adj of adjacents) {
					if (adj.value.name !== "mine") {
						adj.value.increment();
					}
				}
			}
		},
		isValid(min: number, max: number, dir: number): boolean {
			const [rows, cols] = this.size;
			if (dir < 0 || dir >= rows * cols) return false;
			return dir >= min && max >= dir;
		},
		updateMarker(e) {
			e.preventDefault();
			const cell = this.findCellFromElem(e.target);
			cell.updateMark();
		},
		revealCell(e) {
			e.preventDefault();
			const cell = this.findCellFromElem(e.target);
			cell.revealCell();
		},
		findCellFromElem(elem: Element): any {
			if (!elem.hasAttribute("index")) {
				return this.findCellFromElem(elem.parentNode);
			}
			const index = elem.getAttribute("index");
			return this.cells[index];
		},
		calcAdjacent(row: number, index: number): any[] {
			const adjacent: any[] = [];
			const [rows, cols] = this.size;
			const nw = index - cols - 1,
				n = index - cols,
				ne = index - cols + 1,
				w = index - 1,
				e = index + 1,
				sw = index + cols - 1,
				s = index + cols,
				se = index + cols + 1;

			if (this.isValid(row * cols - cols, rows * cols - 1, nw)) {
				adjacent.push(this.cells[nw]);
			}
			if (this.isValid(row * cols - cols, row * cols - 1, n)) {
				adjacent.push(this.cells[n]);
			}
			if (this.isValid(row * cols - cols, row * cols - 1, ne)) {
				adjacent.push(this.cells[ne]);
			}
			if (this.isValid(row * cols, row * cols + cols - 1, w)) {
				adjacent.push(this.cells[w]);
			}
			if (this.isValid(row * cols, row * cols + cols - 1, e)) {
				adjacent.push(this.cells[e]);
			}
			if (this.isValid(row * cols + cols, row * cols + cols + cols - 1, sw)) {
				adjacent.push(this.cells[sw]);
			}
			if (this.isValid(row * cols + cols, row * cols + cols + cols - 1, s)) {
				adjacent.push(this.cells[s]);
			}
			if (this.isValid(row * cols + cols, row * cols + cols + cols - 1, se)) {
				adjacent.push(this.cells[se]);
			}

			return adjacent;
		},
		determineAdjacent() {
			const [rows, cols] = this.size;

			for (let row = 0; row < rows; row++) {
				for (let col = 0; col < cols; col++) {
					// const index = row * cols + col,
					// 	cell = cells[index];
					// const adjacent = this.calcAdjacent(cells, row, index);
					// console.log(cell, adjacent);
				}
			}
		},
	},
	propertyDescriptors: {
		name: { value: "sweeper-board" },
	},
});
