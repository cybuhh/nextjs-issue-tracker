import ErrorMessage from './ErrorMessage';

describe('<ErrorMessage />', () => {
  describe('render and display expected content', () => {
    it('should return null if no message provided', () => {
      cy.mount(<ErrorMessage>{undefined}</ErrorMessage>);
      cy.getByTestId('error-message').should('not.exist');
    });

    it('should show error message', () => {
      const errorMesaage = 'Critical error has occurred';
      cy.mount(<ErrorMessage>{errorMesaage}</ErrorMessage>);
      cy.getByTestId('error-message').should('have.text', errorMesaage);
    });
  });
});
