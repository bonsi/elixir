var notify = require('gulp-notify');

// Required for Growl.
var nn = require('node-notifier');
// Growl options. 
// Either:
//  - set the IP address of the remote Growl host 
//  or 
//  - let it default to 'localhost' and use SSH portforwarding (dev-machine:23053 -> 127.0.0.1:23053)
var growlOptions = {
    name: 'Laravel Growlixir', // Defaults as 'Node'
    //host: '192.168.56.1',
    port: 23053
};
// Growl as a custom reporter.
var notify = gnotify.withReporter(function (options, callback) {
    new nn.Growl(growlOptions).notify(options, callback);
});

/**
 * Create a new Notification instance.
 */
var Notification = function() {
    this.title = 'Laravel Elixir';

    // If an argument is provided, then we'll
    // assume they want to show a message.
    if (arguments.length) {
        return this.message(arguments[0]);
    }
};

var n = Notification.prototype;

/**
 * Display a notification.
 *
 * @param {string} message
 */
n.message = function(message) {
    return notify({
        title: this.title,
        message: message,
        icon: __dirname + '/icons/laravel.png',
        onLast: true
    });
};

/**
 * Display an error notification.
 *
 * @param {object} e
 * @param {string} message
 */
n.error = function(e, message) {
    notify.onError({
        title: this.title,
        message: message + ': <%= error.message %>',
        icon: __dirname + '/icons/fail.png',
        onLast: true
    })(e);

    // We'll spit out the error, just in
    // case it is useful for the user.
    console.log(e);
};

/**
 * Display a notification for passed tests.
 *
 * @param {string} framework
 */
n.forPassedTests = function(framework) {
    return notify({
        title: 'Green!',
        message: 'Your ' + framework + ' tests passed!',
        icon: __dirname + '/icons/pass.png',
        onLast: true
    });
};

/**
 * Display a notification for failed tests.
 *
 * @param {object} e
 * @param {string} framework
 */
n.forFailedTests = function(e, framework) {
    return notify.onError({
        title: 'Red!',
        message: 'Your ' + framework + ' tests failed!',
        icon: __dirname + '/icons/fail.png',
        onLast: true
    })(e);
};

module.exports = Notification;
