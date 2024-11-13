import { useState } from 'react';
import Form from './components/Form.tsx';
import { FormValues, Card as CardType } from './components/types.ts';
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

    const onSubmit = (data: FormValues) => {
        const updatedCards = { ...cards };
        updatedCards.Unclaimed = [
            ...updatedCards.Unclaimed,
            { ...data, status: 'Unclaimed' }
        ];
        setCards(updatedCards);
    };

    return (
        <div className="min-h-screen p-5 bg-gray-800">
            <header className="flex flex-col items-center justify-center mb-8 text-2xl text-white">
                <b>Kanban Board</b>
            </header>

            <div className="flex flex-row text-white">
                {/* Form Section */}
                <Form onSubmit={onSubmit} />
                {/* Kanban Board Section */}
                <div className="flex flex-col w-full text-center">
                    <div className="flex flex-row justify-between h-full gap-2">
                        {(Object.keys(cards) as (keyof typeof cards)[]).map(
                            (columnName) => (
                                <KanbanColumn
                                    key={columnName}
                                    title={columnName}
                                    cards={cards[columnName]}
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
