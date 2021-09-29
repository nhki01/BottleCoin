const main = {
    init : function() {
        const _this = this;
		document.querySelector('#result_modify').onclick = function() {
            _this.modify();
        }
    },
    modify : function() {
        location.href = '/myinfo_modify';
    }
};
main.init();