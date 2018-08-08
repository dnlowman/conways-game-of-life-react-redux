import { connect } from 'react-redux'
import { nextStep, toggleCellAlive } from '../actionCreators';
import Grid from '../components/Grid';
import { IState } from '../reducer';

const mapStateToProps = (state: IState) => ({
    cells: state.grid
})

const mapDispatchToProps = {
    nextStep,
    toggleCellAlive
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid)