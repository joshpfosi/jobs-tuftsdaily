FactoryGirl.define do
  factory :project do
    title "Test Name"
    author { "#{Faker::Name.first_name} #{Faker::Name.last_name}" }
    publish_date { Faker::Time.forward(30) }
    start_date { Faker::Time.forward(25) }
    notes { Faker::Lorem.paragraph(3) }
  end
end
