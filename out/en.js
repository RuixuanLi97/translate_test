"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    RECEPTION: {
        TITLE: 'Waiting list',
        YESTERDAY: 'Yesterday',
        REGISTER: 'Online reception',
        WAITING: function (num) { return "".concat(num, " groups waiting"); },
        LAST_UPDATE: 'Latest update',
        INFORMATION: 'Reception Info',
        NO: 'Reception number',
        BEFORE: function (num) { return "".concat(num, " groups left"); },
        CHECK: 'Waiting list',
        CALLING: 'Calling',
        AUTO_CANCEL: 'The reservation has been automatically canceled',
        CANCEL: 'The reservation has been canceled',
        MESSAGE: {
            APPRECIATE: 'Thank you for your use.',
            WAIT: 'We are calling in order. Thank you for waiting.',
            SOON: 'You will be called soon',
            COME: 'Please head to the reception.',
            RECEPTION: 'Please head to the reception by time.',
            AUTO: function (time) {
                return "Your reservation will automatically be canceled after ".concat(time, " minutes of calling");
            },
            COMPLETE: function (time) { return "Your reception was completed on ".concat(time, " "); },
            ENJOY: 'Enjoy your time.',
            CANCEL: function (time) { return "Your reservation was canceleed on ".concat(time); },
            CALLED: function (time) { return "You were called on ".concat(time); },
            AUTO_CANCEL: function (time) { return "Your reservation was canceled automatically on ".concat(time); },
        },
        TOMORROW: 'Tomorrow',
        PAUSE: 'Online reception temporarily paused',
        AUTO_PAUSE: 'Online Check-In Suspended Due to Congestion',
        LIMIT: 'Reception has closed for today',
        UNAVAILABLE: 'Outside of reception hours',
        UNAVAILABLETIME: function (time) { return "\u30FBNext reception time: ".concat(time); },
    }
};
//# sourceMappingURL=en.js.map