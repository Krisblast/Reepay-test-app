'use strict';

describe('Service: Customers', function () {

  // load the service's module
  beforeEach(module('reepayApp'));

  // instantiate service
  var Customers;
  beforeEach(inject(function (_Customers_) {
    Customers = _Customers_;
  }));

  it('should do something', function () {
    expect(!!Customers).toBe(true);
  });

});
