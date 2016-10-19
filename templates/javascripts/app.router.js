let mainTemplate = require('pages/home/home.html');

module.exports = ({_am,_ng} = __APP)=>{

    _am.config(function ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                template: mainTemplate,
                controller:'HomePageController'
            });
        $urlRouterProvider.otherwise('/home');
    });

};
