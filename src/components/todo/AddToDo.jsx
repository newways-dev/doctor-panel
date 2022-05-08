import ProgressBar from '@ramonak/react-progress-bar'
import Todo from '../todo/Todo'
import add from '../../assets/icons/add.svg'
import './add-todo.css'
import { ReactSVG } from 'react-svg'

const AddToDo = () => {
  return (
    <div className='addTodoContainer'>
      <div className='addTodoWrapper'>
        <div className='addTodoTop'>
          <h2 className='addTodoTitle'>To Do</h2>
          <span className='addTaskButton'>
            <ReactSVG src={add} />
            Add new task
          </span>
        </div>
        <div className='addTodoProgress'>
          <div className='completedTop'>
            <span>Over All progress</span>
            <span>% 65 Completed</span>
          </div>
          <ProgressBar className='progressBar' completed={65} />
        </div>
        <div className='todosContainer'>
          <Todo />
          <Todo />
          <Todo />
        </div>
      </div>
    </div>
  )
}

export default AddToDo
