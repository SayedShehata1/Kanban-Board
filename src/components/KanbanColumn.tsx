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
    onMoveCard: (
        index: number,
        column: ColumnType,
        newStatus: ColumnType
    ) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
    title,
    cards,
    onDelete,
    onEdit,
    onMoveCard
}) => (
    <div className="flex-1">
        <div className="flex justify-between px-3">
            <b>{title}</b> <span>{cards.length}</span>
        </div>
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
                        <select
                            value={card.status}
                            onChange={(e) =>
                                onMoveCard(
                                    index,
                                    title as ColumnType,
                                    e.target.value as ColumnType
                                )
                            }
                            className="p-1 ml-2 text-white border rounded-md bg-slate-950"
                        >
                            <option value="Unclaimed">Unclaimed</option>
                            <option value="FirstContact">First Contact</option>
                            <option value="PreparingWorkOffer">
                                Preparing Work Offer
                            </option>
                            <option value="SendToTherapists">
                                Send to Therapists
                            </option>
                        </select>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default KanbanColumn;
