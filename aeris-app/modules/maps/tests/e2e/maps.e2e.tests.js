'use strict';

describe('Maps E2E Tests:', function () {
  describe('Test Maps page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/maps');
      expect(element.all(by.repeater('map in maps')).count()).toEqual(0);
    });
  });
});
