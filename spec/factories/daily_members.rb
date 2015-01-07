FactoryGirl.define do
  factory :daily_member do
    position 'Executive Photo Editor'
    name "Test Name"
    email { Faker::Internet.email }
    phone "603 666 1111"
  end
end
