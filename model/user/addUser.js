class AddUser { // AddUser 는 회원가입시 들어오는 데이터를 클래스화 한 것이다.
    constructor(data) {
        this.id = data.id;
        this.profile_img = data.profile_img;
        this.pw = data.pw;
        this.name = data.name;
        this.tel = data.tel;
        this.point = data.point;
        this.warning = data.warning;
        this.user_state = data.user_state;
    }
}

// 이제 이 js 파일을 다른 js 에서 불러올 때는
// data 를 받아 여기서의 addUser 클래스를 사용해
// 객체를 생성한다.
module.exports = (data) => new AddUser(data);