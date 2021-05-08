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
	init({ size = 0 }) {
		this.removeElem(this.value);
		this.marker = this.marker();
		this.marker.hideElem();
		this.appendElem(this.marker);
		this.addAttr(["index", this.index]);
		this.initDynamicStyling();
	},
	methods: {
		reveal() {
			this.revealed = !this.revealed;
			this.removeElem(this.marker);
			this.appendElem(this.value);
			this.addClass("revealed");
			if (this.isMine()) this.addClass("is-mine");
		},
		initDynamicStyling() {
			this.value.style({
				fontSize: `${Math.round(this.size * 0.7)}px`,
			});
			this.style({
				borderRight: `${Math.round(this.size * 0.1)}px outset var(--prim-100)`,
				borderBottom: `${Math.round(this.size * 0.1)}px outset var(--prim-100)`,
				borderTop: `${Math.round(this.size * 0.1)}px inset var(--prim-600)`,
				borderLeft: `${Math.round(this.size * 0.1)}px outset var(--prim-600)`,
			});
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
