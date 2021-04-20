import stamp from "tp-stampit";
import "../../styles/cell.css";
import { Cell } from "../Helpers/Cell";
import { FlagMarker } from "./FlagMarker";

export const SweeperCell = stamp(Cell, {
	props: {
		marked: false,
		markerElem: FlagMarker,
		revealed: false,
	},
	init() {
		this.removeElem(this.value);
		this.markerElem = this.markerElem();
		this.addAttr(["index", this.instanceIndex]);
	},
	methods: {
		revealCell() {
			if (!this.revealed) {
				this.updateMark(true);
				this.updateRevealed();
			}
		},
		updateAdjacent(fn: (cell: any) => void) {
			const adjacents = this.getAdjacents();
			for (let cell of adjacents) {
				if (this.value.UNIQUE_ID !== cell.value.UNIQUE_ID) {
					fn(cell);
				}
			}
		},
		updateMark(modifier = false) {
			if (!this.revealed) {
				this.marked = !this.marked && !modifier;
				this.marked ? this.addClass("marked") : this.remClass("marked");
				this.marked
					? this.appendElem(this.markerElem)
					: this.removeElem(this.markerElem);
			}
		},
		updateRevealed() {
			this.revealed = !this.revealed;
			this.appendElem(this.value);
			this.addClass("revealed");
		},
	},
	propertyDescriptors: {
		name: { value: "sweeper-cell" },
	},
});
