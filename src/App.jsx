import React, { useEffect, useState } from 'react'
import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from './redux/todoApi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const { data } = useGetTodosQuery()
  const [addTodo,{ isSuccess: addSuccess }] = useAddTodoMutation()
  const [updateTodo,{ isSuccess: updateSuccess }] = useUpdateTodoMutation()
  const [deleetTodo,{ isSuccess: deleteSuccess }] = useDeleteTodoMutation()

  const [todoData, setTodoData] = useState({})
  const [selectedTodo, setSelectedTodo] = useState({})

  const handleChange = e => {
    const { name, value } = e.target
    setTodoData({ ...todoData, [name]: value })
  }
  const handleSubmit = e => {
    const { name, value } = e.target
    setSelectedTodo({ ...selectedTodo, [name]: value })
  }

  useEffect(() => {
    addSuccess && toast.success("Todo Create Success")

  }, [addSuccess])
  useEffect(() => {
    updateSuccess && toast.warn("Todo Update Success")

  }, [updateSuccess])
  useEffect(() => {
    deleteSuccess && toast.error("Todo Delete Success")

  }, [deleteSuccess])
  return <>
    <ToastContainer />

    <input onChange={handleChange} value={selectedTodo.name} type="text" name="name" placeholder='Enter name' />
    <input onChange={handleChange} value={selectedTodo.email} type="text" name="email" placeholder='Enter email' />
    <input onChange={handleChange} value={selectedTodo.password} type="text" name="password" placeholder='Enter password' />
    <button className="btn btn-primary" onClick={e => addTodo(todoData)}>Add Todo</button>

    <table className='table table-border table-hover'>
      <thead>
        <tr>
          <th>name</th>
          <th>email</th>
          <th>password</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          data && data.map(item => <tr>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.password}</td>
            <td>
              <button onClick={e => setSelectedTodo(item)} type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit</button>
              <button className="btn btn-danger" onClick={e => deleetTodo(item.id)}>Delete</button>
            </td>
          </tr>)
        }
      </tbody>
    </table >

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input onChange={handleSubmit} type="text" name="name" placeholder='Enter name' />
            <input onChange={handleSubmit} type="text" name="email" placeholder='Enter email' />
            <input onChange={handleSubmit} type="text" name="password" placeholder='Enter password' />
          </div>
          <div class="modal-footer">
            <button onClick={e => updateTodo(selectedTodo)} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Update Todo</button>

          </div>
        </div>
      </div>
    </div>
  </>
}

export default App