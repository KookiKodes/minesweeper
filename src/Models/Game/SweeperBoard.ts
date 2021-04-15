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
	},
	init({ cellValueTypes = this.cellValueTypes, cellType = this.cellType }) {
		this.cellValueTypes = cellValueTypes;
		this.cellType = cellType;

		this.generateBoard(() => {
			const rand = Math.round(Math.random() * 100);
			if (rand >= 80) {
				return this.cellValueTypes[1]();
			} else {
				return this.cellValueTypes[0]();
			}
		});

		this.updateMineAdjacents();
	},
	methods: {
		updateMineAdjacents() {
			const mines = Mine.getAllInstances();
			for (let mine of mines) {
				const { parent } = mine;
				parent.updateAdjacent(this.cells, (cell) => {
					if (cell.value.name !== "mine") {
						cell.value.increment();
					}
				});
			}
		},
	},
});
