/* eslint-disable no-shadow */
import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'

const Board = ({ data, set = null, handleDrag = null }) => {
    const [columns, setColumns] = useState(data)
    const onDragEnd = result => {
        if (!result.destination) return
        const { source, destination, draggableId } = result
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId]
            const destColumn = columns[destination.droppableId]
            const sourceItems = [...sourceColumn.items]
            const destItems = [...destColumn.items]
            const [removed] = sourceItems.splice(source.index, 1)
            destItems.splice(destination.index, 0, removed)
            setColumns({
                ...columns,
                [source.droppableId]: { ...sourceColumn, items: sourceItems },
                [destination.droppableId]: { ...destColumn, items: destItems },
            })
        } else {
            const column = columns[source.droppableId]
            const copiedItems = [...column.items]
            const [removed] = copiedItems.splice(source.index, 1)
            copiedItems.splice(destination.index, 0, removed)
            setColumns({ ...columns, [source.droppableId]: { ...column, items: copiedItems } })
        }
        set({ source: source.droppableId, destination: destination.droppableId, draggable: draggableId })
        handleDrag()
    }
    return (
        <div className='max-w-full overflow-auto mb-14'>
            <div className='flex px-2 overflow-scroll h-screen'>
                <DragDropContext onDragEnd={result => onDragEnd(result)}>
                    {Object.entries(columns).map(([columnId, column]) => (
                        <div className='flex flex-col' key={columnId}>
                            <div className='my-1 mx-2'>
                                <Droppable droppableId={`${columnId}`} key={columnId}>
                                    {(provided, snapshot) => (
                                        <div
                                            className={`${
                                                snapshot.isDraggingOver ? 'bg-gray-200' : 'bg-[#edfdfb]'
                                            } p-2 border border-gray-200 min-h-screen w-64`}
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            <p className='text-sm font-bold text-gray-500'>{column.name}</p>
                                            {column.items.map((item, index) => (
                                                <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`select-none p-0.5 my-2 min-h-fit rounded-md ${
                                                                snapshot.isDragging && 'border border-[#263B4A]'
                                                            }`}
                                                            style={{ ...provided.draggableProps.style }}
                                                        >
                                                            {item.content}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        </div>
                    ))}
                </DragDropContext>
            </div>
        </div>
    )
}
export default Board
