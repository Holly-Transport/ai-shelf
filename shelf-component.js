const ShelfComponent = ({ 
    shelf, 
    index, 
    currentLibrary, 
    hoveredBook, 
    setHoveredBook, 
    onDragStart,
    onDragOver, 
    onDrop, 
    onDeleteShelf 
}) => {
    const { React } = window;
    const { BookOpen, X } = lucide;
    
    return React.createElement('div', {
        className: "glass-card rounded-xl shadow-sm p-4 border border-gray-200/50 mb-4 smooth-transition",
        onDragOver: onDragOver,
        onDrop: (e) => onDrop(e, shelf.id)
    }, 
        React.createElement('div', {
            className: "relative bg-gradient-to-b from-amber-800 to-amber-900 rounded-lg p-4 shadow-lg min-h-32 shelf-texture"
        }, [
            // Books container
            React.createElement('div', {
                key: 'books',
                className: "flex items-end justify-start space-x-0 overflow-x-auto pb-2 shelf-scroll"
            }, 
                shelf.books.length > 0 
                    ? shelf.books.map((book, bookIndex) =>
                        React.createElement(BookSpine, {
                            key: book.id,
                            book: book,
                            index: bookIndex,
                            hoveredBook: hoveredBook,
                            setHoveredBook: setHoveredBook,
                            onDragStart: onDragStart
                        })
                    )
                    : React.createElement('div', {
                        className: "flex items-center justify-center w-full h-24 text-amber-200"
                    },
                        React.createElement('div', {
                            className: "text-center"
                        }, [
                            React.createElement(BookOpen, {
                                key: 'icon',
                                className: "w-6 h-6 mx-auto mb-2 opacity-50"
                            }),
                            React.createElement('p', {
                                key: 'text1',
                                className: "text-xs"
                            }, "Drop books here"),
                            React.createElement('p', {
                                key: 'text2',
                                className: "text-xs opacity-75"
                            }, `Section #${index + 1}`)
                        ])
                    )
            ),
            
            // Shelf edge
            React.createElement('div', {
                key: 'edge',
                className: "absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-b from-amber-700 to-amber-800 rounded-b-lg shadow-md"
            }),
            
            // Delete button (if more than one shelf)
            currentLibrary?.shelves.length > 1 && React.createElement('button', {
                key: 'delete',
                onClick: () => onDeleteShelf(shelf.id),
                className: "absolute top-2 right-2 text-amber-200/60 hover:text-red-400 transition-colors bg-black/20 rounded-full p-1 focus-ring",
                title: "Delete shelf section"
            }, React.createElement(X, { className: "w-3 h-3" }))
        ])
    );
};