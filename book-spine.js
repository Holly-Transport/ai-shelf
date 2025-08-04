const BookSpine = ({ book, index, hoveredBook, setHoveredBook, onDragStart }) => {
    const { React } = window;
    
    return React.createElement('div', {
        key: book.id,
        className: "relative cursor-pointer book-spine",
        style: {
            backgroundColor: book.color,
            height: `${book.height}px`,
            width: '40px',
            marginRight: '2px',
            background: `linear-gradient(90deg, ${book.color} 0%, ${book.color}dd 70%, ${book.color}bb 100%)`
        },
        draggable: true,
        onDragStart: () => onDragStart(book),
        onMouseEnter: () => setHoveredBook(book),
        onMouseLeave: () => setHoveredBook(null)
    }, [
        // Book title text
        React.createElement('div', {
            key: 'title',
            className: "absolute inset-0 flex items-center justify-center text-white text-xs font-bold",
            style: { 
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                padding: '8px 4px',
                textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
            }
        }, 
            React.createElement('span', {
                className: "truncate",
                style: { maxHeight: `${book.height - 16}px` }
            }, book.title)
        ),
        
        // Hover tooltip
        hoveredBook?.id === book.id && React.createElement('div', {
            key: 'tooltip',
            className: "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white border border-gray-300 rounded-lg shadow-lg p-3 min-w-48 z-50"
        }, [
            React.createElement('div', {
                key: 'content',
                className: "text-center"
            }, [
                React.createElement('div', {
                    key: 'cover',
                    className: "text-2xl mb-2"
                }, book.cover),
                React.createElement('div', {
                    key: 'title',
                    className: "font-bold text-sm text-gray-800"
                }, book.title),
                React.createElement('div', {
                    key: 'author',
                    className: "text-xs text-gray-600 mb-1"
                }, book.author),
                React.createElement('div', {
                    key: 'genre',
                    className: "text-xs text-gray-500"
                }, book.genre),
                React.createElement('div', {
                    key: 'height',
                    className: "text-xs text-gray-400 mt-1"
                }, `Height: ${Math.round(book.height)}px`),
                React.createElement('div', {
                    key: 'drag-hint',
                    className: "text-xs text-blue-500 mt-1"
                }, "Drag to move between shelves")
            ]),
            React.createElement('div', {
                key: 'arrow',
                className: "absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"
            })
        ])
    ]);
};