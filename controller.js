angular.module('app', ['ngMaterial', 'angularFileUpload'])
	.controller('AppController', function($scope, FileUploader){
		$scope.uploader = new FileUploader({
			url: '/upload',
			method: 'post'
		});
	})