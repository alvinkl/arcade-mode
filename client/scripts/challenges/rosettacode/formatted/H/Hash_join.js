/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Hash join
/// type: rosetta-code

/// categories:


/// difficulty: 3

/// benchmark:
hashJoin(bench1, bench2);

/// description:
/// <div class="rosetta"><br/><p class="rosetta__paragraph">An <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Join_(SQL)#Inner_join" title="wp: Join_(SQL)#Inner_join">inner join</a> is an operation that combines two data tables into one table, based on matching column values. The simplest way of implementing this operation is the <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Nested loop join" title="wp: Nested loop join">nested loop join</a> algorithm, but a more scalable alternative is the <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/hash join" title="wp: hash join">hash join</a> algorithm.</p>
/// <br/>
/// <p class="rosetta__paragraph">Implement the "hash join" algorithm, and demonstrate that it passes the test-case listed below.</p><br/><p class="rosetta__paragraph">You should represent the tables as data structures that feel natural in your programming language.</p>
/// <br/>
/// <p class="rosetta__paragraph">The "hash join" algorithm consists of two steps:</p><br/>
/// <ol class="rosetta__ordered-list">
/// <li class="rosetta__list-item--ordered"><span class="rosetta__text--bold">Hash phase:</span> Create a <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Multimap" title="wp: Multimap">multimap</a> from one of the two tables, mapping from each join column value to all the rows that contain it.<br></li>
/// <ul class="rosetta__unordered-list">
/// <li class="rosetta__list-item--unordered"> The multimap must support hash-based lookup which scales better than a simple linear search, because that's the whole point of this algorithm.</li>
/// <li class="rosetta__list-item--unordered"> Ideally we should create the multimap for the <span class="rosetta__text--italic">smaller</span> table, thus minimizing its creation time and memory size.</li>
/// </ul>
/// <li class="rosetta__list-item--ordered"><span class="rosetta__text--bold">Join phase:</span> Scan the other table, and find matching rows by looking in the multimap created before.</li>
/// </ol><br>
/// <p class="rosetta__paragraph">In pseudo-code, the algorithm could be expressed as follows:</p><br/>
/// <div class="rosetta__pre-wrap"><pre class="rosetta__pre">
/// <span class="rosetta__text--bold">let</span> <span class="rosetta__text--italic">A</span> = the first input table (or ideally, the larger one)
/// <span class="rosetta__text--bold">let</span> <span class="rosetta__text--italic">B</span> = the second input table (or ideally, the smaller one)
/// <span class="rosetta__text--bold">let</span> <span class="rosetta__text--italic">j<sub>A</sub></span> = the join column ID of table <span class="rosetta__text--italic">A</span>
/// <span class="rosetta__text--bold">let</span> <span class="rosetta__text--italic">j<sub>B</sub></span> = the join column ID of table <span class="rosetta__text--italic">B</span>
/// <span class="rosetta__text--bold">let</span> <span class="rosetta__text--italic">M<sub>B</sub></span> = a multimap for mapping from single values to multiple rows of table <span class="rosetta__text--italic">B</span> (starts out empty)
/// <span class="rosetta__text--bold">let</span> <span class="rosetta__text--italic">C</span> = the output table (starts out empty)<br/>
/// <span class="rosetta__text--bold">for each</span> row <span class="rosetta__text--italic">b</span> <span class="rosetta__text--bold">in</span> table <span class="rosetta__text--italic">B<span class="rosetta__text--bold"></span>:</span>
/// <span class="rosetta__text--bold">  place</span> <span class="rosetta__text--italic">b</span> <span class="rosetta__text--bold">in</span> multimap <span class="rosetta__text--italic">M<sub>B</sub></span> under key <span class="rosetta__text--italic">b</span>(<span class="rosetta__text--italic">j<sub>B</sub></span>)<br/>
/// <span class="rosetta__text--bold">for each</span> row <span class="rosetta__text--italic">a</span> <span class="rosetta__text--bold">in</span> table <span class="rosetta__text--italic">A<span class="rosetta__text--bold"></span>:</span>
/// <span class="rosetta__text--bold">  for each</span> row <span class="rosetta__text--italic">b</span> <span class="rosetta__text--bold">in</span> multimap <span class="rosetta__text--italic">M<sub>B</sub></span> under key <span class="rosetta__text--italic">a</span>(<span class="rosetta__text--italic">j<sub>A</sub></span>)<span class="rosetta__text--bold">:</span>
/// <span class="rosetta__text--bold">    let</span> <span class="rosetta__text--italic">c</span> = the concatenation of row <span class="rosetta__text--italic">a</span> and row <span class="rosetta__text--italic">b</span>
/// <span class="rosetta__text--bold">    place</span> row <span class="rosetta__text--italic">c</span> in table <span class="rosetta__text--italic">C</span></p>
/// </pre></div>
/// <br/>
/// <div id="Test-case" style="margin:20px 0 10px 0; line-height:1.1; font-size:16.5px; font-weight:bold">Test-case</div>
/// <p class="rosetta__paragraph rosetta__text--centered rosetta__text--bold">Input</p>
/// <table class="rosetta__wikitable">
/// <tr>
/// <td style="padding: 4px; margin: 5px;">
/// <table style="border:none; border-collapse:collapse;">
/// <tr>
/// <td style="border:none"> <i>A =</i>
/// </td>
/// <td style="border:none">
/// <table class="rosetta__wikitable">
/// <tr>
/// <th style="padding: 4px; margin: 5px;"> Age </th>
/// <th style="padding: 4px; margin: 5px;"> Name
/// </th></tr>
/// <tr>
/// <td style="padding: 4px; margin: 5px;"> 27 </td>
/// <td style="padding: 4px; margin: 5px;"> Jonah
/// </td></tr>
/// <tr>
/// <td style="padding: 4px; margin: 5px;"> 18 </td>
/// <td style="padding: 4px; margin: 5px;"> Alan
/// </td></tr>
/// <tr>
/// <td style="padding: 4px; margin: 5px;"> 28 </td>
/// <td style="padding: 4px; margin: 5px;"> Glory
/// </td></tr>
/// <tr>
/// <td style="padding: 4px; margin: 5px;"> 18 </td>
/// <td style="padding: 4px; margin: 5px;"> Popeye
/// </td></tr>
/// <tr>
/// <td style="padding: 4px; margin: 5px;"> 28 </td>
/// <td style="padding: 4px; margin: 5px;"> Alan
/// </td></tr></table>
/// </td>
/// <td style="border:none; padding-left:1.5em;" rowspan="2">
/// </td>
/// <td style="border:none"> <i>B =</i>
/// </td>
/// <td style="border:none">
/// <table class="rosetta__wikitable">
/// <tr>
/// <th style="padding: 4px; margin: 5px;"> Character </th>
/// <th style="padding: 4px; margin: 5px;"> Nemesis
/// </th></tr>
/// <tr>
/// <td style="padding: 4px; margin: 5px;"> Jonah </td>
/// <td style="padding: 4px; margin: 5px;"> Whales
/// </td></tr>
/// <tr>
/// <td style="padding: 4px; margin: 5px;"> Jonah </td>
/// <td style="padding: 4px; margin: 5px;"> Spiders
/// </td></tr>
/// <tr>
/// <td style="padding: 4px; margin: 5px;"> Alan </td>
/// <td style="padding: 4px; margin: 5px;"> Ghosts
/// </td></tr>
/// <tr>
/// <td style="padding: 4px; margin: 5px;"> Alan </td>
/// <td style="padding: 4px; margin: 5px;"> Zombies
/// </td></tr>
/// <tr>
/// <td style="padding: 4px; margin: 5px;"> Glory </td>
/// <td style="padding: 4px; margin: 5px;"> Buffy
/// </td></tr></table>
/// </td></tr>
/// <tr>
/// <td style="border:none"> <i>j<sub>A</sub> =</i>
/// </td>
/// <td style="border:none"> <i><code>Name</code> (i.e. column 1)</i>
/// </td>
/// <td style="border:none"> <i>j<sub>B</sub> =</i>
/// </td>
/// <td style="border:none"> <i><code>Character</code> (i.e. column 0)</i>
/// </td></tr></table>
/// </td>
/// <td style="padding: 4px; margin: 5px;">
/// </td></tr></table>
/// <br>
/// <p class="rosetta__paragraph rosetta__text--centered rosetta__text--bold">Output</p>
/// <table class="rosetta__wikitable">
/// <tr>
/// <th style="padding: 4px; margin: 5px;"> A.Age </th>
/// <th style="padding: 4px; margin: 5px;"> A.Name </th>
/// <th style="padding: 4px; margin: 5px;"> B.Character </th>
/// <th style="padding: 4px; margin: 5px;"> B.Nemesis
/// </th></tr>
/// <tr>
/// <td style="padding: 4px; margin: 5px;"> 27 </td>
/// <td style="padding: 4px; margin: 5px;"> Jonah </td>
/// <td style="padding: 4px; margin: 5px;"> Jonah </td>
/// <td style="padding: 4px; margin: 5px;"> Whales
/// </td></tr>
/// <tr>
/// <td style="padding: 4px; margin: 5px;"> 27 </td>
/// <td style="padding: 4px; margin: 5px;"> Jonah </td>
/// <td style="padding: 4px; margin: 5px;"> Jonah </td>
/// <td style="padding: 4px; margin: 5px;"> Spiders
/// </td></tr>
/// <tr>
/// <td style="padding: 4px; margin: 5px;"> 18 </td>
/// <td style="padding: 4px; margin: 5px;"> Alan </td>
/// <td style="padding: 4px; margin: 5px;"> Alan </td>
/// <td style="padding: 4px; margin: 5px;"> Ghosts
/// </td></tr>
/// <tr>
/// <td style="padding: 4px; margin: 5px;"> 18 </td>
/// <td style="padding: 4px; margin: 5px;"> Alan </td>
/// <td style="padding: 4px; margin: 5px;"> Alan </td>
/// <td style="padding: 4px; margin: 5px;"> Zombies
/// </td></tr>
/// <tr>
/// <td style="padding: 4px; margin: 5px;"> 28 </td>
/// <td style="padding: 4px; margin: 5px;"> Glory </td>
/// <td style="padding: 4px; margin: 5px;"> Glory </td>
/// <td style="padding: 4px; margin: 5px;"> Buffy
/// </td></tr>
/// <tr>
/// <td style="padding: 4px; margin: 5px;"> 28 </td>
/// <td style="padding: 4px; margin: 5px;"> Alan </td>
/// <td style="padding: 4px; margin: 5px;"> Alan </td>
/// <td style="padding: 4px; margin: 5px;"> Ghosts
/// </td></tr>
/// <tr>
/// <td style="padding: 4px; margin: 5px;"> 28 </td>
/// <td style="padding: 4px; margin: 5px;"> Alan </td>
/// <td style="padding: 4px; margin: 5px;"> Alan </td>
/// <td style="padding: 4px; margin: 5px;"> Zombies
/// </td></tr></table>
/// <br>
/// <p class="rosetta__paragraph"></p><br/><p class="rosetta__paragraph"></p><br/><p class="rosetta__paragraph">The order of the rows in the output table is not significant.<br></p>
/// <p class="rosetta__paragraph">If you're using numerically indexed arrays to represent table rows (rather than referring to columns by name), you could represent the output rows in the form <code style="white-space:nowrap">[[27, "Jonah"], ["Jonah", "Whales"]]</code>.</p><br><hr><br/></div>

