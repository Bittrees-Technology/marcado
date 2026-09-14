import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {itemInput} from '../lib/catalog.mjs';
const read=p=>JSON.parse(fs.readFileSync(p));
const rows=read('data/sourcing-round5.json');
const evidence=new Map(read('data/research/sourcing-round5-evidence.json').map(e=>[e.id,e]));
test('additional regional offers have distinct sources, fixed prices, qualified miners and verified photos',()=>{
 assert.equal(rows.length,178);assert.equal(new Set(rows.map(r=>r.id)).size,rows.length);assert.equal(new Set(rows.map(r=>r.source_url)).size,rows.length);
 assert.equal(new Set(rows.map(r=>r.source_name+'|'+r.name)).size,rows.length);
 for(const r of rows){assert.doesNotThrow(()=>itemInput(r));const e=evidence.get(r.id);assert.ok(e,r.id);assert.equal(e.http_status,200);assert.equal(e.price,r.price);assert.equal(e.currency,r.currency);assert.match(e.html_sha256,/^[a-f0-9]{64}$/);assert.equal(r.supplier_status,'Unknown');assert.ok(r.price>0);assert.ok(['US','MX','EU','UK'].includes(r.supplier_region));assert.match(e.availability,/InStock|LimitedAvailability|is_in_stock=true/);assert.equal(createHash('sha256').update(fs.readFileSync('public'+r.image_url)).digest('hex'),r.image_sha256);if(['asic','bitaxe'].includes(r.product_id))assert.match(r.hashrate,/TH\/s/);}
 assert.equal(rows.filter(r=>['asic','bitaxe'].includes(r.product_id)).length,7);
 assert.ok(rows.find(r=>r.id==='r5-pishop-36832ff5e2c7').configuration_note.includes('not included'));
 assert.ok(rows.find(r=>r.id==='r5-berrybase-58d20b061f72').name.includes('CM5002000'));
});
