import create from 'zustand';

const useCellStore = create((set) => ({
  cells: {},

  // Update a specific cell's content
  updateCell: (id, content) =>
    set((state) => ({
      cells: {
        ...state.cells,
        [id]: { ...state.cells[id], content },
      },
    })),

  // Reset all cells (optional)
  resetCells: () => set({ cells: {} }),

  // Get cell content by id
  getCell: (id) => (state) => state.cells[id] || { content: '' },
}));

export default useCellStore;
