import React from 'react';
import CardContainer from './CardContainer';
import { Card as CardType } from './types';
import { useDroppable } from '@dnd-kit/core';

type ColumnType =
    | 'Unclaimed'
    | 'FirstContact'
    | 'PreparingWorkOffer'
    | 'SendToTherapists';

interface KanbanColumnProps {
    title: string;
    cards: CardType[];
    onDelete: (index: number, column: ColumnType) => void;
    onEdit: (index: number, column: ColumnType) => void;
    onMoveCard: (
        index: number,
        column: ColumnType,
        newStatus: ColumnType
    ) => void;
}
const columnTitles: { [key: string]: string } = {
    Unclaimed: 'Unclaimed',
    FirstContact: 'First Contact',
    PreparingWorkOffer: 'Preparing Work Offer',
    SendToTherapists: 'Sent to Therapists'
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({
    title,
    cards,
    onDelete,
    onEdit,
    onMoveCard
}) => {
    const { setNodeRef: droppableNode, isOver } = useDroppable({ id: title });
    const droppableStyle = {
        opacity: isOver ? 0.5 : 1
    };

    return (
        <div
            className="flex-1 min-w-full md:min-w-[250px]"
            ref={droppableNode}
            style={droppableStyle}
        >
            <div className="flex flex-col w-full max-h-[calc(100vh-7rem)] px-2 py-4 text-black border-2 border-[#bad1e0] rounded-md bg-[#bad1e0]">
                <div className="flex items-center justify-between pb-1">
                    <b>{columnTitles[title]}</b>
                    <span className="flex items-center justify-center w-10 h-10 font-bold bg-white rounded-full">
                        {cards.length}
                    </span>
                </div>
                <div className="h-full p-1 overflow-y-auto">
                    {cards.map((card, index) => (
                        <CardContainer
                            key={index}
                            card={card}
                            title={title}
                            index={index}
                            onMoveCard={onMoveCard}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default KanbanColumn;
