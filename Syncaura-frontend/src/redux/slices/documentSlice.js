import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDocuments,
  createDocument,
  deleteDocument,
  updateDocument,
} from "../features/documentThunks";

const initialState = {
  documents: [],
  loading: false,
  error: null,
};

const documentSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    resetDocuments: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.documents = [];
      })

      // Create
      .addCase(createDocument.fulfilled, (state, action) => {
        const newDoc = action.payload?.document || action.payload;
        if (newDoc && typeof newDoc === "object") {
          state.documents.unshift(newDoc);
        }
      })

      // Delete
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.documents = state.documents.filter(
          (doc) => (doc.id || doc._id) !== action.payload
        );
      })

      // Update
      .addCase(updateDocument.fulfilled, (state, action) => {
        const updatedDoc = action.payload.document || action.payload;
        if (updatedDoc && (updatedDoc.id || updatedDoc._id)) {
          const targetId = updatedDoc.id || updatedDoc._id;
          const index = state.documents.findIndex(d => (d.id || d._id) === targetId);
          if (index !== -1) {
            state.documents[index] = updatedDoc;
          }
        }
      });
  },
});

export const { resetDocuments } = documentSlice.actions;
export default documentSlice.reducer;
