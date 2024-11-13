import React from 'react';
import Card from './Card';
import { Card as CardType } from './types';

interface KanbanColumnProps {
    title: string;
    cards: CardType[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, cards }) => (
    <div className="flex-1">
        <b>{title}</b>
        <div className="h-full p-2 mt-2 bg-blue-500 border border-white">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="p-4 mb-4 text-black bg-white rounded-md shadow-md"
                >
                    <Card {...card} />
                </div>
            ))}
        </div>
    </div>
);

export default KanbanColumn;
