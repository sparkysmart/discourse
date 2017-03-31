import RestModel from 'discourse/models/rest';
import { default as computed } from 'ember-addons/ember-computed-decorators';

const Theme = RestModel.extend({

  @computed('theme_fields')
  themeFields(fields) {

    if (!fields) {
      this.set('theme_fields', []);
      return {};
    }

    let hash = {};
    if (fields) {
      fields.forEach(field=>{
        hash[field.target + " " + field.name] = field;
      });
    }
    return hash;
  },

  getField(target, name) {
    let themeFields = this.get("themeFields");
    let key = target + " " + name;
    let field = themeFields[key];
    return field ? field.value : "";
  },

  setField(target, name, value) {
    this.set("changed", true);

    let themeFields = this.get("themeFields");
    let key = target + " " + name;
    let field = themeFields[key];
    if (!field) {
      field = {name, target, value};
      this.theme_fields.push(field);
      themeFields[key] = field;
    } else {
      field.value = value;
    }
  },

  @computed("child_themes.@each")
  child_theme_ids(childThemes) {
    if (childThemes) {
      return childThemes.map(theme => Ember.get(theme, "id"));
    }
  },

  removeChildTheme(childTheme) {
    const childThemes = this.get("child_themes");
    const theme = childThemes.findBy("id", Ember.get(childTheme,"id"));
    if (theme) {
      childThemes.removeObject(theme);
      return this.saveChanges("child_theme_ids");
    }
  },

  addChildTheme(childTheme){
    let childThemes = this.get("child_themes");
    if (!childThemes){
      childThemes = [];
      this.set("child_themes", childThemes);
    }
    childThemes.push(childTheme);
    return this.saveChanges("child_theme_ids");
  },

  description: function() {
    return "" + this.name + (this.enabled ? ' (*)' : '');
  }.property('selected', 'name', 'enabled'),

  changed: false,

  saveChanges() {
    let fields = arguments.length > 0 ? arguments : ["name", "color_scheme_id", "theme_fields"];
    const hash = this.getProperties.apply(this,fields);
    return this.save(hash)
      .then(() => this.set("changed", false));
  },

});

export default Theme;
