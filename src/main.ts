import "./styles/global.css";
import { SweeperBoard } from "./Models/Game/SweeperBoard";

const app = document.querySelector(".app");
const board = SweeperBoard({
	size: [10, 10],
	cellSize: 70,
	className: "board",
});
board.renderElem(app);
