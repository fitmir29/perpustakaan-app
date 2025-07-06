class AddFieldsToAdmins < ActiveRecord::Migration[8.0]
  def change
    add_column :admins, :username, :string
    add_column :admins, :role, :string
  end
end
