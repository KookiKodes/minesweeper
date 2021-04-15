import stamp from "tp-stampit";
import { ElementHandler } from "../View/ElementHandler";
import { Cell } from "./Cell";
import { Instance } from "./Instance";

export const Board = stamp(ElementHandler, Instance, {
	props: {
		element: "ul",
		size: 10,
		cellValueTypes: [],
		cellType: Cell,
		cells: null,
	},
	init({
		size = this.size,
		cellValueTypes = this.cellValueTypes,
		cellType = this.cellType,
	}) {
		this.size = size;
		this.cellValueTypes = cellValueTypes;
		this.cellType = cellType;
		this.cells = cellType.getAllInstances();

		this.addAttr(["id", `board-${this.instanceIndex}`]);

		this.style({ width: `${this.size ** 2}px` });
		this.style({ height: `${this.size ** 2}px` });
	},
	methods: {
		// Returns a new board, we do this so we can "save" the state of the previous board within the game component
		generateBoard(fn: () => any): typeof Board {
			const size = this.size;
			for (let i = 0; i < size ** 2; i++) {
				const newCellValue = fn();
				const newCell = this.cellType({
					value: newCellValue,
					size,
					element: "li",
					className: "cell",
				});

				if (newCellValue.hasOwnProperty("parent")) {
					newCellValue.setParent(newCell);
				}

				this.appendElem(newCell);
			}
		},
	},
	propertyDescriptors: {
		name: { value: "board" },
	},
});
