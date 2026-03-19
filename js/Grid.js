/* Grid.js
 * Author: Aleesha Abdullah
 * Description: Manages a 2D grid of Node objects for the pathfinding game
 * Date: March 18, 2026 */

class Grid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.start = null;
        this.end = null;
        this.build();
    }

    /**
     * Builds the 2D grid array with fresh Node instances and clears start/end.
     */
    build() {
        this.grid = [];
        for (let r = 0; r < this.rows; r++) {
            this.grid[r] = [];
            for (let c = 0; c < this.cols; c++) {
                this.grid[r][c] = new Node(r, c);
            }
        }
        this.start = null;
        this.end = null;
    }

    /**
     * Resets the grid to a blank state by rebuilding all nodes.
     */
    reset() {
        this.build();
    }

    /**
     * Clears the visited flag and parent on every node before a BFS run.
     */
    resetVisited() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                this.grid[r][c].resetVisited();
            }
        }
    }

    /**
     * Marks the node at (row, col) as the start node.
     * @param {number} row - Row index of the start node.
     * @param {number} col - Column index of the start node.
     */
    setStart(row, col) {
        if (this.start) {
            this.start.isStart = false;
        }
        this.start = this.grid[row][col];
        this.start.isStart = true;
        this.start.isWall = false;
    }

    /**
     * Marks the node at (row, col) as the end node.
     * @param {number} row - Row index of the end node.
     * @param {number} col - Column index of the end node.
     */
    setEnd(row, col) {
        if (this.end) {
            this.end.isEnd = false;
        }
        this.end = this.grid[row][col];
        this.end.isEnd = true;
        this.end.isWall = false;
    }

    /**
     * Toggles the wall state of the node at (row, col). Ignores start/end nodes.
     * @param {number} row - Row index of the target node.
     * @param {number} col - Column index of the target node.
     */
    toggleWall(row, col) {
        const node = this.grid[row][col];
        if (node.isStart || node.isEnd) return;
        node.isWall = !node.isWall;
    }

    /**
     * Returns the up/down/left/right neighbours of a node (no diagonals).
     * @param {Node} node - The node whose neighbours to retrieve.
     * @returns {Node[]} Array of valid neighbouring nodes.
     */
    getNeighbours(node) {
        const neighbours = [];
        const { row, col } = node;
        if (row > 0)               neighbours.push(this.grid[row - 1][col]);
        if (row < this.rows - 1)   neighbours.push(this.grid[row + 1][col]);
        if (col > 0)               neighbours.push(this.grid[row][col - 1]);
        if (col < this.cols - 1)   neighbours.push(this.grid[row][col + 1]);
        return neighbours;
    }
}