/// challengeSeed:
function hashJoin (hash1, hash2) {
  // Good luck!
  return [];
}

/// solutions:
function hashJoin(hash1, hash2) {
  const hJoin = (tblA, tblB, strJoin) => {
    const [jA, jB] = strJoin.split('=');
    const M = tblB.reduce((a, x) => {
      const id = x[jB];
      return (
        a[id] ? a[id].push(x) : (a[id] = [x]),
        a
      );
    }, {});

    return tblA.reduce((a, x) => {
      const match = M[x[jA]];
      return match ? (
                a.concat(match.map(row => dictConcat(x, row)))
            ) : a;
    }, []);
  };

  const dictConcat = (dctA, dctB) => {
    const ok = Object.keys;
    return ok(dctB).reduce(
            (a, k) => (a[`B_${k}`] = dctB[k]) && a,
            ok(dctA).reduce(
                (a, k) => (a[`A_${k}`] = dctA[k]) && a, {}
            )
        );
  };

  return hJoin(hash1, hash2, 'name=character');
}


/// tail:
const hash1 = [
    { age: 27, name: 'Jonah' },
    { age: 18, name: 'Alan' },
    { age: 28, name: 'Glory' },
    { age: 18, name: 'Popeye' },
    { age: 28, name: 'Alan' }
];

