import ContactProxy from '@/api/contactproxy.ts';

let MyContactProxy = null;

beforeAll(() => {
    MyContactProxy = new ContactProxy('dev');
});

describe('ContactProxy', () => {

    test('getContact 2001 OK', async () => {
        let res = await MyContactProxy.getContact(2001);
        expect(res).toBeDefined();
        console.log(JSON.stringify(res.data).substr(0,90)+'...');
        console.log(JSON.stringify(res.data.campana).substr(0,90)+'...');
        console.log(JSON.stringify(res.data.llamada[9]).substr(0,90)+'...');
        console.log(JSON.stringify(res.data.llamada[9].motivono));
        console.log(JSON.stringify(res.data.llamada[9].resultado));
        expect(res.ok).toBe(true);
    });
    test('getContact 8 KO', async () => {
        let res = await MyContactProxy.getContact(8);
        expect(res).toBeDefined();
        console.log(JSON.stringify(res).substr(0,90)+'...');
        expect(res.ok).toBe(false);
    });
})