const sum = require('./routes/suma');
const routes = require('./routes/index');

test('suma 1 + 5 debe ser igual a 6', ()=>{
    expect(sum(1,5)).toBe(6);
} )
