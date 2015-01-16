import DS from "ember-data";

export default DS.Transform.extend({
  serialize: function(value) {
    return value ? moment.utc(new Date(value)).format() : null;
  },
  deserialize: function(value) {
    return value ? moment.utc(value).format("YYYY-MM-DD") : null;
  }
});
