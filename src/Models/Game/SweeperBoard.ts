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
		mines: null,
		firstClickIndex: null,
		element: "ul",
	},
	init() {
		this.mines = [];
		this.generateBoard(async (cellValueType) => cellValueType[0]());

		this.addEvent("contextmenu", this.updateMarker.bind(this));
		this.addEvent("click", this.revealCell.bind(this));
	},
	methods: {
		async updateMineAdjacents() {
			for (let mine of this.mines) {
				const { index } = mine.parent;
				this.calcAdjacent(index, (cell) => {
					if (!cell.isMine()) {
						cell.value.increment();
					}
				});
			}
		},
		async updateMarker(e) {
			e.preventDefault();
			const cell = this.findCellFromElem(e.target);
			cell.updateMark();
		},
		// Depth will be considered as the distance from an empty cell. If the depth is 0 than only empty cells would be displayed. If the depth is 1 then adjacent cells that are 1 away from the empty cells would be displayed.
		async revealAdjacents(cell, index, depth = 0) {
			//Need to determine algorithm for depth
			if (!cell.isRevealed() && cell.isEmpty()) {
				cell.reveal();
				this.calcAdjacent(index, (cell, index) => {
					const tempDepth = depth;
					this.revealAdjacents(cell, index, tempDepth);
				});
			}
		},
		async revealCell(e) {
			if (Array.from(e.target.children).length !== this.cells.length) {
				const cell = this.findCellFromElem(e.target);
				if (this.firstClickIndex === null) {
					this.firstClickIndex = cell.index;
					this.addMines();
					this.revealAdjacents(cell, cell.index, 1);
				} else {
					this.revealAdjacents(cell, cell.index);
					cell.reveal();
				}
			}
		},
		printCellTypeTotals() {
			const result = this.cells.reduce(
				(obj, cell) => {
					if (cell.isMine()) obj.mine++;
					else if (cell.isEmpty()) obj.empty++;
					else obj[cell.value.value]++;
					return obj;
				},
				{ mine: 0, empty: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
			);
			console.table(result);
		},
		async addMines() {
			const [rows, cols] = this.size,
				maxMines = Math.round(
					(rows *
						cols *
						Math.abs(
							((Math.sin(rows) * Math.cos(cols)) / Math.cos(rows)) *
								Math.sin(cols)
						)) /
						Math.PI
				),
				min = Math.ceil(0),
				max = Math.floor(this.cells.length),
				set = new Set(),
				cells = this.cells,
				index = this.firstClickIndex;

			for (let i = 0; i < maxMines; i++) {
				const rand = Math.floor(Math.random() * (max - min)),
					cell = cells[rand];
				if (!set.has(cell) && rand !== index) {
					const isAdjacent = this.checkAdjacent(
						index,
						(cell, dir: number) => dir === rand
					);
					if (!isAdjacent) {
						cell.updateValue(Mine({ parent: cell }));
						this.mines.push(cell.value);
					}
				}
				set.add(cell);
			}
			await this.updateMineAdjacents();
		},
		findCellFromElem(elem: Element): any {
			if (!elem.hasAttribute("index")) {
				return this.findCellFromElem(elem.parentNode);
			}
			const index = elem.getAttribute("index");
			return this.cells[index];
		},
		getAdjIndex(index: number): number[] {
			const cols = this.size[1];
			return [
				index - cols - 1,
				index - cols,
				index - cols + 1,
				index - 1,
				index + 1,
				index + cols - 1,
				index + cols,
				index + cols + 1,
			];
		},
		isValid(min: number, max: number, dir: number): boolean {
			const [rows, cols] = this.size;
			return dir >= min && max >= dir && dir >= 0 && dir < rows * cols;
		},
		isNorth(row: number, dir: number): boolean {
			const cols = this.size[1];
			return this.isValid(row * cols - cols, row * cols - 1, dir);
		},
		isSameRow(row: number, dir: number): boolean {
			const cols = this.size[1];
			return this.isValid(row * cols, row * cols + cols - 1, dir);
		},
		isSouth(row: number, dir: number): boolean {
			const cols = this.size[1];
			return this.isValid(row * cols + cols, row * cols + cols * 2 - 1, dir);
		},
		calcAdjacent(index: number, cb: (cell: any, index?: number) => void): void {
			const row = Math.floor(index / this.size[1]),
				[nw, n, ne, w, e, sw, s, se] = this.getAdjIndex(index);

			if (this.isNorth(row, nw)) setTimeout(() => cb(this.cells[nw], nw), 1);
			if (this.isNorth(row, n)) setTimeout(() => cb(this.cells[n], n), 1);
			if (this.isNorth(row, ne)) setTimeout(() => cb(this.cells[ne], ne), 1);
			if (this.isSameRow(row, w)) setTimeout(() => cb(this.cells[w], w), 1);
			if (this.isSameRow(row, e)) setTimeout(() => cb(this.cells[e], e), 1);
			if (this.isSouth(row, sw)) setTimeout(() => cb(this.cells[sw], sw), 1);
			if (this.isSouth(row, s)) setTimeout(() => cb(this.cells[s], s), 1);
			if (this.isSouth(row, se)) setTimeout(() => cb(this.cells[se], se), 1);
		},
		checkAdjacent(
			index: number,
			check: (cell, dir: number) => boolean
		): boolean {
			const row = Math.floor(index / this.size[1]),
				[nw, n, ne, w, e, sw, s, se] = this.getAdjIndex(index);

			if (this.isNorth(row, nw) && check(this.cells[nw], nw)) return true;
			if (this.isNorth(row, n) && check(this.cells[n], n)) return true;
			if (this.isNorth(row, ne) && check(this.cells[ne], ne)) return true;
			if (this.isSameRow(row, w) && check(this.cells[w], w)) return true;
			if (this.isSameRow(row, e) && check(this.cells[e], e)) return true;
			if (this.isSouth(row, sw) && check(this.cells[sw], sw)) return true;
			if (this.isSouth(row, s) && check(this.cells[s], s)) return true;
			if (this.isSouth(row, se) && check(this.cells[se], se)) return true;

			return false;
		},
	},
	propertyDescriptors: {
		name: { value: "sweeper-board" },
	},
});
