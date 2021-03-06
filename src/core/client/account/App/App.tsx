import { BrowserProtocol, queryMiddleware } from "farce";
import { createFarceRouter, ElementsRenderer } from "found";
import { Resolver } from "found-relay";
import React, { FunctionComponent } from "react";

import { CoralContextConsumer } from "coral-framework/lib/bootstrap/CoralContext";
import TransitionControl from "coral-framework/testHelpers/TransitionControl";

import routeConfig from "../routeConfig";
import NotFound from "../routes/NotFound";
import MainLayout from "./MainLayout";

import "./App.css";

const Router = createFarceRouter({
  historyProtocol: new BrowserProtocol(),
  historyMiddlewares: [queryMiddleware],
  routeConfig,
  renderReady: function FarceRouterReady({ elements }) {
    return (
      <>
        <ElementsRenderer elements={elements} />
        {process.env.NODE_ENV === "test" && <TransitionControl />}
      </>
    );
  },
  renderError: function FarceRouterError({ error }) {
    return <div>{error.status === 404 ? <NotFound /> : "Error"}</div>;
  },
});

const EntryContainer: FunctionComponent = () => (
  <CoralContextConsumer>
    {({ relayEnvironment }) => (
      <MainLayout>
        <Router resolver={new Resolver(relayEnvironment)} />
      </MainLayout>
    )}
  </CoralContextConsumer>
);

export default EntryContainer;
