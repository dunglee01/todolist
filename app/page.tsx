
'use client'

import ItemTodos, { TypeEditTask } from '@/components/ItemTodos/ItemTodos';
import { ChangeEvent, FormEvent, FormEventHandler, useCallback, useEffect, useState } from 'react';

interface Task {
  id: string,
  name: string,
  isDone: boolean,
}

export default function Home() {
  const [task, setTask] = useState('')
  const [searchTask, setSearchTask] = useState('')
  const [listTask, setListTask] = useState<Task[]>([])
  const [listTaskFilter, setListTaskFilter] = useState<Task[]>([])
  const [isErrorText, setIsErrorText] = useState(false)
  const [isEditItemTask, setIsEditItemTask] = useState({
    id: '',
    isEdit: false
  })

  const handleChangeTask = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value)
    setIsErrorText(false)
  }

  const handleClickEdit = (id: string) => {
    setIsEditItemTask({
      id,
      isEdit: !isEditItemTask.isEdit
    })

  }

  const handleEditItemTask = (id: string, type: TypeEditTask, contentTask?: string) => {
    if (type === 'edit') {
      const updateListTasks = listTask.map(task => {
        if (task.id === id) {
          return {
            ...task,
            name: contentTask ?? task.name
          }
        } else {
          return task
        }
      })

      setListTask(updateListTasks)
    } else if (type === 'checkbox') {
      if (!id) {
        return
      }

      const updateListTasks = listTask.map(task => {
        if (task.id === id) {
          return {
            ...task,
            isDone: !task.isDone
          }
        } else {
          return task
        }
      })

      setListTask(updateListTasks)
    } else if (type === 'delete') {
      const updateListTasks = listTask.filter((task) => task.id !== id)
      setListTask(updateListTasks)
    }
  }

  const handleSearch = (contentTask: string) => {
    setSearchTask(contentTask)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // nếu task bằng rỗng thì k được thêm vào list task
    if (!task) {
      setIsErrorText(true)
      return
    }

    const newTask: Task = {
      id: Math.floor(Math.random() * 10000000000) + '',
      name: task,
      isDone: false
    }

    setListTask((prev) => ([...prev, newTask]))

    setTask('')
  }

  useEffect(() => {
    const updateTasks = listTask.filter(task => task.name.toLowerCase().includes(searchTask.toLowerCase()))
    setListTaskFilter(updateTasks)
  }, [searchTask])

  useEffect(() => {
    if(listTask.length !== listTaskFilter.length) {
      setListTaskFilter(listTask)
    }
  },[listTask])

  return (
    <div className="container flexbox-center-full">
      <div className="container-box">
        <div className="title-box flexbox-center-full">Todo List</div>

        <div className="body-box flexbox-center-full">
          <input type="text" value={searchTask} onChange={(e) => handleSearch(e.target.value)} placeholder="search todos" />

          {/* ITEM-TODOS */}
          <div className="list-todos">
            {listTask.length ? searchTask.length ? listTaskFilter.map((task: Task) =>
              <ItemTodos id={task.id} name={task.name} isDone={task.isDone} key={task.id} handleEditItemTask={handleEditItemTask} isEditItemTask={isEditItemTask} handleClickEdit={handleClickEdit} />
            ) : listTask.map((task: Task) =>
              <ItemTodos id={task.id} name={task.name} isDone={task.isDone} key={task.id} handleEditItemTask={handleEditItemTask} isEditItemTask={isEditItemTask} handleClickEdit={handleClickEdit} />
            ) : <div style={{ fontSize: '16px', color: "#fff" }} className='flexbox-center-full'>Task is empty</div>}
          </div>

          {/* FORM ADD TODO */}
          <div className="sub-title-box flexbox-center-full">Add a new Todo...</div>
          <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
            <input value={task} type='text' placeholder='Enter the task' onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeTask(e)} />
            <div style={{ color: "red", marginTop: '4px' }}>{isErrorText ? 'This field is required' : ''}</div>
            <div className='flexbox-center-full submit-box' id='search'><button>Add</button></div>
          </form>

        </div>

      </div>


    </div>
  );
}
