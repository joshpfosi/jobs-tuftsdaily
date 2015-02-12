FactoryGirl.define do
  factory :job do
    title { Faker::App.name }
    created_at { Time.now }
    full_name { "#{Faker::Name.first_name} #{Faker::Name.last_name}" }
    email { Faker::Internet.email }
    phone { Faker::PhoneNumber.phone_number }
    section "News"
    coverage_type "Events"
    publish_date { Faker::Time.forward(30) }
    due_date { Faker::Time.forward(25) }
    details { Faker::Lorem.paragraph(3) }
    state 0
  end
end
