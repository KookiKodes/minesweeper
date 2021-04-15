import "./styles/global.css";
import { SweeperBoard } from "./Models/Game/SweeperBoard";
// import { SweeperCell } from "./Models/Game/SweeperCell";
// import { Adjacent } from "./Models/Game/Adjacent";
// import { Mine } from "./Models/Game/Mine";

const app = document.querySelector(".app");
// const cellTypes = [Adjacent, Mine];

// for (let i = 0; i < 10; i++) {
// 	const random = Math.floor(Math.random() * 2);
// 	const cell = SweeperCell({
// 		className: "cell",
// 		size: 100,
// 		value: cellTypes[random](),
// 	});
// 	cell.renderElem(app);
// }

const board = SweeperBoard({ size: 30, className: "board" });
board.renderElem(app);
console.log(board);
