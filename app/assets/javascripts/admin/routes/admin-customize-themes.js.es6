import showModal from 'discourse/lib/show-modal';
import { popupAjaxError } from 'discourse/lib/ajax-error';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('theme');
  },

  setupController(controller, model) {
    this._super(controller, model);
    // TODO ColorScheme to model
    controller.set("editingTheme", false);
  },

  actions: {
    importModal() {
      showModal('upload-theme');
    },

    newTheme(obj) {
      obj = obj || {name: I18n.t("admin.customize.new_style")};
      const item = this.store.createRecord('site-customization');

      const all = this.modelFor('adminCustomizeThemes');
      const self = this;
      item.save(obj).then(function() {
        all.pushObject(item);
        self.transitionTo('adminCustomizeTheme.show', item.get('id'), 'css');
      }).catch(popupAjaxError);
    }
  }
});
