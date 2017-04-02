require 'liquid'
require 'uri'

module StringHelpers
  def simple_humanize(string)
    string.split(/(?=[A-Z])/).join(' ')
  end

  def titleize(string)
    string.split(' ').map { |word| word[0].upcase + word[1..-1] }.join(' ')
  end
end

Liquid::Template.register_filter(StringHelpers)
