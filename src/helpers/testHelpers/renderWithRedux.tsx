import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { RenderOptions, RenderResult } from "@testing-library/react";
import { render } from "@testing-library/react";
import React, { PropsWithChildren } from "react";
import reducer from '../../store/TodoSlice';
import { JSX } from "react/jsx-runtime";
import { AppStore, RootState } from "../../store/store";
import { Provider } from "react-redux";

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>,
  store?: AppStore
}

const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: combineReducers({
        todos: reducer
      }),
      preloadedState
    }),
    ...renderOptions
    }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export default renderWithProviders;