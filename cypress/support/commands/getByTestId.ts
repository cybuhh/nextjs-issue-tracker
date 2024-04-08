export default function getByTestId(testId: string) {
  return cy.get(`[data-test-id="${testId}"]`);
}
