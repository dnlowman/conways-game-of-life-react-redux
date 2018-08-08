import { Cell } from './Cell';
import reducer, { initialState } from './reducer';

describe(`the root reducer`, () => {
    it(`should have an initial state of a 10 x 10 grid`, () => {
        // Then
        expect(initialState).toHaveProperty('grid');
        expect(initialState.grid.size).toBe(100);
        initialState.grid.forEach((cell: Cell) => expect(cell.get('isAlive')).toBe(false))
    })

    describe(`the NEXT_STEP action`, () => {
        it(`should return new state
            which adheres to the following:
            Any live cell with fewer than two live neighbors dies,
            as if by under population. `, () => {
                // Given
                const state = {
                    ...initialState
                };
                state.grid = state.grid.set(15, new Cell({
                    isAlive: true
                }))
                const action = {
                    type: 'NEXT_STEP'
                }

                // When
                const result = reducer(state, action)

                // Then
                expect(result).toHaveProperty('grid');
                expect(result.grid.size).toBe(100);
                result.grid.forEach((cell: Cell) => expect(cell.get('isAlive')).toBe(false))
            })

        it(`should return new state
            which adheres to the following:
            Any live cell with two or three
            live neighbors lives on to the
            next generation.`, () => {
                // Given
                const state = {
                    ...initialState
                };
                state.grid = state.grid.set(14, new Cell({
                    isAlive: true
                }))
                state.grid = state.grid.set(15, new Cell({
                    isAlive: true
                }))
                state.grid = state.grid.set(16, new Cell({
                    isAlive: true
                }))
                const action = {
                    type: 'NEXT_STEP'
                }

                // When
                const result = reducer(state, action)

                // Then
                expect(result).toHaveProperty('grid');
                expect(result.grid.size).toBe(100);
                expect(result.grid.get(15).get('isAlive')).toBe(true)
            })

        it(`should return new state
            which adheres to the following:
            Any live cell with more than three
            live neighbors dies, as if by overpopulation.`, () => {
                // Given
                const state = {
                    ...initialState
                };
                state.grid = state.grid.set(15 - 1, new Cell({
                    isAlive: true
                }))
                state.grid = state.grid.set(15, new Cell({
                    isAlive: true
                }))
                state.grid = state.grid.set(15 + 1, new Cell({
                    isAlive: true
                }))
                state.grid = state.grid.set(15 - 10, new Cell({
                    isAlive: true
                }))
                state.grid = state.grid.set(15 - 11, new Cell({
                    isAlive: true
                }))
                const action = {
                    type: 'NEXT_STEP'
                }

                // When
                const result = reducer(state, action)

                // Then
                expect(result).toHaveProperty('grid');
                expect(result.grid.size).toBe(100);
                expect(result.grid.get(15).get('isAlive')).toBe(false)
            })
        it(`should return new state
            which adheres to the following:
            Any dead cell with exactly three
            live neighbors becomes a live cell,
            as if by reproduction.`, () => {
                // Given
                const state = {
                    ...initialState
                };
                state.grid = state.grid.set(15 - 1, new Cell({
                    isAlive: true
                }))
                state.grid = state.grid.set(15, new Cell({
                    isAlive: false
                }))
                state.grid = state.grid.set(15 + 1, new Cell({
                    isAlive: true
                }))
                state.grid = state.grid.set(15 - 10, new Cell({
                    isAlive: true
                }))
                const action = {
                    type: 'NEXT_STEP'
                }

                // When
                const result = reducer(state, action)

                // Then
                expect(result).toHaveProperty('grid');
                expect(result.grid.size).toBe(100);
                expect(result.grid.get(15).get('isAlive')).toBe(true)
            })
    })
})