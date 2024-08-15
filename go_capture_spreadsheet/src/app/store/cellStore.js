import { create } from "zustand";

const cellsStore = (set, get) => {
  return {
    searchQuery: "",

    cells: {}, // Store cell data
    focusedCellId: null, // Track the currently focused cell
    history: [], // Initialize as empty array
    future: [], // Initialize as empty array

    updateCell: (id, content) => {
      const { cells, history } = get();

      // Record the current state before updating
      set({
        cells: {
          ...cells,
          [id]: {
            ...cells[id],
            content,
            alignment: cells[id]?.alignment || "left",
          },
        },
        history: [...history, { ...cells }], // Save the current state to history
        future: [], // Clear future stack as new action is taken
      });
    },
    //Undo functionality
    undo: () => {
      const { history, cells, future } = get();
      if (history.length > 0) {
        const previous = history[history.length - 1];
        const newHistory = history.slice(0, -1);
        set({
          cells: previous,
          history: newHistory,
          future: [cells, ...future],
        });
      }
    },
    //redo functionality
    redo: () => {
      const { future, cells, history } = get();
      if (future.length > 0) {
        const next = future[0];
        const newFuture = future.slice(1);
        set({
          cells: next,
          history: [...history, cells],
          future: newFuture,
        });
      }
    },
    //Focus cell trased...
    setFocusedCellId: (id) => set({ focusedCellId: id }),
    //set alignment types.
    setAlignment: (id, alignment) =>
      set((state) => ({
        cells: {
          ...state.cells,
          [id]: { ...state.cells[id], alignment },
        },
      })),

    // Update the search query
    updateSearchQuery: (query) => set({ searchQuery: query }),

    // Filter cells based on search query not work yet...
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
