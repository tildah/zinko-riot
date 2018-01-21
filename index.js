const Zinko = require('zinko');
const riot = require('riot');
const fs = require('fs');
const path = require('path');

class ZinkoRiot extends Zinko {

  constructor(dirname, app) {
    super(dirname, app);
    app.riotOptions = app.riotOptions || {};
    this.riotOptions = {
      tagsPath: this.tagsPath || app.riotOptions.tagsPath || '/riot_tags/',
      tagsExt: this.tagsExt || app.riotOptions.tagsExt || 'tag',
      cmpOptions: this.cmpOptions || app.riotOptions.cmpOptions || {},
      dest: this.dest || app.riotOptions.dest || '/client/tags.js'
    }
    this.loadTags();
    var js = riot.compile(this.src, this.riotOptions.cmpOptions);
    fs.writeFileSync(dirname + this.riotOptions.dest, js);
  }

  loadTags() {
    this.src = '';
    var tagsDirPath = this.dirname + this.riotOptions.tagsPath;
    if (!fs.existsSync(tagsDirPath)) return;
    var tagsDir = fs.readdirSync(tagsDirPath);
    tagsDir.forEach(element => {
      if (path.extname(element) !== '.' + this.riotOptions.tagsExt) return;
      this.src += fs.readFileSync(tagsDirPath + '/' + element, 'utf-8');
    })
  }

}

module.exports = ZinkoRiot;