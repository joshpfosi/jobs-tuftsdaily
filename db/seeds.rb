# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

positions = ['Executive Photo Editor', 'Photo Administrator', 'Picture Tufts Editor', 'Picture Tufts Contributor', 'Stock Image Editor', 'Section Liaison', 'Staff Photographer', 'Project Photographer', 'Trainee', 'Inactive']
sections = ['News', 'Features', 'Sports', 'Arts', 'Multimedia', 'Op-Ed'],
coverage_types = ['Portrait/Headshot', 'Event', 'Lecture', 'Feature Story', 'File Photo', 'Stock', 'Other'],

20.times do
  DailyMember.create!({
    position: positions.sample(1).first,
    name: "#{Faker::Name.first_name} #{Faker::Name.last_name}",
    email: Faker::Internet.email,
    phone: Faker::PhoneNumber.phone_number
  })
end

100.times do
  Job.create!({
    title: Faker::App.name,
    timestamp: Time.now.to_i - rand(0..12433648),
    full_name: "#{Faker::Name.first_name} #{Faker::Name.last_name}",
    email: Faker::Internet.email,
    phone: Faker::PhoneNumber.phone_number,
    contact: Faker::Internet.email,
    section: "News",
    coverage_type: coverage_types.sample(1).first,
    due_date: "2014-01-14",
    details: Faker::Lorem.paragraph(3),
    state: rand(0..5),
    loc: "Tisch Roof",
    date: "2014-01-02",
    time: "13:00",
    publish_date: "2014-01-16",
    notes: "no notes yet",
    daily_member: DailyMember.all.sample(1).first
  })
end

User.create(email: "npfosi@gmail.com", password: "supero11143")
User.create(email: "praekarn.nirandara@tufts.edu", password: "dailyphoto")
