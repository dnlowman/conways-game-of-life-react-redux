import { NEXT_STEP, TOGGLE_CELL_ALIVE } from "./constants";

export interface INextStepAction {
    type: NEXT_STEP
}

export const nextStep: () => INextStepAction = () => ({
    type: NEXT_STEP
})

export interface IToggleCellAlive {
    type: TOGGLE_CELL_ALIVE,
    payload: {
        index: number
    }
}

export const toggleCellAlive: (index: number) => IToggleCellAlive  = index => ({
    payload: {
        index
    },
    type: TOGGLE_CELL_ALIVE
})