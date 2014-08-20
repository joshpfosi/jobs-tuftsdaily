# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# some fixture data
daily_members = [
  { :position => "Editor-in-Chief", :name => "Alex Schroeder", :email => "alexander.schroeder@tufts.edu", :phone => "(860)-608-2056" },
  { :position => "Managing Editor", :name => "Justin Rheingold", :email => "justin.rheingold@tufts.edu", :phone => "(301)-789-8106" },
  { :position => "Managing Editor", :name => "Lily Sieradzki", :email => "lily.sieradzki@tufts.edu", :phone => "(240) 543-9860" },
  { :position => "Production Director", :name => "Andrew Stephens", :email => "andrew.stephens@tufts.edu", :phone => "(860)-578-7521" },
  { :position => "Exec News Editor", :name => "Patrick McGrath", :email => "Patrick.mcgrath@tufts.edu", :phone => "(978) 314-8193" },
  { :position => "News Editor", :name => "Danny Bottino", :email => "daniel.bottino@tufts.edu", :phone => "(207) 703-8017" },
  { :position => "News Editor", :name => "Jenna Buckle", :email => "jenjen100@gmail.com", :phone => "(310) 938-5637" },
  { :position => "News Editor", :name => "Abigail Feldman", :email => "abigail.feldman@tufts.edu", :phone => "(781) 771-1036" },
  { :position => "News Editor", :name => "Shana Friedman", :email => "shana.friedman@tufts.edu", :phone => "(818) 481-8532" },
]

DailyMember.destroy_all
daily_members.each do |daily_member|
  DailyMember.create!(daily_member)
end

jobs = [
  { :timestamp => 1406306873020, :title => "Bushes", :full_name => "Flora Guerra", :email => "floraguerra@overplex.com", :phone => "(883) 579-2878", :contact => "floraguerra@overplex.com", :section => "Sports", :coverage_type => "Action", :due_date => "2014-08-31", :due_time => "10:00", :details => "Qui ullamco ut voluptate anim cupidatat adipisicing do.", :state => 1, :loc => "Tisch Roof", :date => "2014-08-15", :time => "15:00", :daily_member_id => DailyMember.first.id},
  { :timestamp => 1405335219583, :full_name => "Hurst Elliott", :email => "hurstelliott@overplex.com", :phone => "(924) 423-3366", :contact => "hurstelliott@overplex.com", :section => "Sports", :coverage_type => "Action", :due_date => "2014-08-31", :due_time => "10:00", :details => "Sunt pariatur dolore quis eu cillum enim in et tempor elit.", :state => 1, :loc => '', :date => '', :time => '' },
  { :timestamp => 1407155275282, :full_name => "Susana Franklin", :email => "susanafranklin@overplex.com", :phone => "(978) 427-2685", :contact => "susanafranklin@overplex.com", :section => "Sports", :coverage_type => "Action", :due_date => "2014-08-31", :due_time => "10:00", :details => "Velit laboris fugiat id proident sunt dolor fugiat aliqua et nisi laboris eiusmod eiusmod.", :state => 3, :loc => '', :date => '', :time => '' },
  { :timestamp => 1405899554503, :full_name => "Augusta Solis", :email => "augustasolis@overplex.com", :phone => "(968) 585-2291", :contact => "augustasolis@overplex.com", :section => "Sports", :coverage_type => "Action", :due_date => "2014-08-31", :due_time => "10:00", :details => "Commodo irure laborum consectetur aute mollit adipisicing excepteur.", :state => 0, :loc => '', :date => '', :time => '' },
  { :timestamp => 1405985506198, :full_name => "Noemi Shaw", :email => "noemishaw@overplex.com", :phone => "(924) 527-3493", :contact => "noemishaw@overplex.com", :section => "Sports", :coverage_type => "Action", :due_date => "2014-08-31", :due_time => "10:00", :details => "Sunt exercitation id cupidatat aliqua ipsum cillum cupidatat sit quis eiusmod dolore et.", :state => 1, :loc => '', :date => '', :time => '' },
  { :timestamp => 1406750549992, :full_name => "Daisy Cooley", :email => "daisycooley@overplex.com", :phone => "(969) 593-3713", :contact => "daisycooley@overplex.com", :section => "Sports", :coverage_type => "Action", :due_date => "2014-08-31", :due_time => "10:00", :details => "Velit do pariatur cillum amet enim occaecat enim labore incididunt sint excepteur quis.", :state => 1, :loc => '', :date => '', :time => '' },
  { :timestamp => 1406197965080, :full_name => "Francis Lambert", :email => "francislambert@overplex.com", :phone => "(890) 547-2330", :contact => "francislambert@overplex.com", :section => "Sports", :coverage_type => "Action", :due_date => "2014-08-31", :due_time => "10:00", :details => "Officia officia dolore irure consequat.", :state => 0, :loc => '', :date => '', :time => '' },
]

Job.destroy_all
jobs.each do |job|
  Job.create!(job)
end
