import { List, Range } from 'immutable'
import { Cell } from './Cell';
import { NEXT_STEP, TOGGLE_CELL_ALIVE } from './constants';

export interface IState {
    columns: number,
    grid: List<Cell>
}

export const initialState: IState = Object.freeze({
    columns: 10,
    grid: Range(0, 100).map(x => new Cell({
        isAlive: false
    })).toList()
});

const getCellAtIndex: (grid: List<Cell>, index: number) => Cell = (grid, index) => grid.get(index, undefined)

export default function reducer(state: IState = initialState, action: any) {
    switch(action.type) {
        case TOGGLE_CELL_ALIVE: {
            const cell: Cell = state.grid.get(action.payload.index)
            if(!cell) {
                return state;
            }

            return {
                ...state,
                grid: state.grid.set(action.payload.index, cell.set('isAlive', !cell.get('isAlive')) as Cell)
            }
        }

        case NEXT_STEP: {
            return {
                ...state,
                grid: state.grid.map((cell: Cell, index: number) => {
                    if(!cell) {
                        return cell
                    }

                    const isAlive = cell.get('isAlive');
                    
                    const neighbours = List.of(
                        getCellAtIndex(state.grid, index - 1),
                        getCellAtIndex(state.grid, index + 1),
                        getCellAtIndex(state.grid, index - 10),
                        getCellAtIndex(state.grid, index - 11),
                        getCellAtIndex(state.grid, index - 12),
                        getCellAtIndex(state.grid, index + 10),
                        getCellAtIndex(state.grid, index + 11),
                        getCellAtIndex(state.grid, index + 12)
                    )
    
                    const amountOfAliveNeighbours = neighbours.reduce((reduction: number, neighbourCell: Cell) =>
                        neighbourCell && neighbourCell.get('isAlive') === true ? reduction + 1 : reduction, 0)

                    if(!isAlive && amountOfAliveNeighbours === 3) {
                        return cell.set('isAlive', true) 
                    }
                    else if(isAlive) {
                        if(amountOfAliveNeighbours < 2 || amountOfAliveNeighbours > 3) {
                            return cell.set('isAlive', false)
                        }
                        if(amountOfAliveNeighbours === 2 || amountOfAliveNeighbours === 3) {
                            return cell;
                        }
                    }
                    return cell
                })
            }
        }
    }

    return state;
}