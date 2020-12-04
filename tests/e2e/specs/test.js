describe('Bowling scoring', () => {
    it('Can add a game', () => {
        cy.visit('/')
            .get('[data-cy=nameInput]')
            .type('The Dude{enter}')
            .get('[data-cy=playerName]')
            .contains('The Dude');
    });
    it('Can reset the match', () => {
        cy.visit('/')
            .get('[data-cy=nameInput]')
            .type('The Dude{enter}')
            .get('[data-cy=playerName]')
            .contains('The Dude');
    });
});
