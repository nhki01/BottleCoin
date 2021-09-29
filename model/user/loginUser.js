class LoginUser { 
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
module.exports = (data) => new LoginUser(data);