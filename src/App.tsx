import { useEffect, useState } from 'react';
import Form from './components/Form.tsx';
import { FormValues, Card as CardType } from './components/types.ts';
//  DndContext for drag-and-drop
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import KanbanColumn from './components/KanbanColumn.tsx';

function App() {
    const [cards, setCards] = useState<{
        Unclaimed: CardType[];
        FirstContact: CardType[];
        PreparingWorkOffer: CardType[];
        SendToTherapists: CardType[];
    }>({
        Unclaimed: [],
        FirstContact: [],
        PreparingWorkOffer: [],
        SendToTherapists: []
    });

    const [editMode, setEditMode] = useState<boolean>(false);
    const [currentCardIndex, setCurrentCardIndex] = useState<number | null>(
        null
    );
    const [currentCardColumn, setCurrentCardColumn] = useState<
        keyof typeof cards | null
    >(null);
    const [defaultValue, setDefaultValue] = useState<FormValues | null>(null);

    // load saved cards from local storage
    useEffect(() => {
        const savedCards = localStorage.getItem('kanbanCards');
        if (savedCards) setCards(JSON.parse(savedCards));
    }, []);

    // handle form submission
    const onSubmit = (data: FormValues) => {
        const updatedCards = { ...cards };

        if (editMode && currentCardIndex !== null && currentCardColumn) {
            // Update the card in edit mode
            updatedCards[currentCardColumn][currentCardIndex] = {
                ...data,
                status: currentCardColumn
            };
        } else {
            // Add a new card in add mode
            updatedCards.Unclaimed = [
                ...updatedCards.Unclaimed,
                { ...data, status: 'Unclaimed' }
            ];
        }

        setCards(updatedCards);
        localStorage.setItem('kanbanCards', JSON.stringify(updatedCards));
        setEditMode(false);
        setCurrentCardIndex(null);
        setCurrentCardColumn(null);
        setDefaultValue(null);
    };

    // handle delete card
    const handleDelete = (index: number, column: keyof typeof cards) => {
        const updatedCards = { ...cards };
        updatedCards[column].splice(index, 1);
        setCards(updatedCards);
        localStorage.setItem('kanbanCards', JSON.stringify(updatedCards));
    };

    // handle edit card
    const handleEdit = (index: number, column: keyof typeof cards) => {
        const card = cards[column][index];
        setEditMode(true);
        setCurrentCardIndex(index);
        setCurrentCardColumn(column);
        setDefaultValue(card);
    };

    // handle move card (status change)
    const moveCard = (
        index: number,
        column: keyof typeof cards,
        newStatus: keyof typeof cards
    ) => {
        const updatedCards = { ...cards };
        const card = updatedCards[column].splice(index, 1)[0];
        card.status = newStatus;
        updatedCards[newStatus].push(card);
        setCards(updatedCards);
        localStorage.setItem('kanbanCards', JSON.stringify(updatedCards));
    };

    // drag-and-drop functionality
    const handleDrag = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over) {
            // The column that we currently in
            const activeColumn = active.data.current
                ?.column as keyof typeof cards;
            // The index of the card that dragged
            const activeIndex = active.data.current?.index;
            // The column that we dropped into
            const overColumn = over.id as keyof typeof cards;

            if (activeColumn !== overColumn && activeIndex !== undefined) {
                const updatedCards = { ...cards };
                const movedCard = updatedCards[activeColumn].splice(
                    activeIndex,
                    1
                )[0];
                movedCard.status = overColumn;

                updatedCards[overColumn].push(movedCard);
                setCards(updatedCards);
                localStorage.setItem(
                    'kanbanCards',
                    JSON.stringify(updatedCards)
                );
            }
        }
    };

    return (
        <div className="min-h-screen p-3 bg-[#d3e5ed]">
            <header className="flex flex-col items-center justify-center mb-8 text-2xl text-black">
                <b>Kanban Board</b>
            </header>

            <div className="flex flex-col text-black md:flex-row md:space-x-4">
                {/* Form Section */}
                <Form
                    onSubmit={onSubmit}
                    editMode={editMode}
                    defaultValue={defaultValue}
                />
                <span className="hidden mr-2 border-2 md:inline-block border-l-blue-400"></span>
                {/* Kanban Board Section */}
                <div className="flex flex-col w-full text-center">
                    <DndContext onDragEnd={handleDrag}>
                        <div className="flex flex-col flex-wrap justify-between h-full gap-4 lg:flex-row">
                            {(Object.keys(cards) as (keyof typeof cards)[]).map(
                                (columnName) => (
                                    <KanbanColumn
                                        key={columnName}
                                        title={columnName}
                                        cards={cards[columnName]}
                                        onDelete={handleDelete}
                                        onEdit={handleEdit}
                                        onMoveCard={moveCard}
                                    />
                                )
                            )}
                        </div>
                    </DndContext>
                </div>
            </div>
        </div>
    );
}

export default App;
