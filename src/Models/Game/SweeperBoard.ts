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
		lastClickedIndex: null,
		element: "ul",
	},
	init({ minePercentage = 0.21 }) {
		this.mines = [];
		this.generateBoard(async (cellValueType) => cellValueType[0]());

		this.addMines = this.addMines.bind(this, minePercentage);

		this.addEvent("contextmenu", this.updateMarker.bind(this));
		this.addEvent("click", this.revealCell.bind(this));
	},
	methods: {
		async updateMineAdjacents() {
			for (let cell of this.mines) {
				const { index } = cell;
				this.checkAndUpdateAdjacent(
					index,
					(cell) => !cell.isMine(),
					(cell) => cell.value.increment()
				);
			}
		},
		async updateMarker(e) {
			e.preventDefault();
			const cell = this.findCellFromElem(e.target);
			cell.updateMark();
		},
		updateEmptyAdjacents(cell, index: number, delay: number) {
			this.checkAndUpdateAdjacent(
				index,
				(adj) => cell.isEmpty() && !adj.isRevealed() && !adj.isEmpty(),
				(adj) => adj.reveal(),
				delay
			);
		},
		async revealAdjacentsIfEmpty(cell, index: number, delay: number) {
			if (!cell.isRevealed()) {
				cell.reveal();
				this.checkAndUpdateAdjacent(
					index,
					() => cell.isEmpty(),
					(adj, dir) => {
						this.revealAdjacentsIfEmpty(adj, dir, delay);
						this.updateEmptyAdjacents(adj, dir, delay);
					},
					delay
				);
			}
		},
		async revealCell(e) {
			if (Array.from(e.target.children).length !== this.cells.length) {
				const cell = this.findCellFromElem(e.target);
				this.lastClickedIndex = cell.index;
				if (this.firstClickIndex === null) {
					this.firstClickIndex = cell.index;
					this.addMines();
				}
				this.revealAdjacentsIfEmpty(cell, cell.index, 100);
			}
		},
		revealAllMines(delay: number = 0) {
			this.mines.forEach((mine) => {
				if (!mine.isRevealed()) {
					setTimeout(() => {
						mine.reveal();
					}, delay);
				}
			});
		},
		revealAll() {
			this.cells.forEach((cell) => {
				if (!cell.isRevealed()) {
					cell.reveal();
				}
			});
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
		async addMines(minePercentage?: number) {
			const [rows, cols] = this.size,
				maxMines = rows * cols * minePercentage,
				min = Math.ceil(0),
				max = Math.floor(this.cells.length),
				set = new Set(),
				cells = this.cells,
				index = this.firstClickIndex;

			for (let i = 0; i < maxMines; i++) {
				const rand = Math.floor(Math.random() * (max - min)),
					cell = cells[rand];
				if (!set.has(cell) && rand !== index) {
					//Checks to see if the cell is adjacent to the index that was firstClicked
					const isAdjacent = this.checkAdjacent(
						index,
						(adj, dir: number) => dir === rand
					);

					//If not adjacent set the value of the cell to a newly generated mine and push the cell into our array of mines.
					if (!isAdjacent) {
						cell.updateValue(Mine());
						this.mines.push(cell);
					}
				}

				//We add the space to the sett to prevent duplicates
				set.add(cell);
			}
			//Updates all of the tiles values if it's adjacent to a mine.
			this.updateMineAdjacents();
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
		checkAndUpdateAdjacent(
			index,
			check: (cell, dir: number) => boolean,
			cb: (cell, dir: number) => void,
			delay = 1
		): void {
			const row = Math.floor(index / this.size[1]),
				[nw, n, ne, w, e, sw, s, se] = this.getAdjIndex(index);

			if (this.isNorth(row, nw) && check(this.cells[nw], nw))
				setTimeout(() => cb(this.cells[nw], nw), delay);
			if (this.isNorth(row, n) && check(this.cells[n], n))
				setTimeout(() => cb(this.cells[n], n), delay);
			if (this.isNorth(row, ne) && check(this.cells[ne], ne))
				setTimeout(() => cb(this.cells[ne], ne), delay);
			if (this.isSameRow(row, w) && check(this.cells[w], w))
				setTimeout(() => cb(this.cells[w], w), delay);
			if (this.isSameRow(row, e) && check(this.cells[e], e))
				setTimeout(() => cb(this.cells[e], e), delay);
			if (this.isSouth(row, sw) && check(this.cells[sw], sw))
				setTimeout(() => cb(this.cells[sw], sw), delay);
			if (this.isSouth(row, s) && check(this.cells[s], s))
				setTimeout(() => cb(this.cells[s], s), delay);
			if (this.isSouth(row, se) && check(this.cells[se], se))
				setTimeout(() => cb(this.cells[se], se), delay);
		},
		getTotalMines(): number {
			return this.getAllMines().length;
		},
		getAllMines(): any[] {
			return this.mines;
		},
		getTotalMarkers(): number {
			return this.getAllMarked().length;
		},
		getAllMarked(): any[] {
			return this.cells.filter((cell) => cell.marked);
		},
	},
	propertyDescriptors: {
		name: { value: "sweeper-board" },
	},
});
