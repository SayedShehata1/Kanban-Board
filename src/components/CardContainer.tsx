import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import Card from './Card.tsx';
import { Card as CardType } from './types';

type ColumnType =
    | 'Unclaimed'
    | 'FirstContact'
    | 'PreparingWorkOffer'
    | 'SendToTherapists';

const CardContainer: React.FC<{
    card: CardType;
    title: string;
    index: number;
    onMoveCard: (
        index: number,
        fromColumn: ColumnType,
        toColumn: ColumnType
    ) => void;
    onDelete: (index: number, fromColumn: ColumnType) => void;
    onEdit: (index: number, fromColumn: ColumnType) => void;
}> = ({ card, title, index, onMoveCard, onDelete, onEdit }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        // here we set the id of the draggable element and make it unique by title:column name and index
        id: `${title}-${index}`,
        data: { column: title, index }
    });

    const draggableStyle = {
        transform: CSS.Translate.toString(transform)
    };

    return (
        <div
            style={draggableStyle}
            className="p-1 mt-4 transition bg-white rounded-lg hover:shadow-lg"
        >
            <div ref={setNodeRef} {...listeners} {...attributes}>
                <Card {...card} title={title} index={index} />
            </div>
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
                        <option value="FirstContact">First Contact</option>
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
                        onClick={(e) => {
                            e.preventDefault();
                            onEdit(index, title as ColumnType);
                        }}
                        className="text-blue-500 hover:text-blue-700"
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
        </div>
    );
};

export default CardContainer;
