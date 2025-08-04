const LibraryNavigation = ({ 
    libraries, 
    activeLibraryId, 
    setActiveLibraryId, 
    newLibraryName, 
    setNewLibraryName, 
    onAddLibrary 
}) => {
    const { React } = window;
    const { Plus } = lucide;
    
    const gradients = [
        'from-rose-400 to-pink-400',
        'from-orange-400 to-amber-400', 
        'from-yellow-400 to-lime-400',
        'from-green-400 to-emerald-400',
        'from-teal-400 to-cyan-400',
        'from-sky-400 to-blue-400',
        'from-indigo-400 to-violet-400',
        'from-purple-400 to-fuchsia-400'
    ];
    
    return React.createElement('div', {
        className: "glass-card rounded-xl shadow-sm p-4 mb-6 border border-rose-200/50"
    }, [
        React.createElement('div', {
            key: 'header',
            className: "flex items-center justify-between mb-4"
        }, [
            React.createElement('h2', {
                key: 'title',
                className: "text-lg font-semibold text-gray-800"
            }, "My Libraries"),
            React.createElement('div', {
                key: 'controls',
                className: "flex items-center space-x-2"
            }, [
                React.createElement('input', {
                    key: 'input',
                    type: "text",
                    value: newLibraryName,
                    onChange: (e) => setNewLibraryName(e.target.value),
                    placeholder: "New library name...",
                    className: "px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-400 focus-ring",
                    onKeyPress: (e) => e.key === 'Enter' && onAddLibrary()
                }),
                React.createElement('button', {
                    key: 'button',
                    onClick: onAddLibrary,
                    className: "px-3 py-1.5 text-sm bg-gradient-to-r from-rose-400 to-pink-400 text-white rounded-lg hover:from-rose-500 hover:to-pink-500 transition-colors shadow-sm focus-ring"
                }, [
                    React.createElement(Plus, {
                        key: 'icon',
                        className: "w-3 h-3 inline mr-1"
                    }),
                    "Add Library"
                ])
            ])
        ]),
        
        React.createElement('div', {
            key: 'libraries',
            className: "flex flex-wrap gap-2"
        }, 
            libraries.map((library, index) => {
                const gradient = gradients[index % gradients.length];
                const totalBooks = library.shelves.reduce((sum, shelf) => sum + shelf.books.length, 0);
                
                return React.createElement('button', {
                    key: library.id,
                    onClick: () => setActiveLibraryId(library.id),
                    className: `px-4 py-2 rounded-lg text-sm font-medium smooth-transition ${
                        activeLibraryId === library.id
                            ? `bg-gradient-to-r ${gradient} text-white shadow-md transform scale-105`
                            : 'bg-white/70 text-gray-700 hover:bg-white/90 border border-gray-200'
                    } focus-ring`
                }, `${library.name} (${totalBooks} books, ${library.shelves.length} shelves)`);
            })
        )
    ]);
};