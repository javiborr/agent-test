import ContactProxy from '@/api/contactproxy.ts';

let MyContactProxy = null;

beforeAll(() => {
    MyContactProxy = new ContactProxy('test');
});

describe('ContactProxy', () => {

    test('getContact 84 OK', async () => {
        const res = await MyContactProxy.getContact(84);
        expect(res).toBeDefined();
        expect(res.data).toBeDefined();
        console.log('getContact 84 OK BEGIN');
        console.log(JSON.stringify(res.data).substring(0,90)+'...');
        console.log(JSON.stringify(res.data.campana).substring(0,90)+'...');
        console.log(JSON.stringify(res.data.llamada[1]).substring(0,90)+'...');
        console.log(JSON.stringify(res.data.llamada[1].motivono));
        console.log(JSON.stringify(res.data.llamada[1].resultado));
        console.log('getContact 84 OK END');
        expect(res.ok).toBe(true);
    });
    test('getContact 18 KO', async () => {
        const res = await MyContactProxy.getContact(18);
        expect(res).toBeDefined();
        expect(res.ok).toBeDefined();
        console.log('getContact 18 KO');
        console.log(JSON.stringify(res).substring(0,90)+'...');
        expect(res.ok).toBe(false);
    });
    test('getTipificacion BilbaoVida 1 OK', async () => {
        const campname = 'BilbaoVida';
        const tipo = 1;
        const res = await MyContactProxy.getTipificacion(campname, tipo);
        expect(res).toBeDefined();
        expect(res.ok).toBeDefined();
        console.log('getTipificacion BilbaoVida 1 OK');
        console.log(JSON.stringify(res).substring(0,90)+'...');
        expect(res.ok).toBe(true);
    });
    test('getTipificacion BilbaoVida 2 OK', async () => {
        const campname = 'BilbaoVida';
        const tipo = 2;
        const res = await MyContactProxy.getTipificacion(campname, tipo);
        expect(res).toBeDefined();
        expect(res.ok).toBeDefined();
        console.log('getTipificacion BilbaoVida 2 OK');
        console.log(JSON.stringify(res).substring(0,90)+'...');
        expect(res.ok).toBe(true);
    });
    test('getLlamadasReprogByDateAndAgent OK', async () => {
        const dtok = new Date(2020,5,15);
        const userid = 2172;
        const res = await MyContactProxy.getLlamadasReprogByDateAndAgent(dtok, userid);
        expect(res).toBeDefined();
        expect(res.ok).toBeDefined();
        console.log('getLlamadasReprogByDateAndAgent OK');
        console.log(JSON.stringify(res).substring(0,190)+'...');
        console.log(res);
        //console.log(res.data[0].llamadas[0]);
        expect(res.ok).toBe(true);
    });
    test('updateAutoriza OK', async () => {
        const easycode = 84;
        const llamada = true;
        const lopd = false;
        const dgs = null;
        const res = await MyContactProxy.updateAutoriza(easycode, llamada, lopd, dgs);
        expect(res).toBeDefined();
        expect(res.ok).toBeDefined();
        console.log('updateAutoriza OK');
        console.log(res);
        expect(res.ok).toBe(true);
    });
    test('updateResultadoMotivo OK', async () => {
        const llamadaid = 32;
        const resultadocode = 16;
        const motivono = null;
        const res = await MyContactProxy.updateResultadoMotivo(llamadaid, resultadocode, motivono);
        expect(res).toBeDefined();
        expect(res.ok).toBeDefined();
        console.log('updateResultadoMotivo OK');
        console.log(res);
        expect(res.ok).toBe(true);
    });
    test('getUser OK', async () => {
        const userid = 2003;
        const res = await MyContactProxy.getUser(userid);
        expect(res).toBeDefined();
        expect(res.ok).toBeDefined();
        console.log('getUser OK');
        console.log(res);
        expect(res.ok).toBe(true);
    });
    test('asignaLlamada OK', async () => {
        const llamadaid = 56;
        const userid = 2003;
        const res = await MyContactProxy.asignaLlamada(llamadaid, userid);
        expect(res).toBeDefined();
        expect(res.ok).toBeDefined();
        console.log('asignaLlamada OK');
        console.log(res);
        expect(res.ok).toBe(true);
    });
})