class ColorSchemeSerializer < ApplicationSerializer
  attributes :id, :name, :is_base, :theme_id
  has_many :colors, serializer: ColorSchemeColorSerializer, embed: :objects
end
