'use strict';

describe('Registers E2E Tests:', function () {
  describe('Test Registers page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/registers');
      expect(element.all(by.repeater('register in registers')).count()).toEqual(0);
    });
  });
});