const hash2 = [
    { character: 'Jonah', nemesis: 'Whales' },
    { character: 'Jonah', nemesis: 'Spiders' },
    { character: 'Alan', nemesis: 'Ghosts' },
    { character: 'Alan', nemesis: 'Zombies' },
    { character: 'Glory', nemesis: 'Buffy' },
    { character: 'Bob', nemesis: 'foo' }
];

const res = [
    { A_age: 27, A_name: 'Jonah', B_character: 'Jonah', B_nemesis: 'Whales' },
    { A_age: 27, A_name: 'Jonah', B_character: 'Jonah', B_nemesis: 'Spiders' },
    { A_age: 18, A_name: 'Alan', B_character: 'Alan', B_nemesis: 'Ghosts' },
    { A_age: 18, A_name: 'Alan', B_character: 'Alan', B_nemesis: 'Zombies' },
    { A_age: 28, A_name: 'Glory', B_character: 'Glory', B_nemesis: 'Buffy' },
    { A_age: 28, A_name: 'Alan', B_character: 'Alan', B_nemesis: 'Ghosts' },
    { A_age: 28, A_name: 'Alan', B_character: 'Alan', B_nemesis: 'Zombies' }
];

const bench1 = [{ name: 'u2v7v', num: 1 }, { name: 'n53c8', num: 10 }, { name: 'oysce', num: 9 }, { name: '0mto2s', num: 1 }, { name: 'vkh5id', num: 4 }, { name: '5od0cf', num: 8 }, { name: 'uuulue', num: 10 }, { name: '3rgsbi', num: 9 }, { name: 'kccv35r', num: 4 }, { name: '80un74', num: 9 }, { name: 'h4pp3', num: 6 }, { name: '51bit', num: 7 }, { name: 'j9ndf', num: 8 }, { name: 'vf3u1', num: 10 }, { name: 'g0bw0om', num: 10 }, { name: 'j031x', num: 7 }, { name: 'ij3asc', num: 9 }, { name: 'byv83y', num: 8 }, { name: 'bjzp4k', num: 4 }, { name: 'f3kbnm', num: 10 }];
const bench2 = [{ friend: 'o8b', num: 8 }, { friend: 'ye', num: 2 }, { friend: '32i', num: 5 }, { friend: 'uz', num: 3 }, { friend: 'a5k', num: 4 }, { friend: 'uad', num: 7 }, { friend: '3w5', num: 10 }, { friend: 'vw', num: 10 }, { friend: 'ah', num: 4 }, { friend: 'qv', num: 7 }, { friend: 'ozv', num: 2 }, { friend: '9ri', num: 10 }, { friend: '7nu', num: 4 }, { friend: 'w3', num: 9 }, { friend: 'tgp', num: 8 }, { friend: 'ibs', num: 1 }, { friend: 'ss7', num: 6 }, { friend: 'g44', num: 9 }, { friend: 'tab', num: 9 }, { friend: 'zem', num: 10 }];


