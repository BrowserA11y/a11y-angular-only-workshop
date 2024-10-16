//https://www.freecodecamp.org/news/automating-accessibility-tests-with-cypress/
//https://github.com/dequelabs/axe-core/blob/develop/doc/examples/html-handlebars.md
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logOnError = (violations: any[]) => {
  cy.task(
    'log',
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
  );
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    })
  );

  cy.task('table', violationData);
};

const sizes: Cypress.ViewportPreset[] = [
  'macbook-15',
  'macbook-13',
  'macbook-11',
  'iphone-6',
  'iphone-6+',
  'ipad-mini',
];
const allPages = [
  {
    url: 'http://localhost:4200/books',
  },
  { url: 'http://localhost:4200/new-book' },
  { url: 'http://localhost:4200/details/9780596529963' },
  {
    url: 'http://localhost:4200/about',
    exclude: ['.mission_video'],
  },
];
describe('Check for a11y issues', () => {
  //for each URL do the thing in here
  allPages.forEach((page) => {
    describe(`url: ${page.url}`, () => {
      sizes.forEach((size) => {
        it(`Should pass a11y checks ${page.url}, ${size}`, () => {
          cy.visit(page.url);
          if (Cypress._.isArray(size)) {
            cy.viewport(size[0], size[1]);
          } else {
            cy.viewport(size);
          }
          cy.injectAxe();
          cy.checkA11y({ exclude: [page.exclude || ''] }, {}, logOnError);
        });
      });
    });
  });
});
