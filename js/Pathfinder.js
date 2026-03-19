/* Pathfinder.js
 * Author: Aleesha Abdullah
 * Description: Implements BFS pathfinding algorithm on a Grid instance
 * Date: March 18, 2026
 */

class Pathfinder {
    /**
     * Runs BFS from grid.start to grid.end on the given Grid instance.
     * @param {Grid} grid - The grid to search. Must have start and end set.
     * @returns {{ visited: Node[], path: Node[] }} Explored nodes and shortest path.
     */
    bfs(grid) {
        grid.resetVisited();

        const visited = [];
        const queue = [];

        const start = grid.start;
        const end = grid.end;

        if (!start || !end) return { visited: [], path: [] };

        start.visited = true;
        queue.push(start);

        while (queue.length > 0) {
            const current = queue.shift();
            visited.push(current);

            if (current === end) {
                return { visited, path: this._tracePath(end) };
            }

            const neighbours = grid.getNeighbours(current);
            for (const neighbour of neighbours) {
                if (!neighbour.visited && !neighbour.isWall) {
                    neighbour.visited = true;
                    neighbour.parent = current;
                    queue.push(neighbour);
                }
            }
        }

        // No path found
        return { visited, path: [] };
    }

    /**
     * Traces the path from end back to start using parent references.
     * @param {Node} endNode - The end node after BFS has completed.
     * @returns {Node[]} Ordered array of nodes from start to end.
     */
    _tracePath(endNode) {
        const path = [];
        let current = endNode;
        while (current !== null) {
            path.unshift(current);
            current = current.parent;
        }
        return path;
    }
}