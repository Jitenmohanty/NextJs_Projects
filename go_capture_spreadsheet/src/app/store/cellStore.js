import { create } from "zustand";

const cellsStore = (set, get) => {
  return {
    searchQuery: "",
    
    cells: {}, // Store cell data
  focusedCellId: null, // Track the currently focused cell
  updateCell: (id, content) =>
    set((state) => ({
      cells: {
        ...state.cells,
        [id]: { ...state.cells[id], content, alignment: state.cells[id]?.alignment || 'left' }, // Store content and alignment
      },
    })),
  setFocusedCellId: (id) => set({ focusedCellId: id }),
  setAlignment: (id, alignment) =>
    set((state) => ({
      cells: {
        ...state.cells,
        [id]: { ...state.cells[id], alignment },
      },
    })),
    
    // Update the search query
    updateSearchQuery: (query) => set({ searchQuery: query }),

    // Filter cells based on search query
    filteredCells: () => {
      const { cells, searchQuery } = get();
      return Object.keys(cells).filter((id) =>
        cells[id].toLowerCase().includes(searchQuery.toLowerCase())
      );
    },
  };
};

const useCellStore = create(cellsStore);

export default useCellStore;
