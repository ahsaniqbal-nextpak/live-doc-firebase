import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "@/config/firebase";

interface MessageData {
  id: string;
  threads: any[];
}

export const getSingleDocument = createAsyncThunk(
  "document/getSingleDocument",
  async ({ id }: any, { dispatch, rejectWithValue }) => {
    try {
      const unsubscribe = firebase
        .firestore()
        .collection("documents")
        .doc(id)
        .onSnapshot((doc: any) => {
          if (doc.exists) {
            dispatch(documentsFetched({ id: doc.id, ...doc.data() }));
          } else {
            dispatch(documentsFetched({}));
          }
        });

      return unsubscribe;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const documentsFetched = (documents: {}) => ({
  type: "document/documentsFetched",
  payload: documents,
});

export const udpateDocumentName = createAsyncThunk(
  "document/udpateDocumentName",
  async ({ docId, title, onSuccess }: any, { dispatch, rejectWithValue }) => {
    try {
      firebase.firestore().collection("documents").doc(docId).update({ title });
      onSuccess();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const AddMessage = createAsyncThunk(
  "document/AddMessage",
  async ({ payload, onSuccess }: any, { dispatch, rejectWithValue }) => {
    try {
      const newPaylaod = {
        email: payload.email,
        clerkId: payload?.clerkId,
        profileImage: payload.profileImage,
        name: payload.name,
        message: payload.message,
        parentDocId: payload?.id,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      firebase
        .firestore()
        .collection("documents")
        .doc(payload.id)
        .collection("messages")
        .add(newPaylaod);
      onSuccess();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const AddThread = createAsyncThunk(
  "document/AddThread",
  async ({ payload, onSuccess }: any, { dispatch, rejectWithValue }) => {
    try {
      const newPaylaod = {
        email: payload.email,
        clerkId: payload?.clerkId,
        profileImage: payload.profileImage,
        name: payload.name,
        message: payload.thread,
        // parentDocId: payload?.id,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      firebase
        .firestore()
        .collection("documents")
        .doc(payload.id)
        .collection("messages")
        .doc(payload.threadId)
        .collection("threads")
        .add(newPaylaod);
      onSuccess();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const getChats = createAsyncThunk(
  "document/getChats",
  async ({ id }: any, { dispatch, rejectWithValue }) => {
    try {
      const unsubscribe = firebase
        .firestore()
        .collection("documents")
        .doc(id)
        .collection("messages")
        .orderBy("createdAt", "desc")
        .onSnapshot(async (querySnapshot) => {
          const tempStates: any[] = [];

          const promises = querySnapshot.docs.map(async (doc) => {
            const messageData: any = { id: doc.id, ...doc.data() };

            firebase
              .firestore()
              .collection("documents")
              .doc(id)
              .collection("messages")
              .doc(doc.id)
              .collection("threads")
              .orderBy("createdAt", "asc")
              .onSnapshot((threadSnapshot) => {
                const threads: any[] = [];
                threadSnapshot.forEach((threadDoc) => {
                  threads.push({ id: threadDoc.id, ...threadDoc.data() });
                });
                const updatedMessageData = {
                  ...messageData,
                  threads,
                };

                const existingMessageIndex = tempStates.findIndex(
                  (msg) => msg.id === messageData.id
                );
                if (existingMessageIndex > -1) {
                  tempStates[existingMessageIndex] = updatedMessageData;
                } else {
                  tempStates.push(updatedMessageData);
                }

                dispatch(getChatsFetched([...tempStates]));
              });
          });

          await Promise.all(promises);

        });

      return unsubscribe;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const getChatsFetched = (chats: any[]) => ({
  type: "document/getChatsFetched",
  payload: chats,
});

export const setDocumentContent = createAsyncThunk(
  "document/setDocumentContent",
  async ({ content, docId }: any, { dispatch, rejectWithValue }) => {
    try {
      firebase
        .firestore()
        .collection("documents")
        .doc(docId)
        .update({ content });
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

interface HomeInitialState {
  singleDocument: any;
  documentChats: any;
  loading: boolean;
  error: any;
}

const initialState: HomeInitialState = {
  singleDocument: {},
  documentChats: [],
  loading: false,
  error: null,
};

const documentSlice = createSlice({
  name: "document",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSingleDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleDocument.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getSingleDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase("document/documentsFetched", (state, action: any) => {
        state.singleDocument = action.payload;
      })
      .addCase(getChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase("document/getChatsFetched", (state, action: any) => {
        state.documentChats = action.payload;
      });
  },
});

export default documentSlice.reducer;
