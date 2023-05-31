import React from "react";
import { render, screen } from "@testing-library/react";

import GamePage from "../GamePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders game page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <GamePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("game-datatable")).toBeInTheDocument();
    expect(screen.getByRole("game-add-button")).toBeInTheDocument();
});
