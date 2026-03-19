/* Node.js
 * Author: Aleesha Abdullah
 * Description: Represents a single cell/node in the pathfinding grid
 * Date: March 18, 2026
 */

class Node {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.isWall = false;
        this.isStart = false;
        this.isEnd = false;
        this.visited = false;
        this.parent = null;
    }

    /**
     * Resets all node properties to default values. Used when rebuilding the grid.
     */
    reset() {
        this.isWall = false;
        this.isStart = false;
        this.isEnd = false;
        this.visited = false;
        this.parent = null;
    }

    /**
     * Clears the visited flag and parent reference before a BFS run.
     */
    resetVisited() {
        this.visited = false;
        this.parent = null;
    }
}