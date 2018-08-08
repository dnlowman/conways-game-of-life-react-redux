import * as React from 'react';
import { List } from '../../node_modules/immutable';
import { Cell } from '../Cell';
import './Grid.css'

export interface ICellProps {
    isAlive: boolean,
    onClick: () => void
}

const CellComponent: React.SFC<ICellProps> = ({ isAlive, onClick }) =>
    <div onClick={onClick} className='cell' style={{ width: (window.innerWidth / 10) - 5, backgroundColor: isAlive ? 'green' : 'red' }}>
        isAlive
    </div>

export interface IGridProps {
    cells: List<Cell>,
    toggleCellAlive: (index: number) => void,
    nextStep: () => void
}

const Grid: React.SFC<IGridProps> = ({ cells, toggleCellAlive, nextStep }) =>
    <div>
        <button onClick={nextStep}>Next Step</button>
        <div className='grid'>
            { cells.map((cell: Cell, index: number) => <CellComponent key={index} isAlive={cell.isAlive} onClick={toggleCellAlive.bind(null, index)} />) }
        </div>
    </div>

export default Grid