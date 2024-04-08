import { mount } from 'cypress/react';

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
