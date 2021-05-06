import stamp from "tp-stampit";
import "../../styles/cell.css";
import { Cell } from "../Helpers/Cell";
import { FlagMarker } from "./FlagMarker";

export const SweeperCell = stamp(Cell, {
	props: {
		marked: false,
		marker: FlagMarker,
		revealed: false,
	},
	init() {
		this.removeElem(this.value);
		this.marker = this.marker();
		this.marker.hideElem();
		this.appendElem(this.marker);
		this.addAttr(["index", this.index]);
	},
	methods: {
		reveal() {
			this.revealed = !this.revealed;
			this.removeElem(this.marker);
			this.appendElem(this.value);
			this.addClass("revealed");
			if (this.isMine()) this.addClass("is-mine");
			delete this.marker;
			delete this.marked;
		},
		updateValue(value) {
			this.value = value;
		},
		updateMark(modifier = false) {
			if (this.marker) {
				this.marked = !this.marked && !modifier;
				this.marked ? this.marker.showElem() : this.marker.hideElem();
			}
		},
		isRevealed() {
			return this.revealed;
		},
		isMine() {
			return this.value.name === "mine";
		},
		isEmpty() {
			return this.value.value === 0;
		},
		isMarked() {
			return this.marked;
		},
	},
	propertyDescriptors: {
		name: { value: "sweeper-cell" },
	},
});
