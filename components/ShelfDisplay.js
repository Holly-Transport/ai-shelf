const ShelfDisplay = ({ 
    currentLibrary, 
    hoveredBook, 
    setHoveredBook, 
    onDragStart,
    onDragOver, 
    onDrop, 
    onDeleteShelf 
}) => {
    const { React } = window;
    const { Camera, Star } = lucide;
    
    const getCurrentBooks = () => currentLibrary?.shelves.flatMap(shelf => shelf.books) || [];
    
    return React.createElement('div', {
        className: "glass-card rounded-xl shadow-sm p-6 border border-green-200/50"
    }, [
        React.createElement('div', {
            key: 'header',
            className: "flex items-center justify-between mb-6"
        }, [
            React.createElement('h2', {
                key: 'title',
                className: "text-xl font-semibold text-gray-800"
            }, `${currentLibrary?.name} - ${getCurrentBooks().length} total books across ${currentLibrary?.shelves.length} shelf sections`),
            React.createElement('div', {
                key: 'hint',
                className: "text-sm text-gray-500"
            }, "Drag books between shelf sections to reorganize")
        ]),
        
        React.createElement