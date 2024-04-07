import IssueStatusBadge from './IssueStatusBadge';

describe('<IssueStatusBadge />', () => {
  describe('render and display expected content', () => {
    it('should be red badge for OPEN status', () => {
      cy.mount(<IssueStatusBadge status='OPEN' />);
      cy.get('[data-test="status-badge"]').as('badge');
      cy.get('@badge').contains('Open');
      cy.get('@badge').should('have.attr', 'data-accent-color', 'red');
    });
    it('should be red badge for CLOSED status', () => {
      cy.mount(<IssueStatusBadge status='CLOSED' />);
      cy.get('[data-test="status-badge"]').as('badge');
      cy.get('@badge').contains('Closed');
      cy.get('@badge').should('have.attr', 'data-accent-color', 'green');
    });
    it('should be red badge for IN_PROGRESS status', () => {
      cy.mount(<IssueStatusBadge status='IN_PROGRESS' />);
      cy.get('[data-test="status-badge"]').as('badge');
      cy.get('@badge').contains('In progress');
      cy.get('@badge').should('have.attr', 'data-accent-color', 'violet');
    });
  });
});
