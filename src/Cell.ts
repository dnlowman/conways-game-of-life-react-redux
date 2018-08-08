import { Record } from 'immutable';

export interface ICell {
    isAlive: boolean
}

export class Cell extends Record({ isAlive: false }) {
    public isAlive: boolean;

    constructor(params?: ICell) {
        params ? super(params) : super();
    }

    public with(values: ICell) {
        return this.merge(values) as this;
    }
}