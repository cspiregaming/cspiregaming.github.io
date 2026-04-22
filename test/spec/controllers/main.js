'use strict';

describe('Controller: MainCtrl', function () {
  beforeEach(module('cSpireGamingWebApp'));

  // html5Mode requires a <base> tag which karma doesn't provide — disable it.
  beforeEach(module(function ($locationProvider) {
    $locationProvider.html5Mode(false);
  }));

  var scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    $controller('MainCtrl', { $scope: scope });
  }));

  describe('officers', function () {
    it('should populate the officers list', function () {
      expect(scope.officers.length).toBeGreaterThan(0);
    });

    it('each officer should have name, image, and about fields', function () {
      scope.officers.forEach(function (officer) {
        expect(officer.name).toBeTruthy();
        expect(officer.image).toBeTruthy();
        expect(officer.about).toBeTruthy();
      });
    });
  });

  describe('social links', function () {
    it('should define discordUrl', function () {
      expect(scope.discordUrl).toBeTruthy();
    });

    it('should define twitchUrl', function () {
      expect(scope.twitchUrl).toBeTruthy();
    });

    it('should define facebookUrl', function () {
      expect(scope.facebookUrl).toBeTruthy();
    });

    it('should define instagramUrl', function () {
      expect(scope.instagramUrl).toBeTruthy();
    });
  });

  describe('events', function () {
    it('should initialize events as an array', function () {
      expect(Array.isArray(scope.events)).toBe(true);
    });
  });

  describe('scrollTo', function () {
    it('should expose a scrollTo function', function () {
      expect(typeof scope.scrollTo).toBe('function');
    });
  });
});
