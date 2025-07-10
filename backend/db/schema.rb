# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_07_10_003945) do
  create_table "admins", force: :cascade do |t|
    t.string "username", default: "", null: false
    t.string "nama", default: "", null: false
    t.string "role", default: "admin", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "nama_lengkap"
    t.index ["email"], name: "index_admins_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true
    t.index ["username"], name: "index_admins_on_username", unique: true
  end

  create_table "bukus", force: :cascade do |t|
    t.string "judul"
    t.string "pengarang"
    t.integer "tahun"
    t.integer "stok"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "peminjaman", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "buku_id", null: false
    t.date "tanggal_pinjam"
    t.date "tanggal_kembali"
    t.string "status", default: "dipinjam"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["buku_id"], name: "index_peminjaman_on_buku_id"
    t.index ["user_id"], name: "index_peminjaman_on_user_id"
  end

  create_table "pengembalians", force: :cascade do |t|
    t.integer "peminjaman_id", null: false
    t.date "tanggal_kembali"
    t.integer "denda"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["peminjaman_id"], name: "index_pengembalians_on_peminjaman_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", default: "", null: false
    t.string "nama", default: "", null: false
    t.string "role", default: "user", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "peminjaman", "bukus"
  add_foreign_key "peminjaman", "users"
  add_foreign_key "pengembalians", "peminjaman"
end
