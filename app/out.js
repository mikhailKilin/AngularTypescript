var inputEmail;
(function (inputEmail) {
    inputEmail.html = '		<div ng-controller="EmailController as ctrl" 			 ng-click="ctrl.setInputFocus($event)">			<div class =\'email-container\' 				  ng-mouseleave="ctrl.addEmail(ctrl.emailString)">				<div ng-repeat="email in ctrl.emails track by $index">					<div class="{{email.isValid ? \'email-div\' : \'email-div invalid\'}}">						<div class="email-name">{{email.name}}</div>						<div ng-click="ctrl.deleteEmailString(email.order)" class="close-button">&#10060</div>					</div>				</div>				<input id="inputFocus"						type="text" 				   		class="email-string" 				   		ng-model="ctrl.emailString" 				   		ng-keyup="ctrl.addEmailWithEvent($event)" 				   		placeholder="add more people..."				   		/>			</div>			<button ng-click="ctrl.addRandomEmail()">add random email</button>			<button ng-click="ctrl.getEmailsCount()">get emails count</button>        </div>';
})(inputEmail || (inputEmail = {}));
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
var EmailString = (function () {
    function EmailString(name, order, isValid) {
        this.name = name;
        this.order = order;
        this.isValid = isValid;
    }
    return EmailString;
})();
var EmailController = (function () {
    function EmailController($scope) {
        this.$scope = $scope;
        this.emails = new Array();
        this.emailString = "";
    }
    EmailController.prototype.addEmails = function (emails) {
        var _this = this;
        var newOrder = emails.length + 1;
        emails.forEach(function (element) {
            _this.emails.push(new EmailString(element, newOrder++, _this.isValid(element)));
        });
    };
    EmailController.prototype.getEmails = function () {
        return this.emails.map(function (item) {
            return item.name;
        });
    };
    EmailController.prototype.addEmail = function (emailString) {
        if (emailString.length > 0) {
            var newOrder = this.emails.length == 0 ? 1 : this.emails[this.emails.length - 1].order + 1;
            this.emails.push(new EmailString(emailString, newOrder, this.isValid(emailString)));
            this.emailString = "";
        }
    };
    EmailController.prototype.addEmailWithEvent = function ($event) {
        if ($event.keyCode === 13) {
            this.addEmail(this.emailString);
        }
        if ($event.keyCode === 188) {
            var subEmailString = this.emailString.substr(0, this.emailString.length - 1);
            this.addEmail(subEmailString);
        }
    };
    EmailController.prototype.setInputFocus = function (event) {
        $('#inputFocus', event.target).focus();
    };
    EmailController.prototype.deleteEmailString = function (order) {
        var deleteOrder = 0;
        for (var i = 0; i < this.emails.length; i++) {
            if (this.emails[i].order == order) {
                deleteOrder = i;
                break;
            }
        }
        this.emails.splice(deleteOrder, 1);
    };
    EmailController.prototype.isValid = function (email) {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/;
        return reg.test(email);
    };
    EmailController.prototype.addRandomEmail = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < Math.floor(Math.random() * possible.length); i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        this.addEmail(text + "@ya.ru");
    };
    EmailController.prototype.getEmailsCount = function () {
        alert("Emails count is " + this.emails.length);
    };
    return EmailController;
})();
function emailDirective() {
    return {
        restrict: "E",
        controller: EmailController,
        controllerAs: 'ctrl',
        templateUrl: '/app/inputEmail.html'
    };
}
var app = angular.module("app", []);
app.directive("emailsEditor", emailDirective);
app.controller("EmailController", ["$scope", EmailController]);
/// <reference path="inputEmail.html.ts" />
/// <reference path="main.ts" />
//# sourceMappingURL=out.js.map