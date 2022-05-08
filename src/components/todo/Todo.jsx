import { ReactSVG } from 'react-svg'
import man from '../../assets/foto/man.jpg'
import todoTime from '../../assets/icons/todo-time.svg'
import './todo.css'

const Todo = () => {
  return (
    <div className='todoContainer'>
      <span className='todoTitle'>Following up the status of a certain patient</span>
      <div className='todoInfo'>
        <img className='todoPatientImg' src={man} alt='' />
        <img className='todoPatientImg' src={man} alt='' />
        <img className='todoPatientImg' src={man} alt='' />
        <ReactSVG className='todoTimeIcon' src={todoTime} />
        <span className='todoTime'>4:00PM</span>
      </div>
    </div>
  )
}

export default Todo
