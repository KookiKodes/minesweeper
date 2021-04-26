import stamp from "tp-stampit";
import { EventHandler } from "./EventHandler";
import { Cell } from "./Cell";

export const Board = stamp(EventHandler, {
	props: {
		element: "div",
		size: [10, 10],
		cellValueTypes: [],
		cellType: Cell,
		cellSize: 25,
		cells: null,
	},
	init({
		size = this.size,
		cellValueTypes = this.cellValueTypes,
		cellType = this.cellType,
		cellSize = this.cellSize,
	}) {
		this.size = size;
		this.cellValueTypes = cellValueTypes;
		this.cellType = cellType;
		this.cellSize = cellSize;
		this.cells = [];

		this.addAttr(["id", this.name]);

		const [rows, cols] = this.size;

		this.style({ width: `${cols * this.cellSize}px` });
		this.style({ height: `${rows * this.cellSize}px` });
	},
	methods: {
		async generateBoard(genNewCellValue: (valueTypes) => Promise<any>) {
			const [rows, cols] = this.size;
			for (let i = 0; i < rows * cols; i++) {
				const newCellValue = await genNewCellValue(this.cellValueTypes);
				const newCell = this.cellType({
					value: newCellValue,
					size: this.cellSize,
					element: "li",
					className: "cell",
					index: i,
				});
				this.appendElem(newCell);
				this.cells.push(newCell);
			}
		},
	},
	propertyDescriptors: {
		name: { value: "board" },
	},
});
