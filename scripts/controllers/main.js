'use strict';

/**
 * @ngdoc function
 * @name cSpireGamingWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cSpireGamingWebApp
 */
angular.module('cSpireGamingWebApp').controller('MainCtrl', function ($scope, $filter, $http, $sce) {

  var WORKER_BASE = 'https://cspiregaming-api.michaellamb.workers.dev';

  $scope.trustUrl = function (url) { return $sce.trustAsResourceUrl(url); };

  // ─── Members ───────────────────────────────────────────────────
  $scope.memberRoles = [];
  $scope.members = [];
  $scope.filteredMembers = [];
  $scope.roleCounts = {};
  $scope.selectedRole = 'all';
  $scope.membersLoading = true;
  $scope.membersError = null;
  $scope.membersFetchedAt = null;

  $http.get(WORKER_BASE + '/api/public/members').then(function (res) {
    var data = res.data;
    var rolesById = {};
    data.roles.forEach(function (r) { rolesById[r.id] = r; });

    $scope.memberRoles = data.roles;
    $scope.membersFetchedAt = data.fetchedAt;
    $scope.members = data.members.map(function (m) {
      m.visibleRoles = m.roles
        .map(function (id) { return rolesById[id]; })
        .filter(Boolean)
        .sort(function (a, b) { return b.position - a.position; });
      return m;
    });

    data.roles.forEach(function (r) {
      $scope.roleCounts[r.id] = $scope.members.filter(function (m) {
        return m.roles.indexOf(r.id) !== -1;
      }).length;
    });

    var initialRole = data.defaultRoleId && rolesById[data.defaultRoleId]
      ? data.defaultRoleId
      : 'all';
    $scope.filterMembers(initialRole);
    $scope.membersLoading = false;
  }, function () {
    $scope.membersLoading = false;
    $scope.membersError = 'Could not load members. Try again later.';
  });

  $scope.filterMembers = function (roleId) {
    $scope.selectedRole = roleId;
    $scope.filteredMembers = roleId === 'all'
      ? $scope.members
      : $scope.members.filter(function (m) { return m.roles.indexOf(roleId) !== -1; });
  };

  // Other
  $scope.totalMembers = 315;

  // Social Links
  $scope.discordUrl = 'https://discord.gg/95UuTvu';
  $scope.twitchUrl = 'https://www.twitch.tv/cspiregaming';
  $scope.facebookUrl = 'https://www.facebook.com/cspiregaming';
  $scope.instagramUrl = 'https://www.instagram.com/cspiregaming/';
  $scope.twitterUrl = 'https://twitter.com/cspiregaming';
  $scope.subscribeUrl = 'http://eepurl.com/gjdvGT';
  $scope.exchangeUrl = 'https://outlook.office365.com/owa/cspiregamingmembers@cspire.com/groupsubscription.ashx?action=join&source=Exchange&guid=d9fd892d-d36b-4d48-821a-1cd486f66a2d';
  $scope.uptimeStatusUrl = 'https://status.cspiregaming.com/';
//    $scope.subscribeUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScxlvs7cCmJcRvM_2DAM0G6cruxFQc_2kmYRstIAGaAnO1_IQ/viewform?usp=sf_link';

  // Event List
  // You may leave any field in the event object blank.
  $scope.events = [];

  /* Example event below. DO NOT DELETE */

  //    {
//                  title: 'May Meetup',
//                  subtitle: 'May 18, 2019 | 12 - 6 pm | C Spire HQ, 6th Floor',
//                  imagePath: undefined,
//                  description: `Bring your favorite board and/or video games as well as monitors and hang out with some awesome people around C Spire. Feel free to bring children or guests. (Please note you are responsible for any guests you bring.) <br><br><b>SEE FULL DETAILS IN THE TICKET LINK BELOW</b>`,
//                  actionButtonText: 'Get your ticket now!',
//                  actionButtonUrl: 'http://rsvp.cspiregaming.com',
//                  googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3367.302949692359!2d-90.14876303455075!3d32.43782485850925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x889a4fd75c35116d%3A0xdb39af80dc9a1b47!2sC+Spire!5e0!3m2!1sen!2sus!4v1552573649044'
//                         }

  /* Example event above. DO NOT DELETE */

  // Officer List — hardcoded fallback for if /api/public/content is unreachable.
  // Authoritative source is KV via the admin console; keep this in sync only
  // as a minimum-viable fallback (it's fine if it drifts a little).
  var IMG_BASE = 'https://cspiregaming.github.io/img/faces/';
  $scope.officers = [{
    name: 'Jeana<br>Smith',
    image: IMG_BASE + 'jeana-smith.png',
    about: `<strong>Jeana Smith</strong> is the team lead of mobile app development at C Spire. She'd like to make a Legend of Zelda pun here, but she doesn't want to Tri and Force it.`
  }, {
    name: 'Matt<br>Turner',
    image: IMG_BASE + 'matt-turner.png',
    about: `<strong>Matthew Turner</strong> is a LTE wizard who uses his powers for good. Once a hardcore MMO raider, he now prefers games with a little less commitment. He also has a passion for all things hardware.`
  }, {
    name: 'Michael<br>Lamb',
    image: IMG_BASE + 'michael-lamb.png',
    about: `<strong>Michael Lamb</strong> is a software engineer and uses his talents to connect and empower Mississippi gamers. Lately he's been playing No Man's Sky. `
  }, {
    name: 'Burrell<br>Gee',
    image: IMG_BASE + 'burrell-gee.jpg',
    about: '<strong>Burrell Gee</strong> is a team lead and polymath who also loves all things gaming. At his best behind the GM Screen or crushing his foes on the KB&M, and as an occasional console dabbler, <strong>Burrell</strong> has been gaming since the days of Zork!'
  }, {
    name: 'Charles<br>McEuen',
    image: IMG_BASE + 'charles-mceuen.jpg',
    about: '<strong>Super Chuck</strong> aka <strong>Charles</strong> keeps himself busy with C Spire Business business but is known to enjoy getting up to some shenanigans in C Spire Gaming business. His speciality is N64 gaming.'
  }, {
    name: 'John<br>Richard',
    image: IMG_BASE + 'john-richard.png',
    about: 'Originally from Iowa, the world of gaming started for <strong>John Richard</strong> with GoldenEye 007, but grew into a passion with the teamwork found in Battlefield 2142 clan tournaments. Nowadays, the Mississippi humidity has encouraged him to hone his Rocket League skills in the time between braving the soccer fields, changing his newborn\'s diaper, and working as one of C Spire\'s Corporate Recruiters.'
  }, {
    name: 'Alyx<br>Chaivre',
    image: IMG_BASE + 'alyx.jpg',
    about: 'Hailing from the far off land of Delaware, Alyx Chaivre is a dedicated software developer and avid gamer; loving games of all kinds from tabletop adventures to console and pc quests! When she isn\'t hunting elusive shiny pokemon, you can find her working behind the scenes in Billing.'
  }, {
    name: 'Zack<br>Sistrunk',
    image: IMG_BASE + 'zacksistrunk.png',
    about: 'A powerhouse for integrating systems and working with client teams, <strong>Zack Sistrunk</strong> joined C Spire Gaming to show off his talents for mastering the most challenging titles in the industry. With lightning-fast reflexes and strategic thinking honed through years of competitive gaming, Zack brings a player\'s perspective to every project.'
  }];

  // Try to load the live officer list and events from the worker. If anything
  // fails, we silently keep the officer fallback above and an empty events list.
  $http.get(WORKER_BASE + '/api/public/content').then(function (res) {
    var data = res.data;
    if (data && Array.isArray(data.officers) && data.officers.length) {
      $scope.officers = data.officers
        .slice()
        .sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
    }
    if (data && Array.isArray(data.events)) {
      $scope.events = data.events.map(decorateEvent);
    }
  }, function () { /* keep fallback */ });

  function decorateEvent(ev) {
    var startTime = ev.startTime ? new Date(ev.startTime) : null;
    var subtitle = ev.subtitle;
    if (!subtitle && startTime && !isNaN(startTime)) {
      subtitle = startTime.toLocaleString(undefined, {
        weekday: 'short', month: 'short', day: 'numeric',
        hour: 'numeric', minute: '2-digit',
      });
      if (ev.location) subtitle += ' | ' + ev.location;
    }
    var actionButtonText = ev.actionButtonText;
    var actionButtonUrl = ev.actionButtonUrl;
    if (ev.source === 'discord' && !actionButtonUrl) {
      actionButtonText = 'View on Discord';
      actionButtonUrl = ev.discordUrl;
    }
    return {
      title: ev.title,
      subtitle: subtitle,
      description: ev.description,
      imagePath: ev.imagePath || ev.coverImage || null,
      actionButtonText: actionButtonText,
      actionButtonUrl: actionButtonUrl,
      googleMapsUrl: ev.googleMapsUrl || null,
      isPast: ev.status === 'COMPLETED',
    };
  }

  function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;

    while (element) {
      xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
      yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
      element = element.offsetParent;
    }

    return {
      x: xPosition,
      y: yPosition
    };
  }

  $scope.scrollTo = function (id, offset) {
    console.log('attempting to scroll to element: ' + id);

    try {
      console.log('closing sidenav just in case');
      $('html').removeClass('nav-open');
    } catch (error) {
      console.log('sidenav doesn\'t exist. ignoring error.');
    }

    if (offset === undefined) {
      offset = 0;
    }
    var target = document.getElementById(id);
    var targetPosition = getPosition(target);
    var navBar = document.getElementById('nav');
    var navBarHeight = navBar.offsetHeight;
    if (targetPosition.y === navBarHeight && id !== 'home') {
      console.log('target already in frame');
    } else {
      $('html, body').animate({
        scrollTop: (target.offsetTop - navBarHeight - offset),
        easing: 'slow'
      }, 1000, function () {
        // Callback after animation
      });
    }
  };

});
