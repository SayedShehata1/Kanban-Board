function App() {
    return (
        <div className="min-h-screen p-5 bg-gray-800">
            <header className="flex flex-col items-center justify-center mb-8 text-2xl text-white">
                <b>Kanban Board</b>
            </header>

            <div className="flex flex-row text-white">
                {/* Form Section */}
                {/* Kanban Board Section */}
                <div className="flex flex-col w-full text-center">
                    <div className="flex flex-row justify-between h-full gap-2">
                        <div className="flex-1">
                            <b>Unclaimed</b>
                            <div className="h-full mt-2 bg-blue-500 border border-white"></div>
                        </div>
                        <div className="flex-1">
                            <b>First Contact</b>
                            <div className="h-full mt-2 bg-blue-500 border border-white"></div>
                        </div>
                        <div className="flex-1">
                            <b>Preparing Work Offer</b>
                            <div className="h-full mt-2 bg-blue-500 border border-white"></div>
                        </div>
                        <div className="flex-1">
                            <b>Send to Therapists</b>
                            <div className="h-full mt-2 bg-blue-500 border border-white"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
