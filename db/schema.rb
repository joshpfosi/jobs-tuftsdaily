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

ActiveRecord::Schema.define(version: 20150120140331) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "daily_members", force: :cascade do |t|
    t.string   "position"
    t.string   "name"
    t.string   "email"
    t.string   "phone"
    t.string   "day"
    t.string   "back_day"
    t.text     "notes"
    t.string   "sports"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer  "priority",               default: 0, null: false
    t.integer  "attempts",               default: 0, null: false
    t.text     "handler",                            null: false
    t.text     "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "delayed_reference_id"
    t.string   "delayed_reference_type"
  end

  add_index "delayed_jobs", ["delayed_reference_id"], name: "delayed_jobs_delayed_reference_id", using: :btree
  add_index "delayed_jobs", ["delayed_reference_type"], name: "delayed_jobs_delayed_reference_type", using: :btree
  add_index "delayed_jobs", ["priority", "run_at"], name: "delayed_jobs_priority", using: :btree

  create_table "jobs", force: :cascade do |t|
    t.string   "title"
    t.string   "timestamp"
    t.string   "full_name"
    t.string   "email"
    t.string   "phone"
    t.string   "contact"
    t.string   "section"
    t.string   "coverage_type"
    t.datetime "due_date"
    t.text     "details"
    t.integer  "state"
    t.string   "loc"
    t.string   "date"
    t.string   "time"
    t.datetime "publish_date"
    t.text     "notes"
    t.integer  "daily_member_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "jobs", ["daily_member_id"], name: "index_jobs_on_daily_member_id", using: :btree

  create_table "projects", force: :cascade do |t|
    t.string   "title"
    t.string   "author"
    t.datetime "publish_date"
    t.datetime "start_date"
    t.text     "notes"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "authentication_token"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
