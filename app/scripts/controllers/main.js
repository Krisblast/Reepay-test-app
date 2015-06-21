'use strict';

/**
 * @ngdoc function
 * @name reepayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the reepayApp
 */
angular.module('reepayApp')
  .controller('MainCtrl', function ($scope, Customers, $modal) {

    $scope.status = {
      isFirstOpen: false
    };

    $scope.active_page = 1;
    $scope.list_length = 15;

    $scope.getCustomers = function (page, size) {
      Customers.getCustomers(
        function (data) {

          $scope.customers_obj = data;
          $scope.pagination = [];
          $scope.active_page = page;

          //Creating pagination buttons based on total pages
          for (var i = 0; i < data.total_pages; i++) {
            $scope.pagination.push({"page": i + 1});
          }
        }, page, size); //(Callback, page, size)
    };


    //Getting the initial customer page
    $scope.getCustomers($scope.active_page, $scope.list_length);

    //Selecting a customer to be displayed in sidebar
    $scope.selectCustomer = function (customer) {
      $scope.selected_customer = customer;
      //Getting notes for the selected customer
      $scope.getCustomerNotes(customer);
    };

    $scope.getCustomerNotes = function (customer_obj) {
      Customers.getCustomerNotes(function (data) {
        $scope.customer_notes = data;
      }, customer_obj);
    };


    //Will be called if customer_obj have changed on input blur
    $scope.updateCustomer = function (customer_obj) {
      Customers.updateCustomer(function () {
      }, customer_obj);
    };

    $scope.deleteCustomer = function (customer_obj) {
      Customers.deleteCustomer(function () {
      }, customer_obj);
    };


    $scope.open = function (size,customer) {

      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'views/modal_add_note.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          customer: function () {
            return customer;
          }
        }
      });

      modalInstance.result.then(function () {
        //Updating selected customer notes on new note added
        $scope.getCustomerNotes($scope.selected_customer);
      }, function () {
      });
    };
  })

  .controller('ModalInstanceCtrl', function ($scope, $modalInstance, customer,Customers) {

    $scope.note = {
      user_name: 'testname',
      user_email: 'testmail@testmail.dk'
    };

    $scope.customer_obj = customer;

    $scope.ok = function () {
      //Adding new note and closing modal
      Customers.addCustomerNote(function(){
        $modalInstance.close();
      },$scope.note, customer.handle)};

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
