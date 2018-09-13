const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    var users = null;

    beforeEach( () => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        },
        {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        },
        {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }
    ]
    });

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'Pera',
            room: 'My room'
        };
        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove user', () => {
        let user = users.removeUser('3');

        expect(user.id).toBe('3');
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        let user = users.removeUser('99');

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        let user = users.getUser('1');

        expect(user).toEqual({
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        });
    });

    it('should not find user', () => {
        let user = users.getUser('99');
        expect(user).toNotExist();
    });

    it('should return names for node course', () => {
        let usersList = users.getUserList('Node Course');

        expect(usersList).toEqual(['Mike', 'Julie']);
    });

    it('should return names for react course', () => {
        let usersList = users.getUserList('React Course');

        expect(usersList).toEqual(['Jen']);
    });
});