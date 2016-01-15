describe('homepage',function() {

    it('the name of the home page view should be app',function() {

        browser.get('http://localhost:3001/#/home');
        var appName = element(by.binding('name')).getText();
        expect(appName).toMatch('app');
    });

});
