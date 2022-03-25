const perModule = 100;

for (let i = 0; i < 8; i++) {
  const start = i * perModule + 1;
  const end = (i * perModule) + perModule;

  QUnit.module(`${start} - ${end}`);
  for (let i = start; i <= end; i++) {
    QUnit.test(`${i} foo`, function(assert) {
      return new Promise(function(resolve, reject) {
        assert.equal(true, true);
        assert.equal(true, true);
        resolve();
      });
    });
  }
}
