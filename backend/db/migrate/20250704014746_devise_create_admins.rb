# frozen_string_literal: true

class DeviseCreateAdmins < ActiveRecord::Migration[8.0]
  def change
    create_table :admins do |t|
      ## Custom fields
      t.string :username, null: false, default: ""
      t.string :nama,     null: false, default: ""
      t.string :role,     null: false, default: "admin"  # default bisa diubah sesuai kebutuhan

      ## Database authenticatable
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at

      # Optional: Trackable, Confirmable, Lockable
      # t.integer  :sign_in_count, default: 0, null: false
      # t.datetime :current_sign_in_at
      # t.datetime :last_sign_in_at
      # t.string   :current_sign_in_ip
      # t.string   :last_sign_in_ip

      # t.string   :confirmation_token
      # t.datetime :confirmed_at
      # t.datetime :confirmation_sent_at
      # t.string   :unconfirmed_email

      # t.integer  :failed_attempts, default: 0, null: false
      # t.string   :unlock_token
      # t.datetime :locked_at

      t.timestamps null: false
    end

    add_index :admins, :email, unique: true
    add_index :admins, :username, unique: true
    add_index :admins, :reset_password_token, unique: true
  end
end
