import { CmApiPage } from './app.po';

describe('cm-api App', function() {
  let page: CmApiPage;

  beforeEach(() => {
    page = new CmApiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
