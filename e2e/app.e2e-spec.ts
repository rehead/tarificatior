import { TarificatorPage } from './app.po';

describe('tarificator App', function() {
  let page: TarificatorPage;

  beforeEach(() => {
    page = new TarificatorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
