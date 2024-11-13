import React from 'react';
import Card from './Card';
import { Card as CardType } from './types';

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
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
    title,
    cards,
    onDelete,
    onEdit
}) => (
    <div className="flex-1">
        <b>{title}</b>
        <div className="h-full p-2 mt-2 bg-blue-500 border border-white">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="p-4 mb-4 text-black bg-white rounded-md shadow-md"
                >
                    <Card {...card} />
                    <div
                        key={index}
                        className="p-4 mb-4 text-black bg-white rounded-md shadow-md"
                    >
                        <button
                            onClick={() => onEdit(index, title as ColumnType)}
                            className="mx-2 text-blue-500 hover:text-blue-700"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(index, title as ColumnType)}
                            className="text-red-500 hover:text-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default KanbanColumn;
