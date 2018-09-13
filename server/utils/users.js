[{
    id: 'fsdfdsfds77schsdhcs',
    name: 'Pera',
    room: 'Some room'
}]

class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        const user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        let user = this.users.filter((user) =>  user.id === id)[0];
        if (user) {
            this.users = this.users.filter( (user) => user.id !== id );
        }
        return user;
    }
    getUser(id) {
        let user = this.users.filter((user) =>  user.id === id)[0];
        return user;
    }
    getUserList(room) {
        let users = this.users.filter((user) =>  user.room === room);
        let namesArr = users.map( (user) => user.name);
        return namesArr;
    }
}

module.exports = {Users};