const expect = require('expect');

let {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        let res = isRealString(false);
        expect(res).toBe(false);
    });

    it('should reject string with only spaces', () => {
        let res = isRealString('   ');
        expect(res).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        let res = isRealString(' test ');
        expect(res).toBe(true);
    });
});