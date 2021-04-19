import stamp from "tp-stampit";
import "../../styles/cell.css";
import { Cell } from "../Helpers/Cell";
import { FlagMarker } from "./FlagMarker";
import { GraphNode } from "../Helpers/GraphNode";

export const SweeperCell = stamp(Cell, GraphNode, {
  props: {
    marked: false,
    markerElem: null,
    revealed: false,
    name: "sweeper-cell",
    size: [30, 30],
  },
  init({ size = this.size }) {
    this.removeElem(this.value);
    this.markerElem = FlagMarker();
    this.size = size;

    // Marks unrevealed cell with a flag
    this.addEvent("contextmenu", (e) => {
      e.preventDefault();
      if (!this.revealed) {
        this.marked = !this.marked;
        this.marked ? this.addClass("marked") : this.remClass("marked");
        this.marked
          ? this.appendElem(this.markerElem)
          : this.removeElem(this.markerElem);
      }
    });

    // Reveals cell content
    this.addEvent("click", this.revealCell.bind(this));
  },
  methods: {
    revealCell(e: Event) {
      e.preventDefault();
      if (!this.revealed) {
        this.revealed = !this.revealed;
        this.appendElem(this.value);
        this.addClass("revealed");
        if (this.marked) {
          this.removeElem(this.markerElem);
          this.remClass("marked");
        }
        if (this.value.name === "mine") {
          this.addClass("is-mine");
        } else if (this.value.value === 0) {
          setTimeout(() => {
            const cellGrid = SweeperCell.getAllInstances();
            this.updateAdjacent((cell) => {
              if (cell.value.name !== "mine") {
                if (cell.value.value === 0) {
                  this.revealCell.call(cell, e);
                }
              }
            });
          }, 10);
        }
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
  },
});
