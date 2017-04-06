/**
  An input field for a color.

  @param hexValue is a reference to the color's hex value.
  @param brightnessValue is a number from 0 to 255 representing the brightness of the color. See ColorSchemeColor.
  @params valid is a boolean indicating if the input field is a valid color.
**/
export default Ember.Component.extend({
  classNames: ['color-picker'],
  hexValueChanged: function() {
    var hex = this.get('hexValue');
    let $text = this.$('input.hex-input');

    if (this.get('valid')) {
      $text.attr('style', 'color: ' + (this.get('brightnessValue') > 125 ? 'black' : 'white') + '; background-color: #' + hex + ';');
    } else {
      $text.attr('style', '');
    }
  }.observes('hexValue', 'brightnessValue', 'valid'),

  didInsertElement() {
    Em.run.schedule('afterRender', ()=>{
      this.hexValueChanged();
    });
  }
});
