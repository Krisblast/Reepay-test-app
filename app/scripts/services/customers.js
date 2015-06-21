'use strict';

/**
 * @ngdoc service
 * @name reepayApp.Customers
 * @description
 * # Customers
 * Factory in the reepayApp.
 */
angular.module('reepayApp')
  .factory('Customers', function ($http) {

    var getCustomers = function (callback , page, size){
      $http({
        method: "get",
        url: "https://api.reepay.com/v1/customer?page=" + page + "&size=" + size
      }).success(callback);
    };

    var updateCustomer = function (callback, customer_obj){
      $http({
        method: "PUT",
        data: customer_obj,
        url: "https://api.reepay.com/v1/customer/" + customer_obj.handle
      }).success(callback);
    };

    var deleteCustomer = function (callback, customer_obj){
      $http({
        method: "post",
        data: customer_obj,
        url: "https://api.reepay.com/v1/customer/" + customer_obj.handle + "/delete"
      }).success(callback);
    };
    var getCustomerNotes = function (callback, customer_obj){
      $http({
        method: "get",
        url: "https://api.reepay.com/v1/customer/" + customer_obj.handle + "/note"
      }).success(callback);
    };

    var addCustomerNote = function (callback, note_obj, handle){
      $http({
        method: "post",
        data: note_obj,
        url: "https://api.reepay.com/v1/customer/" + handle + "/note"
      }).success(callback);
    };


    return {
      getCustomers: function (callback, page, size) {
        return getCustomers(callback, page, size);
      },
      updateCustomer: function(callback, customer_obj){
        return updateCustomer(callback, customer_obj);
      },
      deleteCustomer: function(callback, customer_obj){
        return deleteCustomer(callback, customer_obj);
      },
      getCustomerNotes: function(callback, customer_obj){
        return getCustomerNotes(callback, customer_obj);
      },
      addCustomerNote: function(callback, note_obj, handle){
        return addCustomerNote(callback, note_obj, handle);
      }
    };
  });
