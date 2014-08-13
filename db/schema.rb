# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140813130032) do

  create_table "daily_members", force: true do |t|
    t.string   "position"
    t.string   "name"
    t.string   "email"
    t.string   "phone"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "jobs", force: true do |t|
    t.string   "timestamp"
    t.string   "title"
    t.string   "full_name"
    t.string   "email"
    t.string   "phone"
    t.string   "contact"
    t.string   "section"
    t.string   "coverage_type"
    t.string   "due_date"
    t.string   "due_time"
    t.string   "details"
    t.integer  "state"
    t.string   "loc"
    t.string   "date"
    t.string   "time"
    t.integer  "daily_member_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
