import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./features/user/userSlice.js";
import publicationSlice from "./features/publication/publicationSlice.js";

// Redux-persist configuration for user reducer
const persistConfigUserReducer = {
  key: "userReducer",
  storage,
};

// Redux-persist configuration for publication reducer
const persistConfigPublicationReducer = {
  key: "publicationReducer",
  storage,
};

const rootReducer = {
  userReducer: persistReducer(persistConfigUserReducer, userSlice),
  publicationReducer: persistReducer(
    persistConfigPublicationReducer,
    publicationSlice
  ),
};

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

const persistor = persistStore(store);

export { persistor, store };

// export default store dispatch
export type AppDispatch = typeof store.dispatch;
