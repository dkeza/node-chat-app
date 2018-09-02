let expect = require('expect');

let {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'Jen';
        let text = 'Some message';
        let message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let from = 'Me';
        let latitude =29.2608651;
        let longitude = 11.8319339;
        let message = generateLocationMessage(from, latitude, longitude);
        let url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        expect(message.createdAt).toBeA('number');
        //expect(message.url).toBe(url);
        expect(message).toInclude({from, url});
    });
});