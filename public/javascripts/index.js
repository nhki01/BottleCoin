const main = {
    init : function() {
        const _this = this;
		document.querySelector('#logout').onclick = function() {
            _this.logout();
        };
        document.querySelector('#myinfo').onclick = function() {
            _this.myinfo();
        };
        document.querySelector('#delete').onclick = function() {
            _this.delete();
        };
        document.querySelector('#point').onclick = function() {
            _this.point();
        };
        document.querySelector('#lotto').onclick = function() {
            _this.lotto();
        };
        document.querySelector('#mystore').onclick = function() {
            _this.mystore();
        };
        document.querySelector('#machine').onclick = function() {
            _this.machine();
        };
    },
    logout : function() {
		location.href = '/logout';
    },
    myinfo : function() {
        location.href = '/myinfo';
    },
    delete : function() {
        location.href = '/delete';
    },
    point : function() {
        location.href = '/point';
    },
    lotto : function() {
        location.href = '/lotto';
    },
    mystore : function() {
        location.href = '/mystore';
    },
    machine : function() {
        location.href = '/machine';
    }
};
main.init();