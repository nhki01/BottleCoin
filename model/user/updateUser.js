class UpdateUser {
    constructor(data) {
        this.id = data.id;
        this.profile_img = data.profile_img;
        this.pw = data.pw;
        this.name = data.name;
        this.tel = data.tel;
    }
}

module.exports = (data) => new UpdateUser(data);