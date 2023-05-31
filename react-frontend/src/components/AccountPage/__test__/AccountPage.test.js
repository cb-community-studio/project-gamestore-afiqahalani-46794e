import React from "react";
import { render, screen } from "@testing-library/react";

import AccountPage from "../AccountPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders account page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AccountPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("account-datatable")).toBeInTheDocument();
    expect(screen.getByRole("account-add-button")).toBeInTheDocument();
});