/// tests:
assert(typeof hashJoin === 'function', 'message: <code>hashJoin</code> is a function.');
assert.sameDeepMembers(hashJoin(hash1, hash2), res, 'message: <code>hashJoin([{ age: 27, name: "Jonah" }, { age: 18, name: "Alan" }, { age: 28, name: "Glory" }, { age: 18, name: "Popeye" }, { age: 28, name: "Alan" }], [{ character: "Jonah", nemesis: "Whales" }, { character: "Jonah", nemesis: "Spiders" }, { character: "Alan", nemesis: "Ghosts" }, { character:"Alan", nemesis: "Zombies" }, { character: "Glory", nemesis: "Buffy" }, { character: "Bob", nemesis: "foo" }])</code> should return <code>[{"A_age": 27,"A_name": "Jonah", "B_character": "Jonah", "B_nemesis": "Whales"}, {"A_age": 27,"A_name": "Jonah", "B_character": "Jonah", "B_nemesis": "Spiders"}, {"A_age": 18,"A_name": "Alan", "B_character": "Alan", "B_nemesis": "Ghosts"}, {"A_age": 18,"A_name": "Alan", "B_character": "Alan", "B_nemesis": "Zombies"}, {"A_age": 28,"A_name": "Glory", "B_character": "Glory", "B_nemesis": "Buffy"}, {"A_age": 28,"A_name": "Alan", "B_character": "Alan", "B_nemesis": "Ghosts"}, {"A_age": 28,"A_name": "Alan", "B_character": "Alan", "B_nemesis": "Zombies"}]</code>');
/// id: 5956795bc9e2c415eb244de1
