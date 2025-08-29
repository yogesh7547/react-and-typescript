import React, { useRef } from 'react'

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}


const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {

    const inputRef = useRef<HTMLInputElement>(null)



    return (
        <form className='flex flex-col items-center gap-5 p-10'
            onSubmit={(e) => {
                handleAdd(e);
                inputRef.current?.blur();
            }}>
            <input
                ref={inputRef}
                type="input"
                placeholder="input"
                className='rounded-md w-[100px] h-10 text-center'
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button className='w-[50px] border-2 h-10 rounded-md'>
                go
            </button>
        </form>
    )
}

export default InputField