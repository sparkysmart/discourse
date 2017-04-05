import ColorScheme from 'admin/models/color-scheme';

export default Ember.Route.extend({

  model() {
    return ColorScheme.findAll();
  },

  deactivate() {
    this._super();
    this.controllerFor('adminCustomizeThemesColors').set('selectedItem', null);
  },

  setupController(controller, model) {
    controller.set("model", model);
    this.controllerFor("adminCustomizeThemes").set("editingTheme", true);
  }
});
