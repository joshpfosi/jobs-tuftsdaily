# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#positions = ['Executive Photo Editor', 'Photo Administrator', 'Picture Tufts Editor', 'Picture Tufts Contributor', 'Stock Image Editor', 'Section Liaison', 'Staff Photographer', 'Project Photographer', 'Trainee', 'Inactive']
#sections = ['News', 'Features', 'Sports', 'Arts', 'Multimedia', 'Op-Ed'],
#coverage_types = ['Portrait/Headshot', 'Event', 'Lecture', 'Feature Story', 'File Photo', 'Stock', 'Other'],
#
#20.times do
#  DailyMember.create!({
#    position: positions.sample(1).first,
#    name: "#{Faker::Name.first_name} #{Faker::Name.last_name}",
#    email: Faker::Internet.email,
#    phone: Faker::PhoneNumber.phone_number
#  })
#end
#
#User.create(email: "npfosi@gmail.com", password: "supero11143")
#User.create(email: "evan.sayles@tufts.edu", password: "dailyphoto")
#User.create(email: "evan.sayles@gmail.com", password: "dailyphoto")
#
#DailyMember.create!({position: "Executive Photo Editor", name: "Nicholas Pfosi", email: "npfosi@gmail.com", phone: "603 686 3733", day: nil, back_day: nil, notes: nil, sports: nil})
#DailyMember.create!({position: "Staff Photographer", name: "Alexandra Magnani", email: "alexandra.magnani@tufts.edu", phone: "610 389 4144", day: "Friday", back_day: "Sunday", notes: "Good last minute handling of a request", sports: "Yes"})
#DailyMember.create!({position: "Stock Image Editor", name: "Kelly Fahey", email: "Kelly.Fahey@tufts.edu", phone: "407 949 2654", day: "Friday", back_day: "Tuesday", notes: "", sports: "Yes"})
#DailyMember.create!({position: "Staff Photographer", name: "Alexander Knapp", email: "Alexander.Knapp@tufts.edu", phone: "508 330 5811", day: "Saturday", back_day: "Tuesday", notes: nil, sports: nil})
#DailyMember.create!({position: "Staff Photographer", name: "Alex Cherry", email: "acherry831@gmail.com", phone: "914 708 9180", day: "Monday", back_day: "Thursday", notes: "potentially shooting TMC, d3100, 18-105 ;", sports: nil})
#DailyMember.create!({position: "Staff Photographer", name: "Christie Wu", email: "yunyao.wu@tufts.edu", phone: "781 350 8841", day: "Tuesday", back_day: nil, notes: nil, sports: nil})
#DailyMember.create!({position: "Staff Photographer", name: "Ray Bernoff", email: "ray.bernoff@tufts.edu", phone: "781 290 9979", day: "Sunday", back_day: "Friday", notes: "Only has a 28mm lens", sports: "Yes"})
#DailyMember.create!({position: "Project Photographer", name: "Maya Blackstone", email: "maya.blackstone@tufts.edu", phone: "111 111 1111", day: nil, back_day: nil, notes: nil, sports: "No"})
#DailyMember.create!({position: "Staff Photographer", name: "Ethan Chan", email: "ethan.chan@tufts.edu", phone: "508 395 1131", day: "Saturday", back_day: "Wednesday", notes: "Unable to come to initial meeting", sports: "Yes"})
#DailyMember.create!({position: "Staff Photographer", name: "Caroline Ambros", email: "Caroline.Ambros@tufts.edu", phone: "818 392 0183", day: "Monday", back_day: "Sunday", notes: nil, sports: "Yes"})
#DailyMember.create!({position: "Photo Administrator", name: "Evan Sayles", email: "evan.sayles@tufts.edu", phone: "817 948 5980", day: "Sunday", back_day: nil, notes: "", sports: "Yes"})
#DailyMember.create!({position: "Staff Photographer", name: "Harry Paul", email: "harry.paul@tufts.edu", phone: "516 404 0163", day: nil, back_day: nil, notes: "Incredibly strong portfolio", sports: "Yes"})
#DailyMember.create!({position: "Trainee", name: "Roza Ogurlu", email: "roza.ogurlu@tufts.edu", phone: "857 209 1810", day: nil, back_day: nil, notes: "Works on features at her own pace.", sports: nil})
#DailyMember.create!({position: "Staff Photographer", name: "Emma Kindig", email: "Emma.kindig@tufts.edu", phone: "301 502 2550", day: nil, back_day: nil, notes: nil, sports: nil})
#DailyMember.create!({position: "Section Liaison", name: "Sofie Hecht", email: "sofie.hecht@tufts.edu", phone: "347 601 5333", day: "Thursday", back_day: "Sunday", notes: "New member, 35mm, D3100, shooting homecoming audience", sports: "No"})
#DailyMember.create!({position: "Staff Photographer", name: "Grace Cooper", email: "grace.cooper@tufts.edu", phone: "773 620 7531", day: "Friday", back_day: "Saturday", notes: "", sports: "Yes"})
#DailyMember.create!({position: "Staff Photographer", name: "John Hampson", email: "jdwhampson@gmail.com", phone: "805 451 4537", day: "Wednesday", back_day: "Thursday", notes: "Awesome conversation with him. Has pictures from horse racing/traveling across country. Needs training on new systems. Eager to get started. Good vibe.", sports: "Yes"})
#DailyMember.create!({position: "Project Photographer", name: "Ari Schneider", email: "ari.schneider@tufts.edu", phone: "802 345 8991", day: nil, back_day: nil, notes: "successful shot portraits of dean, received feedback well, promptly incorporated. Alumni stuff, TMC", sports: "Yes"})
#
#100.times do
#  Job.create!({
#    title: Faker::App.name,
#    timestamp: Time.now.to_i - rand(0..12433648),
#    full_name: "#{Faker::Name.first_name} #{Faker::Name.last_name}",
#    email: Faker::Internet.email,
#    phone: Faker::PhoneNumber.phone_number,
#    contact: Faker::Internet.email,
#    section: "News",
#    coverage_type: 'Lecture',
#    due_date: Faker::Time.forward(30),
#    details: Faker::Lorem.paragraph(3),
#    state: rand(0..5),
#    loc: "Tisch Roof",
#    date: "2014-01-02",
#    time: "13:00",
#    publish_date: Faker::Time.forward(30),
#    notes: "no notes yet",
#    daily_member: DailyMember.all.sample(1).first
#  })
#end

