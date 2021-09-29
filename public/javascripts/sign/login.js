const main = {
    init : function() {
        const _this = this;
		document.querySelector('#send').onclick = function() {
            _this.login();
        };
        document.querySelector('#join').onclick = function() {
            _this.join();
        };
    },
    login : function() {
        const data = {
            id : document.getElementById('id').value,
            pw : document.getElementById('pw').value
        }
        console.log(data);
		axios.post("/login", data)
			.then(res => {
                console.log(res);
				if(res.status === 200 && res.statusText === "OK") {
                    if(res.data === 0){
                        alert("가입되지 않은 회원입니다.");
                        location.href = '/login';
                    } else {
                        alert("로그인 성공");
                        location.href = '/';
                    }
                } else {
					alert("실패!");
                    location.href = '/login';
                }
            });
    },
    join : function() {
        location.href = '/join';
    }
};
main.init();