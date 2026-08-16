import api from "../../config/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";







export const fetchDocuments = createAsyncThunk(
  "documents/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/documents");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch documents");
    }
  }
);


export const createDocument = createAsyncThunk(
  "documents/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/documents", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to create document");
    }
  }
);


export const deleteDocument = createAsyncThunk(
  "documents/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/documents/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete document");
    }
  }
);


export const updateDocument = createAsyncThunk(
  "documents/update",
  async ({ id, title, content }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/documents/${id}`, { title, content });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update document");
    }
  }
);
