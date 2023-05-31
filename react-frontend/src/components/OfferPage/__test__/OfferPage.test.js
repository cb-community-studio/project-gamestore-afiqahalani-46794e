import React from "react";
import { render, screen } from "@testing-library/react";

import OfferPage from "../OfferPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders offer page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <OfferPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("offer-datatable")).toBeInTheDocument();
    expect(screen.getByRole("offer-add-button")).toBeInTheDocument();
});
