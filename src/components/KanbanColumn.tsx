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
}) => (
    <div className="flex-1 min-w-full md:min-w-[250px]">
        <div className="flex flex-col w-full max-h-[calc(100vh-7rem)] px-2 py-4 text-black border-2 border-[#bad1e0] rounded-md bg-[#bad1e0]">
            <div className="flex items-center justify-between pb-1">
                <b>{columnTitles[title]}</b>
                <span className="flex items-center justify-center w-10 h-10 font-bold bg-white rounded-full">
                    {cards.length}
                </span>
            </div>
            <div className="h-full p-1 overflow-y-auto">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="p-1 mt-4 transition bg-white rounded-lg hover:shadow-lg"
                    >
                        <Card {...card} />
                        <div
                            key={index}
                            className="flex flex-col justify-between gap-2 mt-1"
                        >
                            <div>
                                <span className="font-semibold">Status: </span>
                                <select
                                    value={card.status}
                                    onChange={(e) =>
                                        onMoveCard(
                                            index,
                                            title as ColumnType,
                                            e.target.value as ColumnType
                                        )
                                    }
                                    className="p-1 text-white border rounded-md w-fit bg-slate-950"
                                >
                                    <option value="Unclaimed">Unclaimed</option>
                                    <option value="FirstContact">
                                        First Contact
                                    </option>
                                    <option value="PreparingWorkOffer">
                                        Preparing Work Offer
                                    </option>
                                    <option value="SendToTherapists">
                                        Send to Therapists
                                    </option>
                                </select>
                            </div>
                            <div className="flex justify-center gap-5 pb-2">
                                <button
                                    onClick={() =>
                                        onEdit(index, title as ColumnType)
                                    }
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() =>
                                        onDelete(index, title as ColumnType)
                                    }
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default KanbanColumn;
