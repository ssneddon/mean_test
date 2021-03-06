
// THIS PUTs toastr into a global variable so you can use it in dependency injection
angular.module('app').value('mvToastr', toastr);

angular.module('app').factory('pcNotifier', function(mvToastr){
    return{
        notify: function(msg) {
            mvToastr.success(msg);
            console.log(msg);
        },
        error: function(msg) {
            mvToastr.error(msg);
            console.log(msg);
        }
    }
})

// start with creating the server-side controller
