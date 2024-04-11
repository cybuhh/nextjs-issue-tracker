import ErrorMessage from './ErrorMessage';

describe('<ErrorMessage />', () => {
  describe('render and display expected content', () => {
    it('should return null if not message provided', () => {
      cy.mount(<ErrorMessage>null</ErrorMessage>);
      cy.getByTestId('data-testid').should('not.exist');
    });
  });
});
