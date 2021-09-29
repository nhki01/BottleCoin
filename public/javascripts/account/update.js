const main = {
    init : function() {
        const _this = this;
		document.querySelector('#modify').onclick = function() {
            _this.update();
        }
    },
    update : function() {
        // const frm = new FormData();
        // const modify = document.querySelector('#modify');
        // frm.append('id', user_id);
        // frm.append('profile_img', modify.files[0]);
        // frm.append('pw', user_pw);
        // frm.append('name', user_name);
        // frm.append('tel', user_tel);
        // console.log(frm);
        // const frm = require('../../../model/user/loginUser')(req.body);
		// console.log(frm);
        const data = {
            pw : document.getElementById('user_pw').value,
            name : document.getElementById('user_name').value,
            tel : document.getElementById('user_tel').value
        }
        console.log(data);
        axios.post("/myinfo_modify", data)
			.then(res => {
                console.log(res);
				if(res.status === 200 && res.statusText === "OK") {
                    if(res.data === 0){
                        alert("실패");
                        location.href = '/login';
                    } else {
                        alert("수정 성공");
                        location.href = '/myinfo_result';
                    }
                } else {
					alert("실패!");
                    location.href = '/login';
                }
            });
    }
};
main.init();