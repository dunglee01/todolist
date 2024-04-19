import Image from 'next/image'
import React from 'react'

import TrashLogo from '../../assets/icons/trash.svg';
import EditLogo from '../../assets/icons/edit.svg';

export type TypeEditTask = 'checkbox' | 'edit' | 'delete'

type Props = {
    name: string,
    id: string,
    isDone: boolean,
    handleEditItemTask: (id: string, type: TypeEditTask  ,contentTask? : string) => void
    isEditItemTask: { id: string, isEdit: boolean }
    handleClickEdit: (id:string) => void
}

const ItemTodos = ({ name, id, isDone, handleEditItemTask, isEditItemTask, handleClickEdit}: Props) => {

    return (
        <div className='item-todos flexbox-center-full'>
            <div className='checkbox-item'><input type="checkbox" checked={isDone} onChange={() => handleEditItemTask(id, 'checkbox')} /></div>
            {id === isEditItemTask.id && isEditItemTask.isEdit ? <div><input className='editInput' type='text' value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditItemTask(id, 'edit', e.target.value)} /></div>  : <div className="content-todo" style={{ textDecoration: isDone ? 'line-through' : '' }}>{name}</div>}
            <div className="actions-todo flexbox-center-full">
                <div className="icon" onClick={() => handleClickEdit(id)}>
                    <Image src={EditLogo} width={25}
                        height={25} alt='trash' />
                </div>

                <div className="icon" onClick={() => handleEditItemTask(id, 'delete')}>
                    <Image src={TrashLogo} width={25}
                        height={25} alt='trash' />
                </div>
            </div>
        </div>
    )
}

export default ItemTodos