import React,{useEffect, useRef, useState} from 'react'
import { Todo } from './Model'
import { SquarePen, Trash, Check } from 'lucide-react';

type Props = {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}


const SingleTodo = ({ todo, todos, setTodos }: Props) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)


    const handleDone = (id: number) => {
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo))
    }

    const handleDelete=(id:number)=>{
      setTodos(todos.filter((todo)=>todo.id!==id))
    }

    const handleEdit = (e:React.FormEvent, id:number)=>{
        e.preventDefault();
        setTodos(
            todos.map((todo)=>(todo.id===id ?{...todo,todo:editTodo}:todo))
        );
        setEdit(false);
    }

    const inputRef= useRef<HTMLInputElement>(null)
    
    useEffect(() => {
      inputRef.current?.focus();

    }, [edit])
    

    return (
        <form className="flex justify-between gap-8 bg-yellow-200 min-h-[50px] items-center p-2 rounded-md max-w-[300px] flex-wrap m-2"
        onSubmit={(e)=>handleEdit(e,todo.id)}
        >

          
         {
            edit?(
                  <input className='rounded-md'
                  ref={inputRef}
                  value={editTodo}
                  onChange={(e)=>setEditTodo(e.target.value)}
                  />
            ):(
                todo.isDone? (
               <span className='line-through break-words whitespace-normal overflow-hidden p-2'>{todo.todo}</span>
            ):
            (
                 <span className=' break-words whitespace-normal overflow-hidden p-2'>{todo.todo}</span>
            )
            )
         }

        

          

           
            <div className='flex gap-2'>
                <span className=''>
                    <SquarePen onClick={()=>{
                        if(!edit && !todo.isDone){
                            setEdit(!edit)
                        }
                    }}/>
                </span>
                <span className='' onClick={()=>handleDelete(todo.id)}>
                    <Trash />
                </span>
                <span className='' onClick={() => handleDone(todo.id)}>
                    <Check />
                </span>
            </div>

        </form>
    )
}

export default SingleTodo