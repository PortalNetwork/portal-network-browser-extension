import UrlSearch from '../src/lib/UrlSearch';
const seach = [
    '?id=9527',
    '?name=phyrextsai.eth',
    '?id=9527&name=phyrextsai.eth'
];
test('get url test(id=9527)', () => {
    let url = UrlSearch(seach[0]);
    expect(url['id']).toMatch(/9527/);
});
test('get url test(name=phyrextsai.eth)', () => {
    let url = UrlSearch(seach[1]);
    expect(url['name']).toMatch(/phyrextsai.eth/);
});
test('get url test(id=9527&name=phyrextsai.eth)', () => {
    let url = UrlSearch(seach[2]);
    expect(url['id']).toMatch(/9527/);
    expect(url['name']).toMatch(/phyrextsai.eth/);
});