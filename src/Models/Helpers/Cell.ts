import stamp from "tp-stampit";
import { EventHandler } from "./EventHandler";
import { Instance } from "./Instance";

export const Cell = stamp(EventHandler, Instance, {
	props: {
		value: null,
		element: "div",
		size: 25,
		name: "cell",
	},
	init({ value = this.value, size = this.size, index = this.index }) {
		this.value = value;
		this.appendElem(this.value);
		this.addAttr(["id", `${this.name}-${this.instanceIndex}`]);

		if (typeof size === "number") size = size + "px";
		this.size = size;
		this.style({ width: size, height: size });
	},
	methods: {
		addAdjacent(cell: typeof Cell): typeof Cell {
			if (!this.adjacent.has(cell.value.ID)) {
				this.adjacent.set(cell.value.ID, cell);
			}
			return cell;
		},
		removeAdjacent(cell: typeof Cell): typeof Cell {
			if (this.adjacent.has(cell.value.ID)) {
				this.adjacent.delete(cell.value.ID);
			}
			return cell;
		},
		getAdjacents(): typeof Cell[] {
			return this.adjacent;
		},
		isAdjacent(cell: typeof Cell): boolean {
			return this.adjacent.has(cell.value.ID);
		},
	},
});
