FactoryGirl.define do
  factory :daily_member do
    position 'Executive Photo Editor'
    name { "#{Faker::Name.first_name} #{Faker::Name.last_name}" }
    email { Faker::Internet.email }
    phone "603 666 1111"
  end
end
